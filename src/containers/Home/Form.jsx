import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { showHello, showHelloAsync, showMoviesAsync } from './actions';
import logoImg from '../../assets/images/logo.jpg';
import config from '../../config';
import { selectInfo, selectHome } from './selectors';
import './styles.css'
class Form extends React.Component {


  render() {

    return (
       <div className="container">
              <form>
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
                         <div className="col-sm-12">
                           <div className="checkbox prominent">
                             <label>
                               <input type="checkbox"/> Annual Billing ($5.99 x 12 months)
                             </label>
                           </div>

                           <div className="checkbox">
                             <label>
                               <input type="checkbox"/> Monthly Billing (8.99 per month)
                             </label>
                           </div>

                         </div>
                       </div>

                   </div>
                   
                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-6">
                           <label for="exampleInputEmail1">First Name</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="First Name"/>
                         </div>
                         <div className="col-sm-6">
                           <label for="exampleInputEmail1">Last Name</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Last Name"/>
                         </div>
                       </div>
                       
                     </div>
                     
                     <div className="form-group">
                       <label for="exampleInputPassword1">Password</label>
                       <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                     </div>
                     
                     <div className="form-group">
                       <label for="exampleInputFile">Street</label>
                       <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Street"/>
                     </div>

                     <div className="form-group">
                       <label for="exampleInputFile">Street2(OPTIONAL)</label>
                       <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Street2"/>
                     </div>

                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-4">
                           <label for="exampleInputEmail1">City</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="City"/>
                         </div>
                         <div className="col-sm-4">
                           <label for="exampleInputEmail1">State</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="State"/>
                         </div>

                         <div className="col-sm-4">
                           <label for="exampleInputEmail1">ZIP</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Zip"/>
                         </div>
                       </div>
                     </div>
                     
                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-6">
                           <label for="exampleInputEmail1">Country</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Country"/>
                         </div>
                         <div className="col-sm-6">
                           <label for="exampleInputEmail1">Phone</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Phone"/>
                         </div>
                       </div>
                     </div>
                     
                     <div className="form-group">
                       <label for="exampleInputPassword1">CARD NUMBER</label>
                       <input type="text" className="form-control" id="exampleInputPassword1" placeholder="CARD NUMBER"/>
                     </div>

                     <div className="form-group">
                       <div className="row">
                         <div className="col-sm-4">
                           <label for="exampleInputEmail1">EXP MONTH</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="EXP MONTH"/>
                         </div>
                         <div className="col-sm-4">
                           <label for="exampleInputEmail1">EXP YEAR</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="EXP YEAR"/>
                         </div>

                         <div className="col-sm-4">
                           <label for="exampleInputEmail1">CITY CODE</label>
                           <input type="text" className="form-control" id="exampleInputEmail1" placeholder="CITY CODE"/>
                         </div>
                       </div>
                     </div>

                  
                 </div>
                 
                 <div className="col-sm-4 col-sm-offset-1">
                   
                   <div className="pay">Order Summary</div>
                   <div className="total">
                     <div className="subtotal">Subtotal <span className="pull-right digit">71.88</span></div>
                     <div className="saletax top-margin">Sales tax <span className="pull-right digit">71.88</span></div>
                     <div className="total_due top-margin">Total Due Today <span className="pull-right set-font"><sup>$</sup>71</span>
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

export default Form;




  