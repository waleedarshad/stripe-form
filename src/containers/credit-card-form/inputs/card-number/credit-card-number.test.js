import React from 'react';
import { shallow, mount } from 'enzyme';
import CreditCardNumberInput from './index.jsx';
import Payment from 'payment';

const validate = (value, extra = {}) => {
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
};

const props = {
  type: 'text',
  placeHolder: 'Enter your card number here...',
  label: 'Card number *',
  name: 'number',
  className: 'number',
  fieldClassName: '',
  value: '',
  valid: false,
  dirty: false,
  errorMessage: '',
  forceDirty: false,
  startValidatingWhenIsPristine: true,
  onChange(value) {},
  validate(value, extra = {}) {}
};


describe('CreditCardNumberInput component', () => {
  it('properly renders the input', () => {
    const wrapper = shallow(<CreditCardNumberInput {...props} />);
    expect(wrapper.find('input')).to.have.length(1);
  });


  it('should add an invalid-field class to the input when the user leaves the input empty', () => {
    const wrapper = mount(<CreditCardNumberInput {...props} />);

    wrapper.setProps({
      validate: (value, extra = {}) => {
        if (validate) {
          const validateObj = validate(value, extra);
          wrapper.setProps({
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          });
        } else {
          wrapper.setProps({
            valid: true,
            errorMessage: '',
            dirty: true
          });
        }
      }
    });
    wrapper.find('input').simulate('blur', { target: { value: '' } });
    expect(wrapper.find('.credit-card-number-wrapper').props().className).to.contain('invalid-field');
  });

  it('should add an invalid-field class to the input when the user types and invalid credit card number', () => {
    const wrapper = mount(<CreditCardNumberInput {...props} />);
    wrapper.setProps({
      validate: (value, extra = {}) => {
        if (validate) {
          const validateObj = validate(value, extra);
          wrapper.setProps({
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          });
        } else {
          wrapper.setProps({
            valid: true,
            errorMessage: '',
            dirty: true
          });
        }
      }
    });
    wrapper.find('input').simulate('keyUp', { target: { value: 'abc' } });
    expect(wrapper.find('.credit-card-number-wrapper').props().className).to.contain('invalid-field');
  });

  it('should display an error text when the user leaves the input empty', () => {
    const wrapper = mount(<CreditCardNumberInput {...props} />);

    wrapper.setProps({
      validate: (value, extra = {}) => {
        if (validate) {
          const validateObj = validate(value, extra);
          wrapper.setProps({
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          });
        } else {
          wrapper.setProps({
            valid: true,
            errorMessage: '',
            dirty: true
          });
        }
      }
    });
    wrapper.find('input').simulate('blur', { target: { value: '' } });
    expect(wrapper.find('span').props().children).to.be.equal('This field is required');
  });

  it('should display an error text when the user types and invalid credit card number', () => {
    const wrapper = mount(<CreditCardNumberInput {...props} />);

    wrapper.setProps({
      validate: (value, extra = {}) => {
        if (validate) {
          const validateObj = validate(value, extra);
          wrapper.setProps({
            valid: validateObj.valid,
            errorMessage: validateObj.errorMessage,
            dirty: true
          });
        } else {
          wrapper.setProps({
            valid: true,
            errorMessage: '',
            dirty: true
          });
        }
      }
    });
    wrapper.find('input').simulate('keyUp', { target: { value: '899995454549854985498945' } });
    expect(wrapper.find('span').props().children).to.be.equal('This does not appear to be a valid credit card.');
  });

  it('should change its value when we call to its onChange prop', () => {
    const wrapper = mount(<CreditCardNumberInput {...props} />);
    const value = 'test';
    wrapper.setProps({
      onChange: (value) => {
        wrapper.setProps({ value });
      }
    });

    wrapper.find('input').simulate('keyUp', { target: { value } });
    expect(wrapper.props().value).to.be.equal(value);
  });
});
