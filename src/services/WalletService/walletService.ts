import { LedgerWallet, TrezorWallet } from '@mycrypto/wallets';

import {
  HardwareWalletInitArgs,
  ViewOnlyWalletInitArgs,
  WalletConnectWalletInitArgs,
  WalletId,
  Web3WalletInitArgs
} from '@types';

import { ChainCodeResponse } from './deterministic';
import { AddressOnlyWallet } from './non-deterministic';
import { WalletConnectWallet } from './walletconnect';
import { unlockWeb3 } from './web3';

export const WalletFactory = {
  [WalletId.WEB3]: {
    init: ({ networks }: Web3WalletInitArgs) => unlockWeb3(networks)
  },
  [WalletId.METAMASK]: {
    init: ({ networks }: Web3WalletInitArgs) => unlockWeb3(networks)
  },
  [WalletId.STATUS]: {
    init: ({ networks }: Web3WalletInitArgs) => unlockWeb3(networks)
  },
  [WalletId.FRAME]: {
    init: ({ networks }: Web3WalletInitArgs) => unlockWeb3(networks)
  },
  [WalletId.COINBASE]: {
    init: ({ networks }: Web3WalletInitArgs) => unlockWeb3(networks)
  },
  [WalletId.TRUST]: {
    init: ({ networks }: Web3WalletInitArgs) => unlockWeb3(networks)
  },
  [WalletId.LEDGER_NANO_S_NEW]: {
    init: ({ dPath, index }: HardwareWalletInitArgs) => new LedgerWallet().getWallet(dPath, index)
  },
  [WalletId.LEDGER_NANO_S]: {
    init: ({ dPath, index }: HardwareWalletInitArgs) => new LedgerWallet().getWallet(dPath, index)
  },
  [WalletId.TREZOR_NEW]: {
    init: ({ dPath, index }: HardwareWalletInitArgs) => new TrezorWallet().getWallet(dPath, index)
  },
  [WalletId.TREZOR]: {
    init: ({ dPath, index }: HardwareWalletInitArgs) => new TrezorWallet().getWallet(dPath, index)
  },
  [WalletId.VIEW_ONLY]: {
    init: ({ address }: ViewOnlyWalletInitArgs) => new AddressOnlyWallet(address)
  },
  [WalletId.WALLETCONNECT]: {
    init: ({ address, signMessageHandler, killHandler }: WalletConnectWalletInitArgs) =>
      new WalletConnectWallet(address, signMessageHandler, killHandler)
  }
};

export const getWallet = (wallet: WalletId) => {
  switch (wallet) {
    case WalletId.LEDGER_NANO_S_NEW:
    case WalletId.LEDGER_NANO_S:
      return new LedgerWallet();
    case WalletId.TREZOR_NEW:
    case WalletId.TREZOR:
      return new TrezorWallet();
  }
};
