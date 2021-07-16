import { INFURA_API_KEY, POCKET_API_KEY } from '@config';
import { NetworkUtils } from '@services/Store/Network/utils';
import { NetworkId, NodeType, StaticNodeConfig } from '@types';

export const NODES_CONFIG: { [key in NetworkId]: StaticNodeConfig[] } = {
  Ethereum: [
    {
      name: NetworkUtils.makeNodeName('ETH', 'mycrypto'),
      type: NodeType.RPC,
      service: 'MyCrypto',
      url: 'https://api.mycryptoapi.com/eth'
    },
    {
      name: NetworkUtils.makeNodeName('ETH', 'ethscan'),
      type: NodeType.ETHERSCAN,
      service: 'Etherscan',
      url: 'https://api.etherscan.io/api'
    },
    {
      name: NetworkUtils.makeNodeName('ETH', 'infura'),
      type: NodeType.INFURA,
      service: 'Infura',
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
    },
    {
      name: NetworkUtils.makeNodeName('ETH', 'pocket'),
      type: NodeType.POCKET,
      service: 'Pocket',
      url: `https://eth-mainnet.gateway.pokt.network/v1/lb/${POCKET_API_KEY}`,
      disableByDefault: false
    }
  ],

  Ropsten: [
    {
      name: NetworkUtils.makeNodeName('Ropsten', 'infura'),
      type: NodeType.INFURA,
      service: 'Infura',
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`
    },
    {
      name: NetworkUtils.makeNodeName('Ropsten', 'ethscan'),
      type: NodeType.ETHERSCAN,
      service: 'Etherscan',
      url: 'https://api-ropsten.etherscan.io/api'
    }
  ],

  Kovan: [
    {
      name: NetworkUtils.makeNodeName('Kovan', 'ethscan'),
      type: NodeType.ETHERSCAN,
      service: 'Etherscan',
      url: 'https://api-kovan.etherscan.io/api'
    },
    {
      name: NetworkUtils.makeNodeName('Kovan', 'infura'),
      type: NodeType.INFURA,
      service: 'Infura',
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`
    }
  ],

  Rinkeby: [
    {
      name: NetworkUtils.makeNodeName('Rinkeby', 'infura'),
      type: NodeType.INFURA,
      service: 'Infura',
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`
    },
    {
      name: NetworkUtils.makeNodeName('Rinkeby', 'ethscan'),
      type: NodeType.ETHERSCAN,
      service: 'Etherscan',
      url: 'https://api-rinkeby.etherscan.io/api'
    }
  ],

  Goerli: [
    {
      name: NetworkUtils.makeNodeName('Goerli', 'mycrypto'),
      type: NodeType.RPC,
      service: 'MyCrypto',
      url: 'https://goerli.mycryptoapi.com'
    },
    {
      name: NetworkUtils.makeNodeName('Goerli', 'etherscan'),
      type: NodeType.ETHERSCAN,
      service: 'Etherscan',
      url: 'https://api-goerli.etherscan.io/api'
    },
    {
      name: NetworkUtils.makeNodeName('Goerli', 'infura'),
      type: NodeType.INFURA,
      service: 'Infura',
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`
    }
  ],

  ETC: [
    {
      name: NetworkUtils.makeNodeName('ETC', 'etccooperative'),
      type: NodeType.RPC,
      service: 'ETC Cooperative',
      url: 'https://www.ethercluster.com/etc'
    }
  ],

  RSK: [
    {
      name: NetworkUtils.makeNodeName('RSK', 'rsk_mainnet'),
      type: NodeType.RPC,
      service: 'mycrypto.rsk.co',
      url: 'https://mycrypto.rsk.co/'
    }
  ],

  AQUA: [
    {
      name: NetworkUtils.makeNodeName('AQUA', 'uncan.onical'),
      type: NodeType.RPC,
      service: 'c.onical.org',
      url: 'https://c.onical.org'
    }
  ],

  ASK: [
    {
      name: NetworkUtils.makeNodeName('ASK', 'permission'),
      type: NodeType.RPC,
      service: 'permission.io',
      url: 'https://blockchain-api-mainnet.permission.io/rpc'
    }
  ],

  ARTIS_SIGMA1: [
    {
      name: NetworkUtils.makeNodeName('ARTIS_SIGMA1', 'artis_sigma1'),
      type: NodeType.RPC,
      service: 'rpc.sigma1.artis.network',
      url: 'https://rpc.sigma1.artis.network'
    }
  ],

  ARTIS_TAU1: [
    {
      name: NetworkUtils.makeNodeName('ARTIS_TAU1', 'artis_tau1'),
      type: NodeType.RPC,
      service: 'rpc.tau1.artis.network',
      url: 'https://rpc.tau1.artis.network'
    }
  ],

  ATH: [
    {
      name: NetworkUtils.makeNodeName('ATH', 'rpc.atheios.org'),
      type: NodeType.RPC,
      service: 'rpc.atheios.org',
      url: 'https://rpc.atheios.org/'
    }
  ],

  CLO: [
    {
      name: NetworkUtils.makeNodeName('CLO', 'clo'),
      type: NodeType.RPC,
      service: '0xinfra.com',
      url: 'https://clo-geth.0xinfra.com/'
    }
  ],

  DEXON: [
    {
      name: NetworkUtils.makeNodeName('DEXON', 'dexon'),
      type: NodeType.RPC,
      service: 'dexon.org',
      url: 'https://mainnet-rpc.dexon.org'
    }
  ],

  EGEM: [
    {
      name: NetworkUtils.makeNodeName('EGEM', 'egem'),
      type: NodeType.RPC,
      service: 'egem.io',
      url: 'https://jsonrpc.egem.io/custom'
    }
  ],

  ETHO: [
    {
      name: NetworkUtils.makeNodeName('ETHO', 'ether1.org'),
      type: NodeType.RPC,
      service: 'ether1.org',
      url: 'https://rpc.ether1.org'
    }
  ],

  EXP: [
    {
      name: NetworkUtils.makeNodeName('EXP', 'tech'),
      type: NodeType.RPC,
      service: 'expanse.tech',
      url: 'https://node.expanse.tech/'
    }
  ],

  GO: [
    {
      name: NetworkUtils.makeNodeName('GO', 'go'),
      type: NodeType.RPC,
      service: 'gochain.io',
      url: 'https://rpc.gochain.io/'
    }
  ],

  GO_TESTNET: [
    {
      name: NetworkUtils.makeNodeName('GO_TESTNET', 'go_testnet'),
      type: NodeType.RPC,
      service: 'testnet-rpc.gochain.io',
      url: 'https://testnet-rpc.gochain.io/'
    }
  ],

  METADIUM: [
    {
      name: NetworkUtils.makeNodeName('METADIUM', 'metadium'),
      type: NodeType.RPC,
      service: 'api.metadium.com',
      url: 'https://api.metadium.com/prod'
    }
  ],

  MIX: [
    {
      name: NetworkUtils.makeNodeName('MIX', 'mix-blockchain.org'),
      type: NodeType.RPC,
      service: 'rpc2.mix-blockchain.org',
      url: 'https://rpc2.mix-blockchain.org:8647'
    }
  ],

  POA: [
    {
      name: NetworkUtils.makeNodeName('POA', 'core'),
      type: NodeType.RPC,
      service: 'core.poa.network',
      url: 'https://core.poa.network'
    }
  ],

  REOSC: [
    {
      name: NetworkUtils.makeNodeName('REOSC', 'reosc.io'),
      type: NodeType.RPC,
      service: 'remote.reosc.io',
      url: 'https://remote.reosc.io:3000'
    }
  ],

  RSK_TESTNET: [
    {
      name: NetworkUtils.makeNodeName('RSK_TESTNET', 'rsk_testnet'),
      type: NodeType.RPC,
      service: 'mycrypto.testnet.rsk.co',
      url: 'https://mycrypto.testnet.rsk.co/'
    }
  ],

  THUNDERCORE: [
    {
      name: NetworkUtils.makeNodeName('THUNDERCORE', 'thundercore'),
      type: NodeType.RPC,
      service: 'thundercore.com',
      url: 'https://mainnet-rpc.thundercore.com'
    }
  ],

  ETI: [
    {
      name: NetworkUtils.makeNodeName('ETI', 'eti'),
      type: NodeType.RPC,
      service: 'api.einc.io',
      url: 'https://api.einc.io/jsonrpc/mainnet/'
    }
  ],
  TOMO: [
    {
      name: NetworkUtils.makeNodeName('TOMO', 'tomochain'),
      type: NodeType.RPC,
      service: 'tomochain.com',
      url: 'https://rpc.tomochain.com'
    }
  ],

  UBQ: [
    {
      name: NetworkUtils.makeNodeName('UBQ', 'ubiqscan'),
      type: NodeType.RPC,
      service: 'ubiqscan.io',
      url: 'https://rpc1.ubiqscan.io'
    }
  ],

  WEB: [
    {
      name: NetworkUtils.makeNodeName('WEB', 'node1.webchain.network'),
      type: NodeType.RPC,
      service: 'node1.webchain.network',
      url: 'https://node1.webchain.network'
    },
    {
      name: NetworkUtils.makeNodeName('WEB', 'node2.webchain.network'),
      type: NodeType.RPC,
      service: 'node2.webchain.network',
      url: 'https://node2.webchain.network'
    }
  ],

  AUX: [
    {
      name: NetworkUtils.makeNodeName('AUX', 'auxilium'),
      type: NodeType.RPC,
      service: 'auxilium.global',
      url: 'https://rpc.auxilium.global'
    }
  ],

  ERE: [
    {
      name: NetworkUtils.makeNodeName('ERE', 'ethercore'),
      type: NodeType.RPC,
      service: 'ethercore.io',
      url: 'https://rpc.ethercore.io'
    }
  ],

  VOLTA: [
    {
      name: NetworkUtils.makeNodeName('VOLTA', 'volta-rpc.energyweb.org'),
      type: NodeType.RPC,
      service: 'energyweb.org',
      url: 'https://volta-rpc.energyweb.org'
    }
  ],

  EnergyWebChain: [
    {
      name: NetworkUtils.makeNodeName('EnergyWebChain', 'rpc.energyweb.org'),
      type: NodeType.RPC,
      service: 'energyweb.org',
      url: 'https://rpc.energyweb.org'
    }
  ],
  MATIC: [
    {
      name: NetworkUtils.makeNodeName('MATIC', 'maticvigil'),
      type: NodeType.RPC,
      service: 'Maticvigil',
      url: 'https://rpc-mainnet.maticvigil.com'
    },
    {
      name: NetworkUtils.makeNodeName('MATIC', 'quiknode'),
      type: NodeType.RPC,
      service: 'Quiknode',
      url: 'https://rpc-mainnet.matic.quiknode.pro'
    },
    {
      name: NetworkUtils.makeNodeName('MATIC', 'chainstacklabs'),
      type: NodeType.RPC,
      service: 'Chainstacklabs',
      url: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      name: NetworkUtils.makeNodeName('MATIC', 'bwarelabs'),
      type: NodeType.RPC,
      service: 'Bwarelabs',
      url: 'https://matic-mainnet-full-rpc.bwarelabs.com'
    },
    {
      name: NetworkUtils.makeNodeName('MATIC', 'matic'),
      type: NodeType.RPC,
      service: 'Matic',
      url: 'https://rpc-mainnet.matic.network'
    }
  ],
  xDAI: [
    {
      name: NetworkUtils.makeNodeName('xDAI', 'mycrypto'),
      type: NodeType.RPC,
      service: 'MyCrypto',
      url: 'https://xdai.mycryptoapi.com/'
    },
    {
      name: NetworkUtils.makeNodeName('xDAI', 'xdaichain.com'),
      type: NodeType.RPC,
      service: 'xdaichain.com',
      url: 'https://rpc.xdaichain.com/'
    }
  ],
  SmartChain: [
    {
      name: NetworkUtils.makeNodeName('SmartChain', 'bsc-dataseed.binance.org'),
      type: NodeType.RPC,
      service: 'bsc-dataseed.binance.org',
      url: 'https://bsc-dataseed.binance.org/'
    },
    {
      name: NetworkUtils.makeNodeName('SmartChain', 'bsc-dataseed1.defibit.io'),
      type: NodeType.RPC,
      service: 'bsc-dataseed1.defibit.io',
      url: 'https://bsc-dataseed1.defibit.io/'
    },
    {
      name: NetworkUtils.makeNodeName('SmartChain', 'bsc-dataseed1.ninicoin.io'),
      type: NodeType.RPC,
      service: 'bsc-dataseed1.ninicoin.io',
      url: 'https://bsc-dataseed1.ninicoin.io/'
    }
  ],
  SmartChainTestNetwork: [
    {
      name: NetworkUtils.makeNodeName(
        'SmartChainTestNetwork',
        'data-seed-prebsc-1-s3.binance.org:8545'
      ),
      type: NodeType.RPC,
      service: 'data-seed-prebsc-1-s1.binance.org',
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    }
  ],
  Avalanche: [
    {
      name: NetworkUtils.makeNodeName('Avalanche', 'api.avax.network'),
      type: NodeType.RPC,
      service: 'api.avax.network',
      url: 'https://api.avax.network/ext/bc/C/rpc'
    }
  ],
  AvalancheTestnet: [
    {
      name: NetworkUtils.makeNodeName('AvalancheTestnet', 'api.avax-test.network'),
      type: NodeType.RPC,
      service: 'api.avax-test.network',
      url: 'https://api.avax-test.network/ext/bc/C/rpc'
    }
  ],
  EVRICE: [
    {
      name: NetworkUtils.makeNodeName('EVRICE', 'meta.evrice.com'),
      type: NodeType.RPC,
      service: 'evrice.com',
      url: 'https://meta.evrice.com'
    }
  ],
  Fantom: [
    {
      name: NetworkUtils.makeNodeName('Fantom', 'rpcapi.fantom.network'),
      type: NodeType.RPC,
      service: 'fantom.network',
      url: 'https://rpcapi.fantom.network'
    }
  ]
};
