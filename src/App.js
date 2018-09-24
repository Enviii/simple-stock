import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stock: [],
      time: new Date().toLocaleString(),
      stock: false,
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      //interval
      () => {this.iextrading()},
      60 * 1000
    );

    //run on load
    this.iextrading();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  iextrading() {
    this.tick();

    fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols=goog,tsla&types=quote")
    .then(res => res.json())
    .then(
      (result) => {
        var arr = [];
        console.log("running api??");
        Object.keys(result).forEach(function(key) {
          arr.push(result[key]);
        });
        this.setState({
          isLoaded: true,
          stock: arr
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  formCallback(stock_name) {
    this.setState({ stock: stock_name });
    console.log(this.state.stock);
  }

  render() {
    const { error, isLoaded, stock } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <InputForm callbackFromParent={this.formCallback} />
          <b>The time is {this.state.time}.</b>
          <ul>
            {
              stock.map((obj, index) =>
                // Only do this if items have no stable IDs
                <li key={index}>
                  {obj.quote.symbol} - {obj.quote.latestPrice}
                </li>
              )
            }
          </ul>
        </div>
      );
    }
  }

}

class InputForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stock: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange(event) {
    this.setState({stock: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  parentCallback() {
    this.props.callbackFromParent(this.state.stock);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Stocks:
        </label>
        <input type="text" value={this.state.stock} onChange={this.handleChange}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
// testing

export default App;