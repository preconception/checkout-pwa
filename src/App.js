import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      stripe: window.Stripe('pk_test_Yveko5sGm189roOBqeSk6lgb'), 
      error: null
    };
  }
  
  onPayButtonClick(e) {
    this.state.stripe.redirectToCheckout({
      items: [
        // Replace with the ID of your SKU
        {sku: 'sku_123', quantity: 1}
      ],
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/canceled',
    }).then(function (result) {
      // Display result.error.message to your customer
      this.setState({
        error: result.error.message
      });
    });
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <button className="pay-button" onClick={this.onPayButtonClick}>Pay</button>
        </div>
        {this.state.error ? (
          <div className="error">
            {this.state.error}
          </div>  
        ) : null}        
      </div>
    );
  }
}

export default App;
