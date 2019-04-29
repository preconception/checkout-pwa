import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {      
      stripe: null,
      error: null
    };
    
    this.onPayButtonClick = this.onPayButtonClick.bind(this);
  }
  
  componentDidMount() {
     this.setState({
       // Replace with your own public test key
       stripe: window.Stripe('pk_test_Yveko5sGm189roOBqeSk6lgb')
     });
  }
  
  onPayButtonClick(e) {
    this.state.stripe.redirectToCheckout({
      items: [
        // Replace with the ID of your SKU
        {sku: 'sku_EVz6XZaDQ32xM1', quantity: 1}
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
          <h2>Click the button below to launch Stripe Checkout</h2>
        </div>        
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
