import React from 'react';

class StockList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbols: [], 
      text: '', 
      stock: [], 
      time: new Date().toLocaleString() 
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      //interval
      () => {this.getStocks()},
      10 * 1000
    );

    this.getStocks();
    console.log("mounting StockList")
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  getStocks() {
    this.tick();

    var symbol_str = "";
    var stock_list = [];
    if (this.props.symbols.length > 0) {
      for (let i = 0; i < this.props.symbols.length; i++) {
        stock_list.push(this.props.symbols[i].text);
      }
    }

    this.setState({symbols: stock_list});
    symbol_str = stock_list.join();

    console.log(symbol_str, "symbol_str");

    if (symbol_str.length > 0) {
      fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols="+ symbol_str +"&types=quote")
      .then(res => res.json())
      .then(
        (result) => {
          var arr = [];

          console.log(result);

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
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.symbols.map(symbol => (
            <li key={symbol.id}>{symbol.text}</li>
          ))}
        </ul>

        <b>The time is {this.state.time}.</b>
        <ul>
          {
            this.state.stock.map((obj, index) =>
              // Only do this if symbols have no stable IDs
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

export default StockList
