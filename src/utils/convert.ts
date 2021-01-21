import BigNumberJs from 'bignumber.js';
import { BigNumber, bigNumberify, formatEther, parseEther } from 'ethers/utils';

import { DEFAULT_ASSET_DECIMAL } from '@config';
import { StoreAsset } from '@types';

import { bigify } from './bigify';
import { fromTokenBase } from './units';

export const convertToFiatFromAsset = (asset: StoreAsset, rate: number = 1): string => {
  const splitRate = rate.toString().split('.');
  const decimals = splitRate.length > 1 ? splitRate[1].length : 0;
  const rateDivisor = Math.pow(10, decimals);
  const rateBN = bigNumberify(Math.round(rate * rateDivisor));

  const convertedFloat = weiToFloat(asset.balance.mul(rateBN), asset.decimal);
  return convertedFloat.dividedBy(rateDivisor).toString();
};

export const convertToFiat = (
  userViewableBalance: BigNumberJs | string,
  rate: number = 1
): BigNumberJs => {
  return bigify(userViewableBalance).multipliedBy(bigify(rate));
};

// Converts a decimal to an ethers.js BN
export const convertToBN = (asset: number | string): BigNumber => {
  const assetBN = parseEther(asset.toString());
  return assetBN;
};

// Multiply a floating-point BN by another floating-point BN
export const multiplyBNFloats = (
  asset: number | string | BigNumberJs,
  rate: number | string | BigNumberJs
): BigNumber => {
  const assetBN = bigify(asset);
  const rateBN = bigify(rate);
  return bigNumberify(parseEther(trimBN(assetBN.times(rateBN).toFixed(DEFAULT_ASSET_DECIMAL))));
};

// Divide a floating-point BNs by another floating-point BN
export const divideBNFloats = (
  asset: number | string | BigNumberJs,
  divisor: number | string | BigNumberJs
): BigNumber => {
  const assetBN = bigify(asset);
  const divisorBN = bigify(divisor);
  return bigNumberify(
    parseEther(trimBN(assetBN.dividedBy(divisorBN).toFixed(DEFAULT_ASSET_DECIMAL)))
  );
};

// Subtract a floating-point BNs from another floating-point BN
export const subtractBNFloats = (
  asset: number | string,
  subtractor: number | string
): BigNumber => {
  const assetBN = bigify(asset);
  const subtractorBN = bigify(subtractor);
  return bigNumberify(
    parseEther(
      trimBN(BigNumberJs.sum(assetBN, subtractorBN.negated()).toFixed(DEFAULT_ASSET_DECIMAL))
    )
  );
};

// Add a floating-point BNs to another floating-point BN
export const addBNFloats = (asset: number | string, additor: number | string): BigNumber => {
  const assetBN = bigify(asset);
  const additorBN = bigify(additor);
  return bigNumberify(
    parseEther(trimBN(BigNumberJs.sum(assetBN, additorBN).toFixed(DEFAULT_ASSET_DECIMAL)))
  );
};

// Trims a bn string to 18 characters.
export const trimBN = (
  bigNumberString: string,
  numOfPlaces: number = DEFAULT_ASSET_DECIMAL
): string => {
  if (bigNumberString.length <= numOfPlaces) return bigNumberString;
  return bigNumberString.substr(0, numOfPlaces);
};

// Note: This can in some cases remove useful decimals
export const weiToFloat = (wei: BigNumber, decimal?: number): BigNumberJs =>
  bigify(fromTokenBase(bigify(wei), decimal));

export const withCommission = ({
  amount,
  rate,
  subtract
}: {
  amount: BigNumber;
  rate: number;
  subtract?: boolean;
}): BigNumberJs => {
  const commission = subtract ? (100 - rate) / 100 : (100 + rate) / 100;
  const outputBN = multiplyBNFloats(weiToFloat(amount), commission);
  return bigify(trimBN(formatEther(outputBN)));
};

export const calculateMarkup = (
  exchangeRate: BigNumberJs | string,
  costBasis: BigNumberJs | string
): string =>
  bigify(1)
    .minus(bigify(trimBN(formatEther(divideBNFloats(exchangeRate, costBasis).toString()), 10)))
    .multipliedBy(100)
    .toString();
