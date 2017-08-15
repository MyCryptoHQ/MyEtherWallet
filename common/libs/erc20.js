// @flow
import Contract from 'libs/contract';
import type { ABI } from 'libs/contract';
import Big from 'bignumber.js';

const erc20Abi: ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    type: 'function'
  }
];

class ERC20 extends Contract {
  constructor() {
    super(erc20Abi);
  }

  balanceOf(address: string): string {
    return this.call('balanceOf', [address]);
  }

  transfer(to: string, value: string | number | Big): string {
    return this.call('transfer', [to, new Big(value).toString()]);
  }
}

export default new ERC20();
