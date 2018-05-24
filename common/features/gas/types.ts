import { GasEstimates } from 'api/gas';

export interface GasState {
  estimates: GasEstimates | null;
  isEstimating: boolean;
}

export enum GAS {
  FETCH_ESTIMATES = 'GAS_FETCH_ESTIMATES',
  SET_ESTIMATES = 'GAS_SET_ESTIMATES'
}

export interface FetchGasEstimatesAction {
  type: GAS.FETCH_ESTIMATES;
}

export interface SetGasEstimatesAction {
  type: GAS.SET_ESTIMATES;
  payload: GasEstimates;
}

/*** Union Type ***/
export type GasAction = FetchGasEstimatesAction | SetGasEstimatesAction;
