import React, { useContext, useReducer, useEffect } from 'react';
import { Input } from '@mycrypto/ui';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { isHexString } from 'ethers/utils';

import { Button, NetworkSelectDropdown, ContentPanel, TxReceipt, InlineMessage } from '@components';
import { NetworkId } from '@types';
import { StoreContext, ANALYTICS_CATEGORIES, useAssets, useNetworks } from '@services';
import { noOp, isVoid, useAnalytics } from '@utils';
import { useEffectOnce, useUpdateEffect } from '@vendor';
import { DEFAULT_NETWORK, ROUTE_PATHS } from '@config';
import { translateRaw } from '@translations';

import { txStatusReducer, generateInitialState } from './TxStatus.reducer';
import { fetchTxStatus, makeTx, createQueryParams } from './helpers';

const SUPPORTED_NETWORKS: NetworkId[] = ['Ethereum', 'Ropsten', 'Goerli', 'Kovan', 'ETC'];

const Loader = styled.div`
  padding-bottom: 6rem;
  transform: scale(3.75);

  &&::before {
    border-width: 0.75px;
  }

  &&::after {
    border-width: 0.75px;
  }
`;

const Wrapper = styled.div<{ fullPageLoading: boolean }>`
  ${({ fullPageLoading }) =>
    fullPageLoading &&
    `
    display: flex;
    justify-content: center;
`}
  min-height: 600px;
`;

const TxStatus = ({ history, location }: RouteComponentProps) => {
  const qs = queryString.parse(location.search);

  const trackPageLoad = useAnalytics({
    category: ANALYTICS_CATEGORIES.TX_STATUS
  });

  const { assets } = useAssets();
  const { networks } = useNetworks();
  const { accounts } = useContext(StoreContext);

  const defaultTxHash = qs.hash ? qs.hash : '';
  const defaultNetwork =
    qs.network && SUPPORTED_NETWORKS.includes(qs.network) ? qs.network : DEFAULT_NETWORK;

  const initialState = generateInitialState(defaultTxHash, defaultNetwork);

  const [reducerState, dispatch] = useReducer(txStatusReducer, initialState);

  const { networkId, txHash, tx: txState, error, fetching, fromLink } = reducerState;
  const network = networks.find((n) => n.id === networkId)!;
  // Fetch TX on load if possible
  useEffectOnce(() => {
    if (!isVoid(defaultTxHash)) {
      handleSubmit(true);
      trackPageLoad({
        actionName: `Used link sharing`
      });
    } else {
      trackPageLoad({
        actionName: `Didnt use link sharing`
      });
    }
  });

  // Update URL
  useUpdateEffect(() => {
    if (networkId === DEFAULT_NETWORK) {
      history.replace(`${ROUTE_PATHS.TX_STATUS.path}/?hash=${txHash}`);
    } else {
      history.replace(`${ROUTE_PATHS.TX_STATUS.path}/?hash=${txHash}&network=${networkId}`);
    }
  }, [txHash, networkId]);

  useEffect(() => {
    if (fetching) {
      fetchTxStatus({ accounts, networks, txHash, networkId })
        .then((t) => dispatch({ type: txStatusReducer.actionTypes.FETCH_TX_SUCCESS, payload: t }))
        .catch((e) => {
          console.error(e);
          dispatch({ type: txStatusReducer.actionTypes.FETCH_TX_ERROR });
        });
    }
  }, [fetching]);

  const handleSubmit = (fromLinkSharing: boolean) => {
    dispatch({ type: txStatusReducer.actionTypes.FETCH_TX, payload: fromLinkSharing });
  };

  const clearForm = () => {
    dispatch({ type: txStatusReducer.actionTypes.CLEAR_FORM });
  };

  const fullPageLoading = fromLink && !txState;

  const isFormValid = txHash.length > 0 && isHexString(txHash);

  const tx = txState && makeTx({ txHash, networkId, accounts, assets, networks, ...txState });
  // cannot send from web3 or walletconnect wallets because they overwrite gas and nonce inputs.
  const isSenderAccountPresent =
    tx &&
    accounts.find(
      ({ address, wallet }) =>
        isSameAddress(address, tx.config?.senderAccount?.address) &&
        ![
          WalletId.WEB3,
          WalletId.METAMASK,
          WalletId.COINBASE,
          WalletId.FRAME,
          WalletId.VIEW_ONLY
        ].includes(wallet)
    );

  return (
    <ContentPanel heading={translateRaw('TX_STATUS')}>
      <Wrapper fullPageLoading={fullPageLoading || false}>
        {!tx && !fromLink && (
          <>
            <NetworkSelectDropdown
              network={networkId ? networkId : undefined}
              onChange={(n) =>
                dispatch({ type: txStatusReducer.actionTypes.SET_NETWORK, payload: n })
              }
              filter={(n) => SUPPORTED_NETWORKS.includes(n.id)}
            />
            <label htmlFor="txhash">{translateRaw('TX_HASH')}</label>
            <Input
              name="txhash"
              value={txHash}
              onChange={(e) =>
                dispatch({
                  type: txStatusReducer.actionTypes.SET_TX_HASH,
                  payload: e.currentTarget.value
                })
              }
            />
            {error && <InlineMessage value={error} />}
            <Button
              disabled={!isFormValid}
              loading={fetching}
              onClick={() => handleSubmit(false)}
              fullwidth={true}
            >
              {translateRaw('FETCH')}
            </Button>
          </>
        )}
        {fullPageLoading && <Loader className="loading" />}
        {tx && (
          <>
            <TxReceipt
              txConfig={tx.config}
              txReceipt={tx.receipt}
              resetFlow={noOp}
              onComplete={noOp}
              disableDynamicTxReceiptDisplay={true}
              disableAddTxToAccount={true}
            />
            <Button onClick={clearForm} fullwidth={true} inverted={true}>
              {translateRaw('TX_STATUS_GO_BACK')}
            </Button>
          </>
        )}
      </Wrapper>
    </ContentPanel>
  );
};

export default withRouter(TxStatus);
