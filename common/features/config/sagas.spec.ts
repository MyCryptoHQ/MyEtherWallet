import { delay, SagaIterator } from 'redux-saga';
import { call, cancel, fork, take, apply, put, select } from 'redux-saga/effects';
import { cloneableGenerator, createMockTask } from 'redux-saga/utils';
import { shepherd } from 'mycrypto-shepherd';

import { translateRaw } from 'translations';
import { StaticNodeConfig, CustomNodeConfig } from 'types/node';
import { getShepherdOffline, getShepherdPending } from 'libs/nodes';
import { Web3Wallet } from 'libs/wallet';
import { configuredStore } from 'features/store';
import { showNotification } from 'features/notifications';
import { getOffline } from './meta/selectors';
import { getNodeConfig } from './nodes';
import { getNodeId, getPreviouslySelectedNode } from './nodes/selected/selectors';
import { getCustomNodeFromId } from './nodes/custom/selectors';
import { isStaticNodeId } from './nodes/static/selectors';
import { staticNodesExpectedState } from './nodes/static/reducer.spec';
import { selectedNodeExpectedState } from './nodes/selected/reducer.spec';
import { CONFIG_NODES_SELECTED, ChangeNodeRequestedOneTimeAction } from './nodes/selected/types';
import { getStaticNodeFromId } from './selectors';
import {
  handleChangeNodeRequested,
  handlePollOfflineStatus,
  pollOfflineStatusSaga,
  handleNewNetwork,
  unsetWeb3Node,
  unsetWeb3NodeOnWalletEvent,
  handleNodeChangeForce,
  handleChangeNodeRequestedOneTime
} from './sagas';
import {
  changeNodeForce,
  changeNodeSucceeded,
  changeNodeRequested,
  changeNodeFailed,
  changeNodeRequestedOneTime
} from './nodes/selected/actions';
import { setOffline, setOnline, setLatestBlock } from './meta/actions';

// init module
configuredStore.getState();

const firstCustomNodeId = 'customNode1';
const firstCustomNode: CustomNodeConfig = {
  id: firstCustomNodeId,
  url: '127.0.0.1',
  name: 'My cool custom node',
  service: 'your custom node',
  network: 'CustomNetworkId',
  isCustom: true
};
const secondCustomNodeId = 'customNode2';
const secondCustomNode: CustomNodeConfig = {
  ...firstCustomNode,
  id: secondCustomNodeId
};
const customNodesExpectedState = {
  initialState: {},
  addFirstCustomNode: { [firstCustomNodeId]: firstCustomNode },
  addSecondCustomNode: {
    [firstCustomNodeId]: firstCustomNode,
    [secondCustomNodeId]: secondCustomNode
  },
  removeFirstCustomNode: { [secondCustomNodeId]: secondCustomNode }
};

describe('handleNodeChangeForce*', () => {
  const payload: any = 'nodeId';
  const action: any = { payload };
  const gen = cloneableGenerator(handleNodeChangeForce)(action);
  const nodeConfig: any = { network: 'network' };

  it('should select isStaticNodeId', () => {
    expect(gen.next().value).toEqual(select(isStaticNodeId, payload));
  });

  it('should return if not static node', () => {
    const clone = gen.clone();
    expect(clone.next(false).done).toEqual(true);
  });

  it('should select getStaticNodeFromId', () => {
    expect(gen.next(true).value).toEqual(select(getStaticNodeFromId, payload));
  });

  it('should force the node change', () => {
    expect(gen.next(nodeConfig).value).toEqual(
      put(
        changeNodeSucceeded({
          networkId: nodeConfig.network,
          nodeId: payload
        })
      )
    );
  });

  it('should put a change node intent', () => {
    expect(gen.next().value).toEqual(put(changeNodeRequested(payload)));
  });

  it('should be done', () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe('pollOfflineStatus*', () => {
  const restoreNotif = 'Your connection to the network has been restored!';
  const lostNetworkNotif = `You’ve lost your connection to the network, check your internet connection or try changing networks from the dropdown at the top right of the page.`;
  const offlineNotif = 'You are currently offline. Some features will be unavailable.';
  const offlineOnFirstTimeCase = pollOfflineStatusSaga();

  it('should delay by 2.5 seconds', () => {
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(delay, 2500));
  });

  it('should skip if a node change is pending', () => {
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(getShepherdPending));
    expect(offlineOnFirstTimeCase.next(true).value).toEqual(call(delay, 2500));
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(getShepherdPending));
  });

  it('should select offline', () => {
    expect(offlineOnFirstTimeCase.next(false).value).toEqual(select(getOffline));
  });

  it('should select shepherd"s offline', () => {
    expect(offlineOnFirstTimeCase.next(false).value).toEqual(call(getShepherdOffline));
  });

  // .PUT.action.payload.msg is used because the action creator uses an random ID, cant to a showNotif comparision
  it('should put a different notif if online for the first time ', () => {
    expect(offlineOnFirstTimeCase.next(true).value).toEqual(put(setOffline()));
    expect((offlineOnFirstTimeCase.next().value as any).PUT.action.payload.msg).toEqual(
      offlineNotif
    );
  });

  it('should loop around then go back online, putting a restore msg', () => {
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(delay, 2500));
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(getShepherdPending));
    expect(offlineOnFirstTimeCase.next(false).value).toEqual(select(getOffline));
    expect(offlineOnFirstTimeCase.next(true).value).toEqual(call(getShepherdOffline));
    expect((offlineOnFirstTimeCase.next().value as any).PUT.action.payload.msg).toEqual(
      restoreNotif
    );
    expect(offlineOnFirstTimeCase.next(false).value).toEqual(put(setOnline()));
  });

  it('should put a generic lost connection notif on every time afterwards', () => {
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(delay, 2500));
    expect(offlineOnFirstTimeCase.next().value).toEqual(call(getShepherdPending));
    expect(offlineOnFirstTimeCase.next(false).value).toEqual(select(getOffline));
    expect(offlineOnFirstTimeCase.next(false).value).toEqual(call(getShepherdOffline));
    expect(offlineOnFirstTimeCase.next(true).value).toEqual(put(setOffline()));
    expect((offlineOnFirstTimeCase.next().value as any).PUT.action.payload.msg).toEqual(
      lostNetworkNotif
    );
  });
});

