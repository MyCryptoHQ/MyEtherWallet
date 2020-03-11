import { TranslateMarkdown } from 'v2/components';
import { BearishIndicator, BullishIndicator, NeutralIndicator } from './components';

import moderateRisk from 'assets/images/defizap/moderateRisk.svg';
import conservativeRisk from 'assets/images/defizap/conservativeRisk.svg';
import aggressiveRisk from 'assets/images/defizap/aggressiveRisk.svg';
import unipoolBreakdown from 'assets/images/defizap/breakdowns/unipoolBreakdown.svg';
import compoundBreakdown from 'assets/images/defizap/breakdowns/compoundBreakdown.svg';
import smartContractIcn from 'assets/images/defizap/icn-smart-contract.svg';
import inverstingIcn from 'assets/images/defizap/icn-investing.svg';
import collateralizationIcn from 'assets/images/defizap/icn-collateralization.svg';
import liquidityIcn from 'assets/images/defizap/icn-liquidity.svg';
import innovationIcn from 'assets/images/defizap/icn-innovation.svg';
import diversificationIcn from 'assets/images/defizap/icn-diversification.svg';

export enum IZapType {
  UNIPOOL = 'UNIPOOL',
  COMPOUND = 'COMPOUND'
}

export interface IZapConfig {
  title: string;
  name: string;
  key: string;
  contractAddress: string;
  description: string;
  outlook: string;
  link: string;
  minimumGasLimit: number;
  ctaText: string;
  risk: number;
  platformsUsed: string[];
  bulletPoints: string[];
  zapType: IZapType;
  interestTokenAddr: string;
  poolTokenUUID: string;
  breakdownImage: any;
  breakdownTooltip: string;
  positionDetails(): JSX.Element;
}

export type IZapConfigObject = {
  [key in IZapId]: IZapConfig;
};

export enum IZapId {
  unipoolseth = 'unipoolseth',
  unipooldai = 'unipooldai',
  compounddai = 'compounddai'
}

export interface RiskAndReward {
  icon: any;
  text: string;
}

export const fetchZapRiskObject = (riskLevel: number) => {
  switch (riskLevel) {
    default:
    case 1:
      return { text: 'Conservative', image: conservativeRisk };
    case 2:
      return { text: 'Moderate', image: moderateRisk };
    case 3:
      return { text: 'Aggressive', image: aggressiveRisk };
  }
};

export const defaultZapId = 'unipoolseth';

export const ZAPS_CONFIG: IZapConfigObject = {
  unipoolseth: {
    title: 'Everyday ETH Investment',
    name: 'sETH Unipool',
    key: 'unipoolseth',
    contractAddress: '0xd3EBA712988df0F8A7e5073719A40cE4cbF60b33',
    risk: 1,
    description:
      'Preserve your ETH price exposure and earn a variable interest rate (generally 1-2%) by lending on the Uniswap exchange protocol.',
    outlook: 'bullish',
    link: 'https://defizap.com/zaps/unipoolseth',
    ctaText: 'Get Started',
    minimumGasLimit: 1500000,
    platformsUsed: ['uniswap'],
    bulletPoints: [
      'Retain 100% ETH Exposure.',
      'Earn interest by lending to the Synthetic ETH pool on the Uniswap exchange protocol.'
    ],
    zapType: IZapType.UNIPOOL,
    poolTokenUUID: 'ca27272a-891e-577d-ae75-f8efe4d55231',
    interestTokenAddr: '0xe9Cf7887b93150D4F2Da7dFc6D502B216438F244',
    breakdownImage: unipoolBreakdown,
    breakdownTooltip: 'This zap stores funds in the Uniswap exchange protocol',
    positionDetails: () => BullishIndicator({ text: 'Bullish on ETH' })
  },

  unipooldai: {
    title: 'Interest-earning ETH Hedge',
    name: 'DAI Unipool',
    key: 'unipooldai',
    contractAddress: '0x929A10EfDA7099865dAD8286Aee8715078902d51',
    risk: 1,
    description:
      'Hedge against ETH price volatility and earn a variable interest rate (generally 5-25%) by lending on the Uniswap exchange protocol.',
    outlook: 'neutral',
    link: 'https://defizap.com/zaps/unipooldai',
    ctaText: 'Get Started',
    minimumGasLimit: 1500000,
    platformsUsed: ['uniswap'],
    bulletPoints: [
      'Reduce your exposure to changes in the price of ETH.',
      'Earn interest by lending to the DAI pool on the Uniswap exchange protocol.'
    ],
    zapType: IZapType.UNIPOOL,
    poolTokenUUID: '2b7a4d65-9c40-5c21-96eb-f7d380a4dc87',
    interestTokenAddr: '0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667',
    breakdownImage: unipoolBreakdown,
    breakdownTooltip: 'This zap stores funds in the Uniswap exchange protocol',
    positionDetails: () => NeutralIndicator({ text: 'Neutral on ETH' })
  },
  compounddai: {
    title: 'Interest-earning with DAI',
    name: 'Compound DAI Pool',
    key: 'compounddai',
    contractAddress: '0x225078aea64696c6e4fe3960e471ca45aa9bdae4',
    risk: 2,
    description:
      'Earn interest of up to 8% a year by contributing to the Compound money market protocol. Remove your ETH price exposure.',
    outlook: 'bearish',
    link: 'https://app.compound.finance',
    ctaText: 'Get Started',
    minimumGasLimit: 1800000,
    platformsUsed: ['compound', 'kyber'],
    bulletPoints: [
      'Remove your exposure to changes in the price of ETH.',
      'Contribute your DAI to a money market protocol to earn interest of up to 8% a year'
    ],
    zapType: IZapType.COMPOUND,
    poolTokenUUID: 'a9cc6884-14bd-53b6-abcd-f9b56b60463d',
    interestTokenAddr: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    breakdownImage: compoundBreakdown,
    breakdownTooltip: 'This zap stores funds in the Compound money market protocol',
    positionDetails: () => BearishIndicator({ text: 'Bearish on ETH' })
  }
};

export const riskAndReward: RiskAndReward[] = [
  {
    text:
      '**Smart Contract:** there is a chance that  smart contracts get hacked and you lose all your money',
    icon: smartContractIcn
  },
  {
    text: '**Investing:** put your ETH to work for you, potential to watch your money grow',
    icon: inverstingIcn
  },
  {
    text:
      '**Collateralization:** if the crypto price swings you don’t get liquidated nor does the entire system collapse',
    icon: collateralizationIcn
  },
  {
    text:
      '**Innvoation:** Take advantage of innovative decentralized tools avaiable to ETH holders',
    icon: innovationIcn
  },
  {
    text: '**Liquidity:** markets are more inefficient when they are more shallow',
    icon: liquidityIcn
  },
  {
    text: '**Diversification:** Expand your investment portfolio leveraging your ETH',
    icon: diversificationIcn
  }
];

export const accordionContent = [
  {
    title: 'How is the MyCrypto Compound integration different than the main Compound Interface?',
    component: TranslateMarkdown({
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  },
  {
    title: 'How are interest rates set?',
    component: TranslateMarkdown({
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  },
  {
    title: 'How is interest calculated?',
    component: TranslateMarkdown({
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  },
  {
    title: 'How do I get the original asset back?',
    component: TranslateMarkdown({
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  },
  {
    title: 'How do I borrow assets?',
    component: TranslateMarkdown({
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  },
  {
    title: 'How long do I have to use Compound for?',
    component: TranslateMarkdown({
      source:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  }
];
