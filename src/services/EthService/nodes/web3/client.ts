import { randomBytes } from 'crypto';

import { JsonRPCResponse } from '@types';

import { IWeb3Provider, Web3Request } from './types';

export default class Web3Client {
  private provider: IWeb3Provider;

  constructor() {
    this.provider =
      (window as CustomWindow).ethereum || (window as CustomWindow).web3.currentProvider;
  }

  public id(): string | number {
    return randomBytes(16).toString('hex');
  }

  public decorateRequest = (req: Web3Request) => ({
    ...req,
    id: this.id(),
    jsonrpc: '2.0',
    params: req.params || [] // default to empty array so MetaMask doesn't error
  });

  public call = <T = JsonRPCResponse>(request: Web3Request): Promise<T> =>
    (this.sendAsync(this.decorateRequest(request)) as unknown) as Promise<T>;

  private sendAsync = (request: any): Promise<JsonRPCResponse | JsonRPCResponse[]> => {
    return new Promise((resolve, reject) => {
      this.provider.sendAsync(request, (error, result: JsonRPCResponse | JsonRPCResponse[]) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  };
}
