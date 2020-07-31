import React from 'react';
import { simpleRender, fireEvent, waitFor } from 'test-utils';

import { fTxConfig } from '@fixtures';
import { WalletId } from '@types';
import { translateRaw } from '@translations';
import { WALLETS_CONFIG } from '@config';

import SignTransaction from '../components/SignTransaction';

const defaultProps: React.ComponentProps<typeof SignTransaction> = {
  txConfig: {
    ...fTxConfig,
    senderAccount: { ...fTxConfig.senderAccount, wallet: WalletId.PRIVATE_KEY }
  },
  onComplete: jest.fn()
};

const getComponent = () => {
  return simpleRender(<SignTransaction {...defaultProps} />);
};

const getHeader = (wallet: WalletId) => {
  return translateRaw('SIGN_TX_TITLE', {
    $walletName: WALLETS_CONFIG[wallet].name
  });
};

const mockSign = jest.fn().mockImplementation(() => Promise.resolve('txhash'));
jest.mock('ethers', () => {
  return {
    Wallet: jest.fn().mockImplementation(() => ({ sign: mockSign }))
  };
});

describe('SignTransaction', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Can handle Private Key signing', async () => {
    const { getByText, container } = getComponent();
    const selector = getHeader(WalletId.PRIVATE_KEY);
    expect(getByText(selector)).toBeInTheDocument();

    const input = container.querySelector('input');
    fireEvent.click(input!);
    fireEvent.change(input!, { target: { value: 'privkey' } });
    fireEvent.click(getByText(translateRaw('DEP_SIGNTX')));

    await waitFor(() => expect(defaultProps.onComplete).toBeCalledWith('txhash'));
  });
});
