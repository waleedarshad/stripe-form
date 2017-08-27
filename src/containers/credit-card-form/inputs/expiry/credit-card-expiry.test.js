import React from 'react';
import { shallow, mount } from 'enzyme';
import CreditCardExpiryInput from './index.jsx';
import Payment from 'payment';

const validate = (value, extra = {}) => {
  let valid = true;
  let errorMessage = '';
  const expiry = Payment.fns.cardExpiryVal(value);
  if (!value.length) {
    valid = false;
    errorMessage = 'This field is required';
  } else if (!Payment.fns.validateCardExpiry(expiry.month, expiry.year)) {
    valid = false;
    errorMessage = 'Expiration Date is on the past';
  }
  return { valid, errorMessage };
};

const props = {
  type: 'text',
  placeHolder: 'MM / YY',
  label: 'Expiration Date *',
  name: 'expiry',
  className: 'expiry',
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


describe('CreditCardExpiryInput component', () => {
  it('properly renders the input', () => {
    const wrapper = shallow(<CreditCardExpiryInput {...props} />);
    expect(wrapper.find('input')).to.have.length(1);
  });


  it('should add an invalid-field class to the input when the user leaves the input empty', () => {
    const wrapper = mount(<CreditCardExpiryInput {...props} />);

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
    expect(wrapper.find('input').props().className).to.contain('invalid-field');
  });

  it('should add an invalid-field class to the input when the user types and invalid expiry date', () => {
    const wrapper = mount(<CreditCardExpiryInput {...props} />);
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
    wrapper.find('input').simulate('change', { target: { value: 'abc' } });
    expect(wrapper.find('input').props().className).to.contain('invalid-field');
  });

  it('should display an error text when the user leaves the input empty', () => {
    const wrapper = mount(<CreditCardExpiryInput {...props} />);

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

  it('should display an error text when the user types and invalid expiry date', () => {
    const wrapper = mount(<CreditCardExpiryInput {...props} />);

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
    wrapper.find('input').simulate('blur', { target: { value: 'abc' } });
    expect(wrapper.find('span').props().children).to.be.equal('Expiration Date is on the past');
  });

  it('should change its value when we call to its onChange prop', () => {
    const wrapper = mount(<CreditCardExpiryInput {...props} />);
    const value = 'test';
    wrapper.setProps({
      onChange: (value) => {
        wrapper.setProps({ value });
      }
    });

    wrapper.find('input').simulate('change', { target: { value } });
    expect(wrapper.find('input').props().value).to.be.equal(value);
  });
});
