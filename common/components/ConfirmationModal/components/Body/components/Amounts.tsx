import React from 'react';
import { UnitDisplay } from 'components/ui';
import BN from 'bn.js';
import './Amounts.scss';
import { AppState } from 'reducers';

interface Props {
  sendValue: BN;
  fee: BN;
  networkUnit: string;
  decimal: number;
  unit: string;
  isToken: boolean;
  isTestnet: boolean | undefined;
  rates: AppState['rates']['rates'];
}

export const Amounts: React.SFC<Props> = ({
  sendValue,
  fee,
  networkUnit,
  decimal,
  unit,
  isToken,
  isTestnet,
  rates
}) => {
  const total = sendValue.add(fee);
  const sendValueUSD = isTestnet
    ? new BN(0)
    : sendValue.muln(rates[isToken ? unit : networkUnit].USD);
  const transactionFeeUSD = isTestnet ? new BN(0) : fee.muln(rates[networkUnit].USD);
  const totalUSD = sendValueUSD.add(transactionFeeUSD);
  const showConversion = !isTestnet && rates && rates.networkUnit;
  return (
    <div className="tx-modal-amount">
      <div className="tx-modal-amount-send">
        <div className="tx-modal-amount-send-positioning-wrapper">
          <h5>You'll Send </h5>
          <h5>
            <UnitDisplay
              decimal={decimal}
              value={sendValue}
              symbol={isToken ? unit : networkUnit}
              checkOffline={false}
            />
            {showConversion && (
              <span className="tx-modal-amount-send-usd small">
                $<UnitDisplay
                  value={sendValueUSD}
                  unit="ether"
                  displayShortBalance={2}
                  displayTrailingZeroes={true}
                  checkOffline={true}
                />
              </span>
            )}
          </h5>
        </div>
      </div>
      <div className="tx-modal-amount-fee">
        <div className="tx-modal-amount-fee-positioning-wrapper">
          <h5>Transaction Fee </h5>
          <h5>
            <UnitDisplay
              value={fee}
              unit="ether"
              symbol={networkUnit}
              displayShortBalance={6}
              checkOffline={false}
            />
            {showConversion && (
              <span className="tx-modal-amount-fee-usd small">
                $<UnitDisplay
                  value={transactionFeeUSD}
                  unit="ether"
                  displayShortBalance={2}
                  displayTrailingZeroes={true}
                  checkOffline={true}
                />
              </span>
            )}
          </h5>
        </div>
      </div>
      {unit === 'ether' && (
        <div className="tx-modal-amount-total">
          <div className="tx-modal-amount-total-positioning-wrapper">
            <h5>Total </h5>
            <h5>
              <UnitDisplay
                value={total}
                decimal={decimal}
                symbol={isToken ? unit : networkUnit}
                checkOffline={false}
              />
              {showConversion && (
                <span className="tx-modal-amount-total-usd small">
                  $<UnitDisplay
                    value={totalUSD}
                    unit="ether"
                    displayShortBalance={2}
                    displayTrailingZeroes={true}
                    checkOffline={true}
                  />
                </span>
              )}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};
