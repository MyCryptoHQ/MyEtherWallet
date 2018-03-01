import React from 'react';
import { toChecksumAddress } from 'ethereumjs-util';
import translate, { translateRaw } from 'translations';
import { IWallet } from 'libs/wallet';
import { print } from 'components/PrintableWallet';
import { Identicon, QRCode } from 'components/ui';
import { GenerateKeystoreModal, TogglablePassword } from 'components';
import './WalletInfo.scss';

interface Props {
  wallet: IWallet;
}

interface State {
  address: string;
  privateKey: string;
  isPrivateKeyVisible: boolean;
  isKeystoreModalOpen: boolean;
}

export default class WalletInfo extends React.PureComponent<Props, State> {
  public state = {
    address: '',
    privateKey: '',
    isPrivateKeyVisible: false,
    isKeystoreModalOpen: false
  };

  public componentDidMount() {
    this.setStateFromWallet(this.props.wallet);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.wallet !== nextProps.wallet) {
      this.setStateFromWallet(nextProps.wallet);
    }
  }

  public render() {
    const { address, privateKey, isPrivateKeyVisible, isKeystoreModalOpen } = this.state;

    return (
      <div className="WalletInfo">
        <div className="Tab-content-pane">
          <div className="row form-group">
            <div className="col-xs-11">
              <label>{translate('x_Address')}</label>
              <input className="form-control" disabled={true} value={address} />
            </div>
            <div className="col-xs-1" style={{ padding: 0 }}>
              <Identicon address={address} />
            </div>
          </div>

          {privateKey && (
            <div className="row form-group">
              <div className="col-xs-12">
                <label>{translate('x_PrivKey')}</label>
                <TogglablePassword
                  disabled={true}
                  value={privateKey}
                  isVisible={isPrivateKeyVisible}
                  toggleAriaLabel={translateRaw('GEN_Aria_2')}
                  handleToggleVisibility={this.togglePrivateKey}
                />
              </div>
            </div>
          )}
        </div>

        <div className="Tab-content-pane">
          <div className="row">
            <div className="col-xs-6">
              <label>Public Address</label>
              <div className="WalletInfo-qr well well-lg">
                <QRCode data={address} />
              </div>
            </div>
            {privateKey && (
              <div>
                <div className="col-xs-6">
                  <label>Private Key</label>
                  <div className="WalletInfo-qr well well-lg" onClick={this.togglePrivateKey}>
                    <QRCode data={isPrivateKeyVisible ? privateKey : '0'} />
                    {!isPrivateKeyVisible && (
                      <div className="WalletInfo-qr-cover">
                        <i className="WalletInfo-qr-cover-icon fa fa-eye" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-xs-6">
                  <label>Utilities</label>

                  <button className="btn btn-info btn-block" onClick={print(address, privateKey)}>
                    {translate('x_Print')}
                  </button>

                  <button className="btn btn-info btn-block" onClick={this.toggleKeystoreModal}>
                    Generate Keystore File
                  </button>
                </div>
              </div>
            )}

            <GenerateKeystoreModal
              isOpen={isKeystoreModalOpen}
              privateKey={privateKey}
              handleClose={this.toggleKeystoreModal}
            />
          </div>
        </div>
      </div>
    );
  }

  private setStateFromWallet(wallet: IWallet) {
    const address = toChecksumAddress(wallet.getAddressString());
    const privateKey = wallet.getPrivateKeyString ? wallet.getPrivateKeyString() : '';
    this.setState({ address, privateKey });
  }

  private togglePrivateKey = () => {
    this.setState({ isPrivateKeyVisible: !this.state.isPrivateKeyVisible });
  };

  private toggleKeystoreModal = () => {
    this.setState({ isKeystoreModalOpen: !this.state.isKeystoreModalOpen });
  };
}
