import React from 'react';

class StockInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
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

    //run on load
    this.getStocks();
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
    if (this.props.stocks.length > 0) {
      for (let i = 0; i < this.props.stocks.length; i++) {
        stock_list.push(this.props.stocks[i].text);
      }
    }

    this.setState({items: stock_list});
    symbol_str = stock_list.join();

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
    //console.log(this.props, "props 2");
    //console.log(this.state, "state 2")

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
      </div>
    );
  }
}

export default StockInfo
