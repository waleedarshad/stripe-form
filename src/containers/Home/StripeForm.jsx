import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { showHello, showHelloAsync, showMoviesAsync } from './actions';
import logoImg from '../../assets/images/logo.jpg';
import config from '../../config';
import { selectInfo, selectHome } from './selectors';
import './styles.css'




import { isAlpha, isEmail } from 'validator';
import Payment from 'payment';

import { getStripeToken,CreateStripeCustomer } from './get-stripe-token';

class StripeForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      number: null,
      exp_month: null,
      exp_year: null,
      cvc: null,
      token: null,
      invalid_card: true,
      invalid_date: true,
      invalid_cvv: true,
      subscription: "annual"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPayment = this.setPayment.bind(this);

    

    this.checkCarditCard = this.checkCarditCard.bind(this)
    this.checkCarditCardDate = this.checkCarditCardDate.bind(this)
    this.checkCarditCardCVV = this.checkCarditCardCVV.bind(this)

  }

  resetCard() {
    this.setState({ number: null, exp_month: null, exp_year: null, cvc: null, token: null });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.resetCard();
    const { refs } = this;
    const number = refs.number.value;
    const expiration = refs.expiration.value.split('/');
    const exp_month = parseInt(expiration[0], 10);
    const exp_year = parseInt(expiration[1], 10);
    const cvc = refs.cvc.value;
    const card = { number, exp_month, exp_year, cvc };

        getStripeToken(card)
        .then((token) => {
          console.log("got token")
          card.token = token;
          
          console.log("we Got Token, Create Customer and subscribe to plan", token)
              
          }).catch((error) => {
            console.log("Got error",error)
          });


  }


  componentDidMount() {
      
    const { number, expiration, cvc } = this.refs;
    Payment.formatCardNumber(number);
    Payment.formatCardExpiry(expiration);
    Payment.formatCardCVC(cvc);
      
  }
  checkCarditCard(){
    const { number, expiration, cvc } = this.refs;
    this.setState({
      invalid_card : Payment.fns.validateCardNumber(number.value)});
  }
  
  checkCarditCardDate(){
    const { number, expiration, cvc } = this.refs;

    this.setState({
      invalid_date: Payment.fns.validateCardExpiry(expiration.value)});
  }
  
  checkCarditCardCVV(){
      const { number, expiration, cvc } = this.refs;

      this.setState({
        invalid_cvv: Payment.fns.validateCardCVC(cvc.value)
    });

  }
  
  setPayment(event) {
    debugger
    this.setState({subscription: event.target.value});
  }
  

  render() {

    return (
       <div className="container">
              <form onSubmit={ this.handleSubmit }>
               <div className="row">
                 <div className="col-centered">
                   <h1 >Enter Payment Details</h1>
                   <small className="billed"> You've chosen our Power plan change</small>
                 </div>

                 
               </div>
               <div className="row space">
                 <div className="col-sm-4 col-sm-offset-1">

                   <div className="pay">Pay with Credit Card</div>

                   <div className="billing">
                     <div className="form-group">
                         <div className="col-sm-12" onChange={this.setPayment.bind(this)}>
                           <div className="checkbox prominent">
                             <label>
                               <input type="radio" value="annual" name="subscription" ref="annual" checked={this.state.subscription ==="annual"}/> Annual Billing ($5.99 x 12 months)
                             </label>
                           </div>

                           <div className="checkbox">
                             <label>
                               <input type="radio" value="monthly" name="subscription" ref="monthly" checked={this.state.subscription ==="monthly"} /> Monthly Billing (8.99 per month)
                             </label>
                           </div>

                         </div>
                       </div>

                   </div>
                   
                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-6">
                           <label htmlFor="firstname">First Name</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="First Name"/>
                         </div>
                         <div className="col-sm-6">
                           <label htmlFor="lastname">Last Name</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Last Name"/>
                         </div>
                       </div>
                       
                     </div>
                     
                     <div className="form-group">
                       <label htmlFor="password">Password</label>
                       <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                     </div>
                     
                     <div className="form-group">
                       <label htmlFor="street">Street</label>
                       <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Street"/>
                     </div>

                     <div className="form-group">
                       <label htmlFor="stree2">Street2(OPTIONAL)</label>
                       <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Street2"/>
                     </div>

                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-4">
                           <label htmlFor="city">City</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="City"/>
                         </div>
                         <div className="col-sm-4">
                           <label htmlFor="state">State</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="State"/>
                         </div>

                         <div className="col-sm-4">
                           <label htmlFor="zip">ZIP</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Zip"/>
                         </div>
                       </div>
                     </div>
                     
                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-6">
                           <label htmlFor="country">Country</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Country"/>
                         </div>
                         <div className="col-sm-6">
                           <label htmlFor="phone">Phone</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Phone"/>
                         </div>
                       </div>
                     </div>
                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-12">
                           <label htmlFor="card_number">Card Number</label>
                           <input type="text" onBlur={(this.checkCarditCard)}className="form-control" id="exampleInputEmail1" placeholder="CARD NUMBER" ref="number"/>
                            {this.state.invalid_card ?  null : <div className="red"> Card Number is invalid</div> }
                         </div>
                         
                       </div>
                     </div>


                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-6">
                           <label htmlFor="expiry" >EXP DATE</label>
                           <input type="text" onBlur={(this.checkCarditCardDate)} className="form-control" id="exampleInputEmail1" placeholder="EXP DATE" ref="expiration" />
                           {this.state.invalid_date ? null :  <div className="red"> Date is invalid</div>  }

                         </div>
                         <div className="col-sm-4 hide">
                           <label htmlFor="exampleInputEmail1">EXP YEAR</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="EXP YEAR"  ref="expiry-year"/>
                         </div>

                         <div className="col-sm-6">
                           <label htmlFor="cvv">CITY CODE</label>
                           <input type="text" onBlur={(this.checkCarditCardCVV)} className="form-control" id="exampleInputEmail1" placeholder="CITY CODE" ref="cvc"/>
                          {this.state.invalid_cvv ? null :  <div className="red"> CVV is invalid</div>  }
                         </div>
                       </div>
                     </div>

                  
                 </div>
                 
                 <div className="col-sm-4 col-sm-offset-1">
                   
                   <div className="pay">Order Summary</div>
                   <div className="total">
                     <div className="subtotal">Subtotal <span className="pull-right digit">{this.state.subscription == "annual" ? (5.99 * 12) : (8.99 * 12)}</span></div>
                     <div className="saletax top-margin">Sales tax <span className="pull-right digit"></span></div>
                     <div className="total_due top-margin">Total Due Today <span className="pull-right set-font"><sup>$</sup>{this.state.subscription == "annual" ? (5.99 * 12) : (8.99 * 12)}</span>
                     </div>
                     <small className="billed">Billied Annually</small>
                 </div>
                 <button className="btn btn-default btn-color">SUBSCRIBE</button>
                 <div className="transaction"><i className="fa fa-lock" aria-hidden="true"></i> All transaction are secure and encrypted.<br/> We never store your credit card information </div>
                </div>
              </div>
              </form>
            </div>
    );
  }
}

export default StripeForm;




  