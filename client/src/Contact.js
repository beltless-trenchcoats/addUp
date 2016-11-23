import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import Header from './Header';
import './App.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <Header>
        <div className="contactUsSection">
          <div className='contact'>
            <p>Email: support@AddUp.com</p>
            <p>Phone: 510-555-5555</p>
            <p>Address: 944 Market St. San Francisco, CA 94102</p>
          </div>
        </div>
      </Header>
    )
  }
}

export default Contact;
