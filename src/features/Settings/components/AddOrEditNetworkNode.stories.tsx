import React from 'react';

import { storiesOf } from '@storybook/react';
import AppProviders from 'AppProviders';
import { ThemeProvider } from 'styled-components';

import { DEFAULT_NETWORK } from '@config';
import { NETWORKS_CONFIG, NODES_CONFIG } from '@database/data';
import { customNodeConfig } from '@fixtures';
import { theme } from '@theme';
import { Network, NetworkId } from '@types';
import { noOp } from '@utils';

import AddOrEditNetworkNode from './AddOrEditNetworkNode';

const networkId = DEFAULT_NETWORK;
const isNodeNameAvailable = () => true;
const getNetworkById = (id: NetworkId) =>
  (({
    ...NETWORKS_CONFIG[id],
    nodes: NODES_CONFIG[id]
  } as unknown) as Network);

const addNetworkNode = () => (
  <div className="sb-container" style={{ maxWidth: '800px' }}>
    <AddOrEditNetworkNode
      networkId={networkId}
      editNode={undefined}
      onComplete={noOp}
      addNodeToNetwork={noOp}
      isNodeNameAvailable={isNodeNameAvailable}
      getNetworkById={getNetworkById}
      updateNode={noOp}
      deleteNode={noOp}
      addNetwork={noOp}
      deleteNetwork={noOp}
      addAsset={noOp}
      isAddingCustomNetwork={false}
    />
  </div>
);

const editNetworkNode = () => (
  <div className="sb-container" style={{ maxWidth: '800px' }}>
    <AddOrEditNetworkNode
      networkId={networkId}
      editNode={customNodeConfig}
      onComplete={noOp}
      addNodeToNetwork={noOp}
      isNodeNameAvailable={isNodeNameAvailable}
      getNetworkById={getNetworkById}
      updateNode={noOp}
      deleteNode={noOp}
      addNetwork={noOp}
      deleteNetwork={noOp}
      addAsset={noOp}
      isAddingCustomNetwork={false}
    />
  </div>
);

storiesOf('NetworkNodeForm', module)
  .addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .addDecorator((story) => <AppProviders>{story()}</AppProviders>)
  .add('Add node', () => addNetworkNode(), {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/BY0SWc75teEUZzws8JdgLMpy/%5BMyCrypto%5D-GAU-Master?node-id=1522%3A93762'
    }
  })
  .add('Edit node', () => editNetworkNode(), {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/BY0SWc75teEUZzws8JdgLMpy/%5BMyCrypto%5D-GAU-Master?node-id=1522%3A93762'
    }
  });
