import React from 'react';
import { shallow, mount } from 'enzyme';
import CreditCardCVCInput from './index.jsx';
import Payment from 'payment';

const validate = (value, extra = {}) => {
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
};

const props = {
  type: 'text',
  placeHolder: 'CVC',
  label: 'Security Code *',
  name: 'cvc',
  className: 'cvc',
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


describe('CreditCardCVCInput component', () => {
  it('properly renders the input', () => {
    const wrapper = shallow(<CreditCardCVCInput {...props} />);
    expect(wrapper.find('input')).to.have.length(1);
  });


  it('should add an invalid-field class to the input when the user leaves the input empty', () => {
    const wrapper = mount(<CreditCardCVCInput {...props} />);

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

  it('should add an invalid-field class to the input when the user types and invalid CVC', () => {
    const wrapper = mount(<CreditCardCVCInput {...props} />);
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
    wrapper.find('input').simulate('change', { target: { value: 'abcde' } });
    expect(wrapper.find('input').props().className).to.contain('invalid-field');
  });

  it('should display an error text when the user leaves the input empty', () => {
    const wrapper = mount(<CreditCardCVCInput {...props} />);

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

  it('should display an error text when the user types and invalid CVC', () => {
    const wrapper = mount(<CreditCardCVCInput {...props} />);

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
    wrapper.find('input').simulate('change', { target: { value: 'abcde' } });
    expect(wrapper.find('span').props().children).to.be.equal('Security Code must be 3 digts');
  });

  it('should change its value when we call to its onChange prop', () => {
    const wrapper = mount(<CreditCardCVCInput {...props} />);
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