describe('handlePollOfflineStatus*', () => {
  const gen = handlePollOfflineStatus();
  const mockTask = createMockTask();

  it('should fork pollOffineStatus', () => {
    const expectedForkYield = fork(pollOfflineStatusSaga);
    expect(gen.next().value).toEqual(expectedForkYield);
  });

  it('should take CONFIG_STOP_POLL_OFFLINE_STATE', () => {
    expect(gen.next(mockTask).value).toEqual(take('CONFIG_STOP_POLL_OFFLINE_STATE'));
  });

  it('should cancel pollOfflineStatus', () => {
    expect(gen.next().value).toEqual(cancel(mockTask));
  });
});

describe('handleChangeNodeRequested*', () => {
  let originalRandom: any;

  // normal operation variables
  const defaultNodeId: any = selectedNodeExpectedState.initialState.nodeId;
  const defaultNodeConfig: any = (staticNodesExpectedState as any).initialState[defaultNodeId];
  const newNodeId = Object.keys(staticNodesExpectedState.initialState).reduce(
    (acc, cur) =>
      (staticNodesExpectedState as any).initialState[cur].network !== defaultNodeConfig.network
        ? cur
        : acc
  );
  const newNodeConfig: StaticNodeConfig = (staticNodesExpectedState as any).initialState[newNodeId];
  const isOffline = false;
  const changeNodeRequestedAction = changeNodeRequested(newNodeId);
  const latestBlock = '0xa';

  const data = {} as any;
  data.gen = cloneableGenerator(handleChangeNodeRequested)(changeNodeRequestedAction);

  function shouldBailOut(gen: SagaIterator, nextVal: any, errMsg: string) {
    expect(gen.next(nextVal).value).toEqual(put(showNotification('danger', errMsg, 5000)));
    expect(gen.next().value).toEqual(put(changeNodeFailed()));
    expect(gen.next().done).toEqual(true);
  }

  beforeAll(() => {
    originalRandom = Math.random;
    Math.random = () => 0.001;
  });

  afterAll(() => {
    Math.random = originalRandom;
  });

  it('should select is static node', () => {
    expect(data.gen.next().value).toEqual(select(isStaticNodeId, newNodeId));
  });

  it('should select nodeConfig', () => {
    expect(data.gen.next(defaultNodeId).value).toEqual(select(getNodeConfig));
  });

  it('should select getStaticNodeFromId', () => {
    expect(data.gen.next(defaultNodeConfig).value).toEqual(select(getStaticNodeFromId, newNodeId));
  });

  it('should get the next network', () => {
    expect(data.gen.next(newNodeConfig).value).toMatchSnapshot();
  });

  it('should select isOffline', () => {
    expect(data.gen.next(true).value).toEqual(select(getOffline));
  });

  it('should show error if check times out', () => {
    data.clone1 = data.gen.clone();
    data.clone1.next(true);
    expect(data.clone1.throw('err').value).toEqual(
      put(showNotification('danger', translateRaw('ERROR_32'), 5000))
    );
    expect(data.clone1.next().value).toEqual(put(changeNodeFailed()));
    expect(data.clone1.next().done).toEqual(true);
  });

  it('should sucessfully switch to the manual node', () => {
    expect(data.gen.next(isOffline).value).toEqual(
      apply(shepherd, shepherd.manual, [newNodeId, false])
    );
  });

  it('should get the current block', () => {
    data.gen.next();
  });

  it('should put setLatestBlock', () => {
    expect(data.gen.next(latestBlock).value).toEqual(put(setLatestBlock(latestBlock)));
  });

  it('should put changeNode', () => {
    expect(data.gen.next().value).toEqual(
      put(changeNodeSucceeded({ networkId: newNodeConfig.network, nodeId: newNodeId }))
    );
  });

  it('should fork handleNewNetwork', () => {
    expect(data.gen.next().value).toEqual(fork(handleNewNetwork));
  });

  it('should be done', () => {
    expect(data.gen.next().done).toEqual(true);
  });

  // custom node variables
  const customNodeConfigs = customNodesExpectedState.addFirstCustomNode;
  const customNodeAction = changeNodeRequested(firstCustomNode.id);
  data.customNode = handleChangeNodeRequested(customNodeAction);

  // test custom node
  it('should select getCustomNodeConfig and match race snapshot', () => {
    data.customNode.next();
    data.customNode.next(false);
    expect(data.customNode.next(defaultNodeConfig).value).toEqual(
      select(getCustomNodeFromId, firstCustomNode.id)
    );
    expect(data.customNode.next(customNodeConfigs.customNode1).value).toMatchSnapshot();
  });

  const customNodeIdNotFound = firstCustomNode.id + 'notFound';
  const customNodeNotFoundAction = changeNodeRequested(customNodeIdNotFound);
  data.customNodeNotFound = handleChangeNodeRequested(customNodeNotFoundAction);

  // test custom node not found
  it('should handle unknown / missing custom node', () => {
    data.customNodeNotFound.next();
    data.customNodeNotFound.next(false);
  });

  it('should select getCustomNodeFromId', () => {
    expect(data.customNodeNotFound.next(defaultNodeConfig).value).toEqual(
      select(getCustomNodeFromId, customNodeIdNotFound)
    );
  });

  it('should show an error if was an unknown custom node', () => {
    shouldBailOut(
      data.customNodeNotFound,
      null,
      `Attempted to switch to unknown node '${customNodeNotFoundAction.payload}'`
    );
  });
});

