// @flow
import Big from 'bignumber.js';
import translate from 'translations';
import { addHexPrefix } from 'ethereumjs-util';
import { isValidETHAddress } from 'libs/validators';
import ERC20 from 'libs/erc20';
import { toTokenUnit } from 'libs/units';
import type BaseNode from 'libs/nodes/base';
import type { BaseWallet } from 'libs/wallet';
import type { Token } from 'config/data';

// TODO: Enforce more bigs, or find better way to avoid ether vs wei for value
export type TransactionWithoutGas = {|
  from: string,
  to: string,
  gasLimit?: string | number,
  value: string | number,
  data?: string,
  chainId?: number
|};

export type Transaction = {|
  ...TransactionWithoutGas,
  gasPrice: string | number
|};

export type RawTransaction = {|
  nonce: string,
  gasPrice: string,
  gasLimit: string,
  to: string,
  value: string,
  data: string,
  chainId: number
|};

export type BroadcastTransaction = {|
  ...RawTransaction,
  rawTx: string,
  signedTx: string
|};

export async function generateTransaction(
  node: BaseNode,
  tx: Transaction,
  wallet: BaseWallet,
  token: ?Token
): Promise<BroadcastTransaction> {
  // Reject bad addresses
  if (!isValidETHAddress(tx.to)) {
    throw new Error(translate('ERROR_5'));
  }

  // Reject token transactions without data
  if (token && !tx.data) {
    throw new Error('Tokens must be sent with data');
  }

  // Reject gas limit under 21000 (Minimum for transaction)
  // Reject if limit over 5000000
  // TODO: Make this dynamic, the limit shifts
  const limitBig = new Big(tx.gasLimit);
  if (limitBig.lessThan(21000)) {
    throw new Error(
      translate('Gas limit must be at least 21000 for transactions')
    );
  }

  if (limitBig.greaterThan(5000000)) {
    throw new Error(translate('GETH_GasLimit'));
  }

  // Reject gas over 1000gwei (1000000000000)
  const gasPriceBig = new Big(tx.gasPrice);
  if (gasPriceBig.greaterThan(new Big('1000000000000'))) {
    throw new Error(
      'Gas price too high. Please contact support if this was not a mistake.'
    );
  }

  // Ensure their balance exceeds the amount they're sending
  // TODO: Include gas price too, tokens should probably check ETH too
  let value;
  let balance;

  if (token) {
    // $FlowFixMe - We reject above if tx has no data for token
    value = new Big(ERC20.$transfer(tx.data).value);
    balance = toTokenUnit(await node.getTokenBalance(tx.from, token), token);
  } else {
    value = new Big(tx.value);
    balance = await node.getBalance(tx.from);
  }

  if (value.gte(balance)) {
    throw new Error(translate('GETH_Balance'));
  }

  // Generate the raw transaction
  const txCount = await node.getTransactionCount(tx.from);
  const rawTx = {
    nonce: addHexPrefix(txCount),
    gasPrice: addHexPrefix(new Big(tx.gasPrice).toString(16)),
    gasLimit: addHexPrefix(new Big(tx.gasLimit).toString(16)),
    to: addHexPrefix(tx.to),
    value: token ? '0x0' : addHexPrefix(value.toString(16)),
    data: tx.data ? addHexPrefix(tx.data) : '',
    chainId: tx.chainId || 1
  };

  // Sign the transaction
  const rawTxJson = JSON.stringify(rawTx);
  const signedTx = await wallet.signRawTransaction(rawTx);

  // Repeat all of this shit for Flow typechecking. Sealed objects don't
  // like spreads, so we have to be explicit.
  return {
    nonce: rawTx.nonce,
    gasPrice: rawTx.gasPrice,
    gasLimit: rawTx.gasLimit,
    to: rawTx.to,
    value: rawTx.value,
    data: rawTx.data,
    chainId: rawTx.chainId,
    rawTx: rawTxJson,
    signedTx: signedTx
  };
}
