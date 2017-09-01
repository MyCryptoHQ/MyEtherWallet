import React from 'react';
import './index.scss';

export default class UnfinishedBanner extends React.Component {
  state = {
    isFading: false,
    hasAcknowledged: false
  };

  _continue = () => {
    this.setState({ isFading: true });

    setTimeout(() => {
      this.setState({ hasAcknowledged: true });
    }, 1000);
  };
  render() {
    if (this.state.hasAcknowledged) {
      return null;
    }

    const isFading = this.state.isFading ? 'is-fading' : '';

    return (
      <div className={`UnfinishedBanner ${isFading}`} onClick={this._continue}>
        <div className="UnfinishedBanner-content">
          <h2>Under Contruction</h2>
          <p>
            The ENS section is still under-contruction - Expect unfinished
            components
          </p>

          <h3>Click to continue</h3>
        </div>
      </div>
    );
  }
}
