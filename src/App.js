import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css'
import StockList from './StockList.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      symbols: [], 
      text: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let stock_list;
    if (this.state.symbols.length > 0) {
      stock_list = <StockList symbols={this.state.symbols} />
    } else { 
      stock_list = "";
    }

    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="new-stock"
            label="Stock Symbol"
            onChange={this.handleChange}
            value={this.state.text}
            margin="normal"
            placeholder="AAPL"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Stock{this.state.symbols.length + 1}
          </Button>
        </form>

        <h3>Stocks</h3>
        {stock_list}
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
      symbols: state.symbols.concat(newItem),
      text: ''
    }));
  }

}

export default App
