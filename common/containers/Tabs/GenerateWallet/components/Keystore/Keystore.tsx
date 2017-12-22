import {
  continueToPaper,
  generateNewWallet,
  resetGenerateWallet,
  TContinueToPaper,
  TGenerateNewWallet,
  TResetGenerateWallet
} from 'actions/generateWallet';
import { IFullWallet } from 'ethereumjs-wallet';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'reducers';
import DownloadWallet from './DownloadWallet';
import EnterPassword from './EnterPassword';
import PaperWallet from './PaperWallet';

interface Props {
  // Redux state
  activeStep: string; // FIXME union actual steps
  password: string;
  wallet: IFullWallet | null | undefined;
  // Actions
  generateNewWallet: TGenerateNewWallet;
  continueToPaper: TContinueToPaper;
  resetGenerateWallet: TResetGenerateWallet;
}

class GenerateKeystore extends Component<Props, {}> {
  public componentWillUnmount() {
    this.props.resetGenerateWallet();
  }

  public render() {
    const { activeStep, wallet, password } = this.props;
    let content;

    const AnyEnterPassword = EnterPassword as new () => any;

    switch (activeStep) {
      case 'password':
        content = <AnyEnterPassword generateNewWallet={this.props.generateNewWallet} />;
        break;

      case 'download':
        if (wallet) {
          content = (
            <DownloadWallet
              wallet={wallet}
              password={password}
              continueToPaper={this.props.continueToPaper}
            />
          );
        }
        break;

      case 'paper':
        if (wallet) {
          content = <PaperWallet wallet={wallet} />;
        } else {
          content = <h1>Uh oh. Not sure how you got here.</h1>;
        }
        break;

      default:
        content = <h1>Uh oh. Not sure how you got here.</h1>;
    }

    return content;
  }
}

function mapStateToProps(state: AppState) {
  return {
    activeStep: state.generateWallet.activeStep,
    password: state.generateWallet.password,
    wallet: state.generateWallet.wallet
  };
}

export default connect(mapStateToProps, {
  generateNewWallet,
  continueToPaper,
  resetGenerateWallet
})(GenerateKeystore);
