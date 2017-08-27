import React from 'react';
import { shallow, mount } from 'enzyme';
import FullNameInput from './index.jsx';
import { isAlpha } from 'validator';

const validate = (value, extra = {}) => {
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
};

const props = {
  type: 'text',
  placeHolder: 'Enter your name here...',
  label: 'Full Name *',
  name: 'name',
  className: 'name',
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


describe('FullNameInput component', () => {
  it('properly renders the input', () => {
    const wrapper = shallow(<FullNameInput {...props} />);
    expect(wrapper.find('input')).to.have.length(1);
  });


  it('should add an invalid-field class to the input when the user leaves the input empty', () => {
    const wrapper = mount(<FullNameInput {...props} />);

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

  it('should add an invalid-field class to the input when the user types something that is not alpha', () => {
    const wrapper = mount(<FullNameInput {...props} />);
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
    wrapper.find('input').simulate('change', { target: { value: '235235' } });
    expect(wrapper.find('input').props().className).to.contain('invalid-field');
  });

  it('should display an error text when the user leaves the input empty', () => {
    const wrapper = mount(<FullNameInput {...props} />);

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

  it('should display an error text when the user types something that is not alpha', () => {
    const wrapper = mount(<FullNameInput {...props} />);

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
    wrapper.find('input').simulate('change', { target: { value: '235235' } });
    expect(wrapper.find('span').props().children).to.be.equal('You must enter only characters');
  });

  it('should change its value when we call to its onChange prop', () => {
    const wrapper = mount(<FullNameInput {...props} />);
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
