import React from 'react';
import classnames from 'classnames';

interface Props {
  isValid: boolean;
  isVisible: boolean;
  name: string;
  value: string;
  placeholder: string;
  handleInput(e: React.FormEvent<HTMLInputElement>): void;
  handleToggle(): void;
}

const KeystoreInput: React.SFC<Props> = ({
  isValid,
  isVisible,
  handleInput,
  name,
  value,
  placeholder,
  handleToggle
}) => (
  <div className="input-group">
    <input
      className={classnames('form-control', isValid ? 'is-valid' : 'is-invalid')}
      type={isVisible ? 'text' : 'password'}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleInput}
    />
    <span onClick={handleToggle} role="button" className="input-group-addon">
      <i className={`nc-icon nc-eye-${isVisible ? '19' : 'ban-20'}`} />
    </span>
  </div>
);

export default KeystoreInput;