describe('handleChangeNodeRequestedOneTime', () => {
  const saga = handleChangeNodeRequestedOneTime();
  const action: ChangeNodeRequestedOneTimeAction = changeNodeRequestedOneTime('eth_auto');
  it('should take a one time action based on the url containing a valid network to switch to', () => {
    expect(saga.next().value).toEqual(take(CONFIG_NODES_SELECTED.CHANGE_REQUESTED_ONETIME));
  });
  it(`should delay for 10 ms to allow shepherdProvider async init to complete`, () => {
    expect(saga.next(action).value).toEqual(call(delay, 100));
  });
  it('should dispatch the change node intent', () => {
    expect(saga.next().value).toEqual(put(changeNodeRequested(action.payload)));
  });
  it('should be done', () => {
    expect(saga.next().done).toEqual(true);
  });
});

describe('unsetWeb3Node*', () => {
  const previousNodeId = 'eth_mycrypto';
  const mockNodeId = 'web3';
  const gen = unsetWeb3Node();

  it('should select getNode', () => {
    expect(gen.next().value).toEqual(select(getNodeId));
  });

  it('should select an alternative node to web3', () => {
    // get a 'no visual difference' error here
    expect(gen.next(mockNodeId).value).toEqual(select(getPreviouslySelectedNode));
  });

  it('should put changeNodeForce', () => {
    expect(gen.next(previousNodeId).value).toEqual(put(changeNodeForce(previousNodeId)));
  });

  it('should be done', () => {
    expect(gen.next().done).toEqual(true);
  });

  it('should return early if node type is not web3', () => {
    const gen1 = unsetWeb3Node();
    gen1.next();
    gen1.next('notWeb3');
    expect(gen1.next().done).toEqual(true);
  });
});

describe('unsetWeb3NodeOnWalletEvent*', () => {
  const fakeAction: any = {};
  const mockNodeId = 'web3';
  const previousNodeId = 'eth_mycrypto';
  const gen = unsetWeb3NodeOnWalletEvent(fakeAction);

  it('should select getNode', () => {
    expect(gen.next().value).toEqual(select(getNodeId));
  });

  it('should select an alternative node to web3', () => {
    expect(gen.next(mockNodeId).value).toEqual(select(getPreviouslySelectedNode));
  });

  it('should put changeNodeForce', () => {
    expect(gen.next(previousNodeId).value).toEqual(put(changeNodeForce(previousNodeId)));
  });

  it('should be done', () => {
    expect(gen.next().done).toEqual(true);
  });

  it('should return early if node type is not web3', () => {
    const gen1 = unsetWeb3NodeOnWalletEvent({ payload: false } as any);
    gen1.next(); //getNode
    gen1.next('notWeb3'); //getNodeConfig
    expect(gen1.next().done).toEqual(true);
  });

  it('should return early if wallet type is web3', () => {
    const mockAddress = '0x0';
    const mockNetwork = 'ETH';
    const mockWeb3Wallet = new Web3Wallet(mockAddress, mockNetwork);
    const gen2 = unsetWeb3NodeOnWalletEvent({ payload: mockWeb3Wallet } as any);
    gen2.next(); //getNode
    gen2.next('web3'); //getNodeConfig
    expect(gen2.next().done).toEqual(true);
  });
});
