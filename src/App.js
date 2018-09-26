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
      stock_input: false,
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      //interval
      () => {this.iextrading()},
      10 * 1000
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

  handleChangeValue = e => this.setState({stock_input: e.target.value});

  submitSomething() {
    console.log(this.state.stock_input);
    console.log("after");
    console.log(this.props.params.name);
  }

  // formCallback(stock_name) {
  //   this.setState({ stock: stock_name });
  //   console.log(this.state.stock);
  // }

  render() {
    const { error, isLoaded, stock } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <InputForm value={this.state.stock_input} onChangeValue={this.handleChangeValue} />
          <span>{this.state.stock_input}</span>
          <b>The time is {this.state.time}.</b>
          <ul>
            {
              stock.map((obj, index) =>
                // Only do this if items have no stable IDs
                <li key={index}>
                  <span className="stock_name">{obj.quote.symbol}</span> - <span className="stock_latest_price">{obj.quote.latestPrice}</span>
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
      stock_input: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange(event) {
    this.setState({stock_input: event.target.value});
  }

  handleSubmit(event) {
    console.log("submitting");
    event.preventDefault();
    this.setState({stock_input: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Stocks:
        </label>
        <input type="text" name="stock_name" value={this.props.stock_input} />
        {/* onChange={this.props.onChangeValue} */}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;