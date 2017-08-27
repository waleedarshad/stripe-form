import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import {
  CreditCardNumberInput,
  CreditCardExpiryInput,
  CreditCardCVCInput,
  FullNameInput
} from './inputs';

import Form from 'react-awesome-form-validator';
import { isAlpha, isEmail } from 'validator';
import Payment from 'payment';

// require('../assets/styles.scss');

class CreditCardForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stripeLoadingError: false,
      paymentError: '',
      loading: false,
      serverErrors: {}
    };
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.onScriptLoaded();
    }
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed, serverErrors }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        this.onScriptLoaded();
      } else {
        this.onScriptError();
      }
    }

    if (this.props.serverErrors != serverErrors && Object.keys(serverErrors).length) {
      this.setState({ serverErrors });
    }
  }

  onScriptLoaded() {
    if (!this.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey(this.props.publishableKey);

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }

  onSubmit(formData) {
    const expiry = Payment.fns.cardExpiryVal(formData.expiry);

    this.setState({ paymentError: '', loading: true, serverErrors: {} });
    Stripe.createToken({
      name: formData.name,
      number: formData.number.replace(/ /g, ''),
      expMonth: expiry.month,
      expYear: expiry.year
    }, (status, response) => {
      if (response.error) {
        let { param } = response.error;
        const { message } = response.error;
        if (param == 'exp_year') {
          param = 'expiry';
        }
        this.setState({
          serverErrors: { [param]: message },
          paymentError: response.error.message, loading: false
        });
      } else {
        this.setState({ loading: false });
        this.props.onSubmit({
          name: formData.name,
          token: response.id
        });
      }
    });
  }

  renderFormError() {
    if (this.state.paymentError.length) {
      return (<p className='form-errors'>Your Credit Card info is not valid</p>);
    }

    if (this.props.formError.length) {
      return (<p className='form-errors'>{ this.props.formError }</p>);
    }

    return (<span />);
  }

  render() {
    return (
      <Form
        className='form'
        onSubmit={(formData) => this.onSubmit(formData)}
        serverErrors={this.state.serverErrors}
      >
        <h1 className=''>Secure Payment</h1>
        <Form.CustomInput>
          <FullNameInput
            name='name'
            fieldClassName='inputWrapper'
            className=''
            placeHolder='Enter your name here...'
            type='text'
            label='Name (as it appears on your card) *'
            validate={(value) => {
              let valid = true;
              let errorMessage = '';
              if (!value.length) {
                valid = false;
                errorMessage = 'This field is required';
              } else if (!isAlpha(value.replace(/\s/g, ''))) {
                valid = false;
                errorMessage = 'You must enter only characters';
              }
              return { valid, errorMessage };
            }}
            startValidatingWhenIsPristine
          />
        </Form.CustomInput>
        <Form.CustomInput>
          <CreditCardNumberInput
            name='number'
            placeHolder='Enter your card number here...'
            fieldClassName='inputWrapper'
            type='text'
            label='Card number *'
            validate={(value) => {
              let valid = true;
              let errorMessage = '';
              const creditCardNumber = value.replace(/ /g, '');
              const cardType = Payment.fns.cardType(value);
              if (!creditCardNumber.length) {
                valid = false;
                errorMessage = 'This field is required';
              } else if (cardType !== 'visa' && cardType !== 'mastercard' && cardType !== 'amex') {
                valid = false;
                errorMessage = 'This does not appear to be a valid credit card.';
              } else if ((cardType == 'visa' || cardType == 'mastercard') && creditCardNumber.length !== 16) {
                valid = false;
                errorMessage = 'Credit card number is invalid.';
              } else if (cardType == 'amex' && creditCardNumber.length !== 15) {
                valid = false;
                errorMessage = 'Credit card number is invalid.';
              }
              return { valid, errorMessage };
            }}
            startValidatingWhenIsPristine
          />
        </Form.CustomInput>
        <Form.CustomInput>
          <CreditCardExpiryInput
            name='expiry'
            type='text'
            placeHolder='MM / YY'
            fieldClassName='inputWrapper'
            label='Expiration Date *'
            validate={(value) => {
              let valid = true;
              let errorMessage = '';
              const expiry = Payment.fns.cardExpiryVal(value);
              if (!value.length) {
                valid = false;
                errorMessage = 'This field is required';
              } else if (!Payment.fns.validateCardExpiry(expiry.month, expiry.year)) {
                valid = false;
                errorMessage = 'Expiration Date is in the past';
              }
              return { valid, errorMessage };
            }}
            startValidatingWhenIsPristine
          />
        </Form.CustomInput>
        <Form.CustomInput>
          <CreditCardCVCInput
            name='cvc'
            type='text'
            placeHolder='CVC'
            fieldClassName='inputWrapper'
            label='Security Code *'
            validate={(value) => {
              let valid = true;
              let errorMessage = '';
              if (!value.length) {
                valid = false;
                errorMessage = 'This field is required';
              } else if (!Payment.fns.validateCardCVC(value)) {
                valid = false;
                errorMessage = 'Security Code must be 3 digts';
              }
              return { valid, errorMessage };
            }}
            startValidatingWhenIsPristine
          />
        </Form.CustomInput>
        <Form.SubmitButton
          fieldClassName=''
          className=''
          disabledUntilFormIsValidated
        >{this.props.submitButtonText}</Form.SubmitButton>
        {this.renderFormError()}
      </Form>
    );
  }
}

CreditCardForm.propTypes = {
  publishableKey: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  submitButtonText: React.PropTypes.string.isRequired,
  serverErrors: React.PropTypes.shape({}),
  formError: React.PropTypes.string.isRequired,
  showLoading: React.PropTypes.bool.isRequired,
  isScriptLoaded: React.PropTypes.bool,
  isScriptLoadSucceed: React.PropTypes.bool
};

export default scriptLoader([
  'https://js.stripe.com/v2/'
])(CreditCardForm);
