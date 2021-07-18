import {
  DEFAULT_ARTIS_SIGMA1,
  DEFAULT_ARTIS_TAU1,
  DEFAULT_ASK,
  DEFAULT_ATH,
  DEFAULT_AUX,
  DEFAULT_AVAX,
  DEFAULT_CLO,
  DEFAULT_DEXON,
  DEFAULT_EGEM,
  DEFAULT_ERE,
  DEFAULT_ETC,
  DEFAULT_ETH,
  DEFAULT_ETHO,
  DEFAULT_ETI,
  DEFAULT_EVRICE,
  DEFAULT_EWC,
  DEFAULT_EXP,
  DEFAULT_GO,
  DEFAULT_HECO,
  DEFAULT_METADIUM,
  DEFAULT_MIX,
  DEFAULT_POA,
  DEFAULT_POLYGON,
  DEFAULT_REOSC,
  DEFAULT_THUNDERCORE,
  DEFAULT_TOMO,
  DEFAULT_UBQ,
  DEFAULT_VOLTA,
  DEFAULT_WEB,
  DEFAULT_XDAI,
  LEDGER_ETC,
  LEDGER_ETH,
  MAINNET_RSK,
  TESTNET_ETH,
  TESTNET_RSK
} from '@mycrypto/wallets';

import {
  DEFAULT_NETWORK,
  DEFAULT_NETWORK_TICKER,
  ETHPLORER_URL,
  GAS_PRICE_DEFAULT,
  GAS_PRICE_TESTNET
} from '@config';
import { NetworkId, NetworkLegacy, TTicker, WalletId } from '@types';
import { makeExplorer } from '@utils/makeExplorer'; // leads to circular dependency if importing from base utils dir

// Temporay type to bridge the difference between v1 and v2 network definitions.
export type NetworkConfig = {
  [key in NetworkId]: NetworkLegacy;
};

