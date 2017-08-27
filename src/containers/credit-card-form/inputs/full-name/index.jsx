import React from 'react';
import InputBaseComponent from '../InputBaseComponent';
import classnames from 'classnames';

class FullNameInput extends InputBaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      type = 'text',
      placeHolder = '',
      name,
      fieldClassName = '',
      className = '',
      value,
      startValidatingWhenIsPristine = false
    } = this.props;
    return (
      <div className={fieldClassName}>
        {this.renderLabel()}
        <input
          type={type}
          name={name}
          value={value}
          data-stripe={name}
          placeholder={placeHolder}
          className={
            classnames(!this.inputIsValid() ? 'invalid-field' : (!this.isPristine() ? 'valid-field' : ''), className)
          }
          ref={name}
          onChange={(evt) => {
            const value = evt.target.value;
            this.props.onChange(value);
            if (startValidatingWhenIsPristine) {
              this.props.validate(value);
            } else {
              if (!this.isPristine()) {
                this.props.validate(value);
              }
            }
          }}
          onBlur={(evt) => {
            const value = evt.target.value;
            this.props.onChange(value);
            this.props.validate(value);
          }}
          autoComplete='off'
        />
        {this.renderError()}
      </div>
    );
  }
}

FullNameInput.propTypes = {
  type: React.PropTypes.string.isRequired,
  placeHolder: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  fieldClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  validate: React.PropTypes.func,
  value: React.PropTypes.string,
  startValidatingWhenIsPristine: React.PropTypes.bool
};

export default FullNameInput;
