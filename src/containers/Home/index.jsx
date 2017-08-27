import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { showHello, showHelloAsync, showMoviesAsync } from './actions';
import logoImg from '../../assets/images/logo.jpg';
import config from '../../config';
import { selectInfo, selectHome } from './selectors';
import StripeForm from './StripeForm'
import './styles.css'
import Modal from 'react-modal';
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const customStyles = {
      content : {
        backgroundColor       : '#1C1D1F'
      }
    };
    return (
          <div>
            <button className="stripForm" onClick={this.openModal}>Pay through Stripe</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal} 
              contentLabel="Example Modal"
              style={customStyles}
            > 
              <button className="cross" onClick={this.closeModal} type="button" class="close"><span aria-hidden="true">×</span></button>

              <StripeForm/>
            </Modal>
          </div>
        );
  }
}

Home.fetchData = ({ store }) => {
  const fetch = Promise.all([
    store.dispatch(showHelloAsync('This is the content of')),
    store.dispatch(showMoviesAsync()),
    store.dispatch(showHello('Dispatch showHello action'))
  ]);
  return fetch;
};

const mapStateToProps = state => ({
  home: selectHome(state).toObject(),
  homeinfo: selectInfo(state),
});

export default connect(mapStateToProps)(Home);
