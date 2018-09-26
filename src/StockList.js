import React, { Component } from 'react'

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', stock: [], time: new Date().toLocaleString() };
  }

  getStocks() {
    //this.tick();
    console.log("getStocks");

    var symbol_str = "";
    var stock_list = [];
    if (this.props.items.length > 0) {
      for (let i = 0; i < this.props.items.length; i++) {
        stock_list.push(this.props.items[i].text);
      }
    }
    

    symbol_str = stock_list.join();
    
    fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols="+ symbol_str +"&types=quote")
    .then(res => res.json())
    .then(
      (result) => {
        var arr = [];

        Object.keys(result).forEach(function(key) {
          arr.push(result[key]);
        });

        this.setState({
          isLoaded: true,
          stock: arr
        });
      },

      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    if (this.props.items.length != 0) {
      this.getStocks(this.props.items);
    }

    return (
      <div>
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
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StockList
