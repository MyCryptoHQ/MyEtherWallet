import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toFixedIfLarger } from 'utils/formatters';
import translate from 'translations';

export type ReduxStateProps = {
  referenceNumber: PropTypes.string,
  timeRemaining: PropTypes.string,
  originAmount: PropTypes.number.isRequired,
  originKind: PropTypes.string.isRequired,
  destinationKind: PropTypes.string.isRequired,
  destinationAmount: PropTypes.number.isRequired
};

export type ReduxActionProps = {
  restartSwap: PropTypes.func
};

export class SwapInfoHeader extends Component {
  props: ReduxStateProps & ReduxActionProps;

  computedOriginDestinationRatio = () => {
    return toFixedIfLarger(
      this.props.destinationAmount / this.props.originAmount,
      6
    );
  };

  isExpanded = () => {
    const { referenceNumber, timeRemaining, restartSwap } = this.props;
    return referenceNumber && timeRemaining && restartSwap;
  };

  computedClass = () => {
    if (this.isExpanded()) {
      return 'col-sm-3 order-info';
    } else {
      return 'col-sm-4 order-info';
    }
  };

  render() {
    const {
      referenceNumber,
      timeRemaining,
      originAmount,
      destinationAmount,
      originKind,
      destinationKind,
      restartSwap
    } = this.props;
    return (
      <div>
        <section className="row text-center">
          <div className="col-xs-3 text-left">
            <button className="btn btn-danger btn-xs" onClick={restartSwap}>
              Start New Swap
            </button>
          </div>
          <h5 className="col-xs-6">
            {translate('SWAP_information')}
          </h5>
          <div className="col-xs-3">
            <a
              className="link"
              href="https://bity.com/af/jshkb37v"
              target="_blank"
              rel="noopener"
            >
              <img
                className="pull-right"
                src={'https://www.myetherwallet.com/images/logo-bity.svg'}
                width={100}
                height={38}
              />
            </a>
          </div>
        </section>
        <section className="row order-info-wrap">
          {/*Amount to send */}
          {!this.isExpanded() &&
            <div className={this.computedClass()}>
              <h4>
                {` ${toFixedIfLarger(originAmount, 6)} ${originKind}`}
              </h4>
              <p>
                {translate('SEND_amount')}
              </p>
            </div>}

          {/* Reference Number*/}
          {this.isExpanded() &&
          <div className={this.computedClass()}>
              <h4>
                {referenceNumber}
              </h4>
              <p>
                {translate('SWAP_ref_num')}
              </p>
            </div>}

          {/*Time remaining*/}
          {this.isExpanded() &&
          <div className={this.computedClass()}>
              <h4>
                {timeRemaining}
              </h4>
              <p>
                {translate('SWAP_time')}
              </p>
            </div>}

          {/*Amount to Receive*/}
          <div className={this.computedClass()}>
            <h4>
              {` ${toFixedIfLarger(destinationAmount, 6)} ${destinationKind}`}
            </h4>
            <p>
              {translate('SWAP_rec_amt')}
            </p>
          </div>

          {/*Your rate*/}
          <div className={this.computedClass()}>
            <h4>
              {` ${toFixedIfLarger(
                this.computedOriginDestinationRatio(),
                6
              )} ${originKind}/${destinationKind} `}
            </h4>
            <p>
              {translate('SWAP_your_rate')}
            </p>
          </div>
        </section>
      </div>
    );
  }
}
