import React from 'react';
import classnames from 'classnames';
import Payment from 'payment';
import InputBaseComponent from '../InputBaseComponent';

class CreditCardNumberInput extends InputBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      creditCardType: undefined
    };
  }

  componentDidMount() {
    Payment.formatCardNumber(this.refs.number);
  }

  showActiveCreditCard() {
    if (this.state.creditCardType) {
      return (
        <img
          src={
            require('../../../../assets/images/' + this.state.creditCardType + '.png')
          }
          className='credit-card-img'
        />
      );
    }
  }

  changeValue(value) {
    // this.props.onChange(value);
  }

  validate(value) {
    this.props.validate(value);
    this.setState({
      creditCardType: Payment.fns.cardType(value)
    });
  }

  render() {
    const {
      type = 'text',
      placeHolder = '',
      name,
      fieldClassName = '',
      className = '',
      startValidatingWhenIsPristine = false
    } = this.props;
    return (
      <div className={fieldClassName}>
        {this.renderLabel()}
        <div
          className={
            classnames(
              !this.inputIsValid() ? 'invalid-field' : '',
              'credit-card-number-wrapper',
              !this.isPristine() && this.inputIsValid() ? 'valid-field' : ''
            )
          }
        >
          <input
            type={type}
            name={name}
            data-stripe={name}
            placeholder={placeHolder}
            className={
              classnames(!this.isPristine() && this.inputIsValid() ? 'input-valid' : '', "form-control")
            }
            ref={name}
            onKeyUp={(evt) => {
              const value = evt.target.value;
              this.props.onChange(value);
              if (startValidatingWhenIsPristine) {
                this.validate(value);
              } else {
                if (!this.isPristine()) {
                  this.validate(value);
                }
              }
            }}
            onBlur={(evt) => {
              const value = evt.target.value;
              this.props.onChange(value);
              this.validate(value);
            }}
            autoComplete='off'
          />
          {this.showActiveCreditCard()}
        </div>
        {this.renderError()}
      </div>
    );
  }
}

CreditCardNumberInput.propTypes = {
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

export default CreditCardNumberInput;
