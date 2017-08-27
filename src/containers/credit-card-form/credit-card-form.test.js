import React from 'react';
import { mount } from 'enzyme';
import CreditCardForm from './index.jsx';
import Form from 'react-awesome-form-validator';
import {
  CreditCardNumberInput,
  CreditCardExpiryInput,
  CreditCardCVCInput,
  FullNameInput
} from './inputs';

const props = {
  publishableKey: 'xxxx',
  onSubmit: () => {},
  formError: '',
  showLoading: false,
  isScriptLoaded: true,
  isScriptLoadSucceed: true,
  submitButtonText: 'Set Appointment'
};

const wrapper = mount(<CreditCardForm {...props} />);
const TesteableForm = wrapper.find(Form).first();

describe('CreditCardForm component', () => {
  it('renders the credit card form', () => {
    expect(TesteableForm).to.have.length(1);
  });
  it('should have a form with a onSubmit prop', () => {
    expect(TesteableForm.props().onSubmit).to.have.length(1);
  });
  it('should have a SubmitButton', () => {
    expect(TesteableForm.find(Form.SubmitButton)).to.have.length(1);
  });
  it('should have a SubmitButton disabled by default', () => {
    expect(TesteableForm.find(Form.SubmitButton).find('button').props().disabled).to.equal(true);
  });
  it('should have an CreditCardNumberInput visible', () => {
    expect(TesteableForm.find(CreditCardNumberInput)).to.have.length(1);
  });
  it('should have an CreditCardExpiryInput visible', () => {
    expect(TesteableForm.find(CreditCardExpiryInput)).to.have.length(1);
  });
  it('should have an CreditCardCVCInput visible', () => {
    expect(TesteableForm.find(CreditCardCVCInput)).to.have.length(1);
  });
  it('should have an FullNameInput visible', () => {
    expect(TesteableForm.find(FullNameInput)).to.have.length(1);
  });
  it.skip('SubmitButton should be enable once all the inputs are valid', () => {
    const creditCardNumberInput = TesteableForm.find(CreditCardNumberInput).find('input');
    const creditCardExpiryInput = TesteableForm.find(CreditCardExpiryInput).find('input');
    const creditCardCVCInput = TesteableForm.find(CreditCardCVCInput).find('input');
    const creditCardHolderNameInput = TesteableForm.find(FullNameInput).find('input');
    creditCardNumberInput.simulate('keyUp', { target: { value: '4242 4242 4242 4242' } });
    creditCardExpiryInput.simulate('change', { target: { value: '12 / 22' } });
    creditCardCVCInput.simulate('change', { target: { value: '123' } });
    creditCardHolderNameInput.simulate('change', { target: { value: 'AnalyticsFire' } });
    console.log(
      'creditCardNumberInput: ' + creditCardNumberInput.props().className + '\n',
      'creditCardExpiryInput: ' + creditCardExpiryInput.props().className + '\n',
      'creditCardCVCInput: ' + creditCardCVCInput.props().className + '\n',
      'creditCardHolderNameInput: ' + creditCardHolderNameInput.props().className
    );
    expect(TesteableForm.find(Form.SubmitButton).find('button').props().disabled).to.equal(false);
  });
});