export const NETWORKS_CONFIG: NetworkConfig = {
  Ethereum: {
    id: DEFAULT_NETWORK, // Ethereum Network Id
    name: 'Ethereum',
    baseUnitName: 'Ether',
    unit: DEFAULT_NETWORK_TICKER,
    chainId: 1,
    isCustom: false,
    color: '#007896',
    blockExplorer: makeExplorer({
      name: 'Etherscan',
      origin: 'https://etherscan.io'
    }),
    tokenExplorer: makeExplorer({
      name: 'Ethplorer',
      origin: ETHPLORER_URL
    }),
    tokens: [],
    contracts: require('./contracts/eth.json'),
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_ETH
    },
    gasPriceSettings: GAS_PRICE_DEFAULT,
    shouldEstimateGasPrice: true
  },
  Ropsten: {
    id: 'Ropsten',
    name: 'Ropsten',
    unit: 'RopstenETH' as TTicker,
    chainId: 3,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer({
      name: 'Etherscan',
      origin: 'https://ropsten.etherscan.io'
    }),
    tokens: [],
    contracts: require('./contracts/ropsten.json'),
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S]: TESTNET_ETH,
      [WalletId.TREZOR_NEW]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: TESTNET_ETH,
      default: TESTNET_ETH
    },
    gasPriceSettings: GAS_PRICE_TESTNET
  },
  Kovan: {
    id: 'Kovan',
    name: 'Kovan',
    unit: 'KovanETH' as TTicker,
    chainId: 42,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer({
      name: 'Etherscan',
      origin: 'https://kovan.etherscan.io'
    }),
    tokens: [],
    contracts: require('./contracts/kovan.json'),
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S]: TESTNET_ETH,
      [WalletId.TREZOR_NEW]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: TESTNET_ETH,
      default: TESTNET_ETH
    },
    gasPriceSettings: GAS_PRICE_DEFAULT
  },
  Rinkeby: {
    id: 'Rinkeby',
    name: 'Rinkeby',
    unit: 'RinkebyETH' as TTicker,
    chainId: 4,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer({
      name: 'Etherscan',
      origin: 'https://rinkeby.etherscan.io'
    }),
    tokens: [],
    contracts: require('./contracts/rinkeby.json'),
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S]: TESTNET_ETH,
      [WalletId.TREZOR_NEW]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: TESTNET_ETH,
      default: TESTNET_ETH
    },
    gasPriceSettings: GAS_PRICE_TESTNET
  },
  Goerli: {
    id: 'Goerli',
    name: 'Goerli',
    unit: 'GoerliETH' as TTicker,
    chainId: 5,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer({
      name: 'Etherscan',
      origin: 'https://goerli.etherscan.io/'
    }),
    tokens: [],
    contracts: require('./contracts/goerli.json'),
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S]: TESTNET_ETH,
      [WalletId.TREZOR_NEW]: TESTNET_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: TESTNET_ETH,
      default: TESTNET_ETH
    },
    gasPriceSettings: GAS_PRICE_TESTNET
  },
  ETC: {
    id: 'ETC',
    name: 'Ethereum Classic',
    unit: 'ETC' as TTicker,
    chainId: 61,
    isCustom: false,
    color: '#669073',
    blockExplorer: makeExplorer({
      name: 'BlockScout',
      origin: 'https://blockscout.com/etc/mainnet',
      addressPath: 'address'
    }),
    tokens: [],
    contracts: require('./contracts/etc.json'),
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETC,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETC,
      [WalletId.TREZOR_NEW]: DEFAULT_ETC,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETC,
      default: DEFAULT_ETC
    },
    gasPriceSettings: {
      min: 0.1,
      max: 10,
      initial: 1
    }
  },
  UBQ: {
    id: 'UBQ',
    name: 'Ubiq',
    unit: 'UBQ' as TTicker,
    chainId: 8,
    isCustom: false,
    color: '#b37aff',
    blockExplorer: makeExplorer({
      name: 'Ubiqscan',
      origin: 'https://ubiqscan.io'
    }),
    tokens: [],
    contracts: require('./contracts/ubq.json'),
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_UBQ,
      [WalletId.LEDGER_NANO_S]: DEFAULT_UBQ,
      [WalletId.TREZOR_NEW]: DEFAULT_UBQ,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_UBQ,
      default: DEFAULT_UBQ
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  EXP: {
    id: 'EXP',
    name: 'Expanse',
    unit: 'EXP' as TTicker,
    chainId: 2,
    isCustom: false,
    color: '#673ab7',
    blockExplorer: makeExplorer({
      name: 'Expanse Explorer',
      origin: 'https://explorer.expanse.tech/home'
    }),
    tokens: [],
    contracts: require('./contracts/exp.json'),
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_EXP,
      [WalletId.LEDGER_NANO_S]: DEFAULT_EXP,
      [WalletId.TREZOR_NEW]: DEFAULT_EXP,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_EXP,
      default: DEFAULT_EXP
    },
    gasPriceSettings: {
      min: 0.1,
      max: 20,
      initial: 2
    }
  },
  POA: {
    id: 'POA',
    name: 'POA',
    unit: 'POA' as TTicker,
    chainId: 99,
    isCustom: false,
    color: '#6d2eae',
    blockExplorer: makeExplorer({
      name: 'BlockScout',
      origin: 'https://blockscout.com/poa/core',
      addressPath: 'address',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_POA,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_POA,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_POA
    },
    gasPriceSettings: {
      min: 0.1,
      max: 10,
      initial: 1
    }
  },
  TOMO: {
    id: 'TOMO',
    name: 'TomoChain',
    unit: 'TOMO' as TTicker,
    chainId: 88,
    isCustom: false,
    color: '#6a488d',
    blockExplorer: makeExplorer({
      name: 'Tomochain Explorer',
      origin: 'https://scan.tomochain.com'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S]: DEFAULT_TOMO,
      [WalletId.TREZOR_NEW]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_TOMO,
      default: DEFAULT_TOMO
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  EGEM: {
    id: 'EGEM',
    name: 'EtherGem',
    unit: 'EGEM' as TTicker,
    chainId: 1987,
    isCustom: false,
    color: '#D0F7FF',
    blockExplorer: makeExplorer({
      name: 'EtherGem Explorer',
      origin: 'https://explorer.egem.io'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_EGEM,
      [WalletId.LEDGER_NANO_S]: DEFAULT_EGEM,
      [WalletId.TREZOR_NEW]: DEFAULT_EGEM,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_EGEM,
      default: DEFAULT_EGEM
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },

  CLO: {
    id: 'CLO',
    name: 'Callisto',
    unit: 'CLO' as TTicker,
    chainId: 820,
    isCustom: false,
    color: '#00b04a',
    blockExplorer: makeExplorer({
      name: 'Callisto Explorer',
      origin: 'https://explorer.callisto.network'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_CLO,
      [WalletId.LEDGER_NANO_S]: DEFAULT_CLO,
      [WalletId.TREZOR_NEW]: DEFAULT_CLO,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_CLO,
      default: DEFAULT_CLO
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },

  RSK: {
    id: 'RSK',
    name: 'RSK',
    unit: 'RBTC' as TTicker,
    chainId: 30,
    color: '#58A052',
    isCustom: false,
    blockExplorer: makeExplorer({
      name: 'RSK Explorer',
      origin: 'https://explorer.rsk.co'
    }),
    tokens: [],
    contracts: require('./contracts/rsk.json'),
    isTestnet: false,
    dPaths: {
      [WalletId.TREZOR]: MAINNET_RSK,
      [WalletId.LEDGER_NANO_S]: MAINNET_RSK,
      [WalletId.TREZOR_NEW]: MAINNET_RSK,
      [WalletId.LEDGER_NANO_S_NEW]: MAINNET_RSK,
      default: MAINNET_RSK
    },
    gasPriceSettings: {
      min: 0.06,
      max: 1.5,
      initial: 0.06
    },
    //unsupportedTabs: [TAB.ENS],
    hideEquivalentValues: true
  },

  RSK_TESTNET: {
    id: 'RSK_TESTNET',
    name: 'RSK Testnet',
    unit: 'RBTC' as TTicker,
    chainId: 31,
    color: '#58A052',
    isCustom: false,
    blockExplorer: makeExplorer({
      name: 'RSK Testnet Explorer',
      origin: 'https://explorer.testnet.rsk.co'
    }),
    tokens: [],
    contracts: require('./contracts/rsk_testnet.json'),
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: TESTNET_RSK,
      [WalletId.LEDGER_NANO_S]: TESTNET_RSK,
      [WalletId.TREZOR_NEW]: TESTNET_RSK,
      [WalletId.LEDGER_NANO_S_NEW]: TESTNET_RSK,
      default: TESTNET_RSK
    },
    gasPriceSettings: {
      min: 0.06,
      max: 1.5,
      initial: 0.06
    }
    //unsupportedTabs: [TAB.ENS]
  },

  GO: {
    id: 'GO',
    name: 'GO',
    unit: 'GO' as TTicker,
    chainId: 60,
    isCustom: false,
    color: '#00b04a',
    blockExplorer: makeExplorer({
      name: 'GoChain Explorer',
      origin: 'https://explorer.gochain.io'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_GO,
      [WalletId.LEDGER_NANO_S]: DEFAULT_GO,
      [WalletId.TREZOR_NEW]: DEFAULT_GO,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_GO,
      default: DEFAULT_GO
    },
    gasPriceSettings: {
      min: 2,
      max: 60,
      initial: 2
    }
  },

  GO_TESTNET: {
    id: 'GO_TESTNET',
    name: 'GO Testnet',
    unit: 'GO' as TTicker,
    chainId: 31337,
    isCustom: false,
    color: '#00b04a',
    blockExplorer: makeExplorer({
      name: 'GoChain Testnet Explorer',
      origin: 'https://testnet-explorer.gochain.io'
    }),
    tokens: [],
    contracts: [],
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_GO,
      [WalletId.TREZOR_NEW]: DEFAULT_GO,
      default: DEFAULT_GO
    },
    gasPriceSettings: {
      min: 2,
      max: 60,
      initial: 2
    }
  },
  AQUA: {
    id: 'AQUA',
    name: 'Aquachain',
    unit: 'AQUA' as TTicker,
    chainId: 61717561,
    isCustom: false,
    color: '#00ffff',
    blockExplorer: makeExplorer({
      name: 'AQUA Explorer',
      origin: 'https://blockscout.aqua.signal2noi.se'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S]: DEFAULT_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_ETH,
      default: DEFAULT_ETH
    },
    gasPriceSettings: {
      min: 0.1,
      max: 10,
      initial: 0.1
    }
  },
  ATH: {
    id: 'ATH',
    name: 'Atheios',
    unit: 'ATH' as TTicker,
    chainId: 1620,
    isCustom: false,
    color: '#0093c5',
    blockExplorer: makeExplorer({
      name: 'Atheios Explorer',
      origin: 'https://explorer.atheios.org'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ATH,
      [WalletId.LEDGER_NANO_S]: DEFAULT_ATH,
      [WalletId.TREZOR_NEW]: DEFAULT_ATH,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_ATH,
      default: DEFAULT_ATH
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  ETHO: {
    id: 'ETHO',
    name: 'Ether-1',
    unit: 'ETHO' as TTicker,
    chainId: 1313114,
    isCustom: false,
    color: '#7a1336',
    blockExplorer: makeExplorer({
      name: 'Ether-1 Explorer',
      origin: 'https://explorer.ether1.org'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETHO,
      [WalletId.LEDGER_NANO_S]: DEFAULT_ETHO,
      [WalletId.TREZOR_NEW]: DEFAULT_ETHO,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_ETHO,
      default: DEFAULT_ETHO
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  MIX: {
    id: 'MIX',
    name: 'Mix',
    unit: 'MIX' as TTicker,
    chainId: 76,
    isCustom: false,
    color: '#e59b2b',
    blockExplorer: makeExplorer({
      name: 'MIX Blockchain Explorer',
      origin: 'https://blocks.mix-blockchain.org'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_MIX,
      [WalletId.LEDGER_NANO_S]: DEFAULT_MIX,
      [WalletId.TREZOR_NEW]: DEFAULT_MIX,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_MIX,
      default: DEFAULT_MIX
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  REOSC: {
    id: 'REOSC',
    name: 'REOSC',
    unit: 'REOSC' as TTicker,
    chainId: 2894,
    isCustom: false,
    color: '#1500db',
    blockExplorer: makeExplorer({
      name: 'REOSC Explorer',
      origin: 'https://explorer.reosc.io'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_REOSC,
      [WalletId.LEDGER_NANO_S]: DEFAULT_REOSC,
      [WalletId.TREZOR_NEW]: DEFAULT_REOSC,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_REOSC,
      default: DEFAULT_REOSC
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  ARTIS_SIGMA1: {
    id: 'ARTIS_SIGMA1',
    name: 'ARTIS sigma1',
    unit: 'ATS' as TTicker,
    chainId: 246529,
    isCustom: false,
    color: '#238006',
    blockExplorer: makeExplorer({
      name: 'BlockScout',
      origin: 'https://explorer.sigma1.artis.network',
      addressPath: 'address',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    isTestnet: false,
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ARTIS_SIGMA1,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_ARTIS_SIGMA1,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_ARTIS_SIGMA1
    },
    gasPriceSettings: {
      min: 1,
      max: 1,
      initial: 1
    }
  },
  ARTIS_TAU1: {
    id: 'ARTIS_TAU1',
    name: 'ARTIS tau1',
    unit: 'ATS' as TTicker,
    chainId: 246785,
    isCustom: false,
    color: '#238006',
    blockExplorer: makeExplorer({
      name: 'BlockScout',
      origin: 'https://explorer.tau1.artis.network',
      addressPath: 'address',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    isTestnet: true,
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ARTIS_TAU1,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_ARTIS_TAU1,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_ARTIS_TAU1
    },
    gasPriceSettings: {
      min: 1,
      max: 1,
      initial: 1
    }
  },
  THUNDERCORE: {
    id: 'THUNDERCORE',
    name: 'ThunderCore',
    unit: 'TT' as TTicker,
    chainId: 108,
    isCustom: false,
    color: '#ffc000',
    blockExplorer: makeExplorer({
      name: 'ThunderScan',
      origin: 'https://scan.thundercore.com'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_THUNDERCORE,
      [WalletId.TREZOR_NEW]: DEFAULT_THUNDERCORE,
      [WalletId.LEDGER_NANO_S]: DEFAULT_THUNDERCORE,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_THUNDERCORE,
      default: DEFAULT_THUNDERCORE
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 1
    }
  },
  WEB: {
    id: 'WEB',
    name: 'Webchain',
    unit: 'WEB' as TTicker,
    chainId: 24484,
    isCustom: false,
    color: '#0092ee',
    blockExplorer: makeExplorer({
      name: 'Webchain Explorer',
      origin: 'https://explorer.webchain.network'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      default: DEFAULT_WEB
    },
    gasPriceSettings: {
      min: 100,
      max: 400,
      initial: 200
    }
  },
  METADIUM: {
    id: 'METADIUM',
    name: 'Metadium',
    unit: 'META' as TTicker,
    chainId: 11,
    isCustom: false,
    color: '#ffc000',
    blockExplorer: makeExplorer({
      name: 'Metadium Explorer',
      origin: 'https://explorer.metadium.com/'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_METADIUM
    },
    gasPriceSettings: {
      min: 80,
      max: 80,
      initial: 80
    }
  },
  DEXON: {
    id: 'DEXON',
    name: 'DEXON Network',
    unit: 'DXN' as TTicker,
    chainId: 237,
    isCustom: false,
    color: '#954a97',
    blockExplorer: makeExplorer({
      name: 'DEXON Scan',
      origin: 'https://dexonscan.app',
      txPath: 'transaction'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.LEDGER_NANO_S]: DEFAULT_DEXON,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_DEXON,
      default: DEFAULT_DEXON
    },
    gasPriceSettings: {
      min: 24,
      max: 100,
      initial: 24
    }
  },
  ETI: {
    id: 'ETI',
    name: 'Etherinc',
    unit: 'ETI' as TTicker,
    chainId: 101,
    isCustom: false,
    color: '#3560bf',
    blockExplorer: makeExplorer({
      name: 'Etherinc Explorer',
      origin: 'https://explorer.einc.io'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETI,
      [WalletId.TREZOR_NEW]: DEFAULT_ETI,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_ETI
    },
    gasPriceSettings: {
      min: 2,
      max: 60,
      initial: 2
    }
  },
  ASK: {
    id: 'ASK',
    name: 'Permission',
    unit: 'ASK' as TTicker,
    chainId: 222,
    isCustom: false,
    color: '#000',
    blockExplorer: makeExplorer({
      name: 'Permission explorer',
      origin: 'https://explorer.permission.io',
      txPath: 'transactions',
      addressPath: 'wallets',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ASK,
      [WalletId.TREZOR_NEW]: DEFAULT_ASK,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_ASK
    },
    gasPriceSettings: {
      min: 4.77,
      max: 100,
      initial: 4.77
    },
    shouldEstimateGasPrice: false
  },
  AUX: {
    id: 'AUX',
    name: 'Auxilium',
    unit: 'AUX' as TTicker,
    chainId: 28945486,
    isCustom: false,
    color: '#85dc35',
    blockExplorer: makeExplorer({
      name: 'Auxilium Explore',
      origin: 'https://explore.auxilium.global/'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      default: DEFAULT_AUX
    },
    gasPriceSettings: {
      min: 0.1,
      max: 40,
      initial: 4
    }
  },
  ERE: {
    id: 'ERE',
    name: 'EtherCore',
    unit: 'ERE' as TTicker,
    chainId: 466,
    isCustom: false,
    color: '#3a6ea7',
    blockExplorer: makeExplorer({
      name: 'EtherCore Explorer',
      origin: 'https://explorer.ethercore.io'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ERE,
      [WalletId.TREZOR_NEW]: DEFAULT_ERE,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_ERE
    },
    gasPriceSettings: {
      min: 0.1,
      max: 60,
      initial: 1
    }
  },
  VOLTA: {
    id: 'VOLTA',
    name: 'Volta',
    unit: 'VT' as TTicker,
    chainId: 73799,
    isCustom: false,
    color: '#6d2eae',
    blockExplorer: makeExplorer({
      name: 'Energy Web VOLTA Explorer',
      origin: 'https://volta-explorer.energyweb.org',
      addressPath: 'address',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_VOLTA,
      [WalletId.LEDGER_NANO_S]: DEFAULT_VOLTA,
      [WalletId.TREZOR_NEW]: DEFAULT_VOLTA,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_VOLTA,
      default: DEFAULT_VOLTA
    },
    gasPriceSettings: {
      min: 1,
      max: 10,
      initial: 1
    },
    shouldEstimateGasPrice: false
  },
  EnergyWebChain: {
    id: 'EnergyWebChain',
    name: 'EWC',
    unit: 'EWT' as TTicker,
    chainId: 246,
    isCustom: false,
    color: '#6d2eae',
    blockExplorer: makeExplorer({
      name: 'Energy Web Chain Explorer',
      origin: 'https://explorer.energyweb.org',
      addressPath: 'address',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_EWC,
      [WalletId.LEDGER_NANO_S]: DEFAULT_EWC,
      [WalletId.TREZOR_NEW]: DEFAULT_EWC,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_EWC,
      default: DEFAULT_EWC
    },
    gasPriceSettings: {
      min: 0.01,
      max: 10,
      initial: 0.01
    }
  },
  MATIC: {
    id: 'MATIC',
    name: 'Polygon',
    unit: 'MATIC' as TTicker,
    chainId: 137,
    isCustom: false,
    color: '#60da9a',
    blockExplorer: makeExplorer({
      name: 'PolygonScan Explorer',
      origin: 'https://polygonscan.com'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_POLYGON,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_POLYGON,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH
    },
    gasPriceSettings: {
      min: 0.01,
      max: 30,
      initial: 1
    },
    shouldEstimateGasPrice: false
  },
  xDAI: {
    id: 'xDAI',
    name: 'xDAI',
    unit: 'xDAI' as TTicker,
    chainId: 100,
    isCustom: false,
    color: '#15bba6',
    blockExplorer: makeExplorer({
      name: 'xDai',
      origin: 'https://blockscout.com/poa/xdai',
      addressPath: 'address',
      blockPath: 'blocks'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_XDAI,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_XDAI,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH
    },
    gasPriceSettings: {
      min: 0.01,
      max: 30,
      initial: 1
    },
    shouldEstimateGasPrice: false
  },
  SmartChain: {
    id: 'SmartChain',
    name: 'Smart Chain',
    unit: 'BNB' as TTicker,
    chainId: 56,
    isCustom: false,
    color: '#f0b90b',
    blockExplorer: makeExplorer({
      name: 'BscScan Explorer',
      origin: 'https://bscscan.com'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH
    },
    gasPriceSettings: {
      min: 1,
      max: 20,
      initial: 5
    }
  },
  SmartChainTestNetwork: {
    id: 'SmartChainTestNetwork',
    name: 'Smart Chain Test Network',
    unit: 'BNB Test' as TTicker,
    chainId: 97,
    isCustom: false,
    color: '#f0b90b',
    blockExplorer: makeExplorer({
      name: 'BscScan Explorer',
      origin: 'https://testnet.bscscan.com'
    }),
    isTestnet: true,
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_ETH,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH
    },
    gasPriceSettings: {
      min: 20,
      max: 60,
      initial: 20
    }
  },
  Avalanche: {
    id: 'Avalanche',
    name: 'Avalanche C-Chain',
    unit: 'AVAX' as TTicker,
    chainId: 43114,
    isCustom: false,
    color: '#a70518',
    blockExplorer: makeExplorer({
      name: 'Avalanche C-Chain Explorer',
      origin: 'https://cchain.explorer.avax.network/',
      addressPath: 'address',
      blockPath: 'blocks',
      txPath: 'tx'
    }),
    isTestnet: false,
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_AVAX,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_AVAX,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_AVAX
    },
    gasPriceSettings: {
      min: 10,
      max: 470,
      initial: 470
    }
  },
  AvalancheTestnet: {
    id: 'AvalancheTestnet',
    name: 'Avalanche C-Chain Testnet',
    unit: 'AVAX' as TTicker,
    chainId: 43113,
    isCustom: false,
    color: '#a70518',
    blockExplorer: makeExplorer({
      name: 'Avalanche C-Chain Explorer',
      origin: 'https://cchain.explorer.avax-test.network/',
      addressPath: 'address',
      blockPath: 'blocks',
      txPath: 'tx'
    }),
    isTestnet: true,
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_AVAX,
      [WalletId.LEDGER_NANO_S]: DEFAULT_AVAX,
      [WalletId.TREZOR_NEW]: DEFAULT_AVAX,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_AVAX
    },
    gasPriceSettings: {
      min: 10,
      max: 470,
      initial: 470
    }
  },
  EVRICE: {
    id: 'EVRICE',
    name: 'Evrice',
    unit: 'EVC' as TTicker,
    chainId: 1010,
    isCustom: false,
    color: '#6d2eae',
    blockExplorer: makeExplorer({
      name: 'Evrice Explorer',
      origin: 'https://evrice.com/explorer'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_EVRICE,
      [WalletId.LEDGER_NANO_S]: DEFAULT_EVRICE,
      [WalletId.TREZOR_NEW]: DEFAULT_EVRICE,
      [WalletId.LEDGER_NANO_S_NEW]: DEFAULT_EVRICE,
      default: DEFAULT_EVRICE
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 1
    }
  },
  HECO: {
    id: 'HECO',
    name: 'Huobi Eco Chain',
    unit: 'HT' as TTicker,
    chainId: 128,
    isCustom: false,
    color: '#6d2eae',
    blockExplorer: makeExplorer({
      name: 'HECO Explorer',
      origin: 'https://hecoinfo.com'
    }),
    tokens: [],
    contracts: [],
    dPaths: {
      [WalletId.TREZOR]: DEFAULT_HECO,
      [WalletId.LEDGER_NANO_S]: LEDGER_ETH,
      [WalletId.TREZOR_NEW]: DEFAULT_HECO,
      [WalletId.LEDGER_NANO_S_NEW]: LEDGER_ETH,
      default: DEFAULT_HECO
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 1
    }
  }
};
