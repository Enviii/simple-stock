import React, { Component } from 'react'
import './App.css'
import StockList from './StockList.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', stock: [], time: new Date().toLocaleString() };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <StockList items={this.state.items} />
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-stock">
            What needs to be done?
          </label>
          <input
            id="new-stock"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>

        {/* <div>
          <b>The time is {this.state.time}.</b>
          <ul>
            {
              this.state.stock.map((obj, index) =>
                // Only do this if items have no stable IDs
                <li key={index}>
                  <span className="stock_name">{obj.quote.symbol}</span> - <span className="stock_latest_price">{obj.quote.latestPrice}</span>
                </li>
              )
            }
          </ul>
        </div> */}

      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));

    //this.iextrading(newItem.text);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  iextrading(new_stock) {
    this.tick();

    var symbol_str = "";
    var stock_list = [];
    stock_list.push(new_stock);
    if (this.state.items.length > 0) {
      for (let i = 0; i < this.state.items.length; i++) {
        stock_list.push(this.state.items[i].text);
      }
    }

    symbol_str = stock_list.join();
    
    fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols="+ symbol_str +"&types=quote")
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

}

export default App
