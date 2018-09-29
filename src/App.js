import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
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
        
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="new-stock"
            label="Stock Symbol"
            onChange={this.handleChange}
            value={this.state.text}
            margin="normal"
            placeholder="AAPL"
          />
          {/* <Input
            id="new-stock"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="AAPL"
          /> */}
          <Button type="submit" variant="contained" color="primary">
            Add #{this.state.items.length + 1}
          </Button>
        </form>

        <h3>Stocks</h3>
        <StockList items={this.state.items} />

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
  }

}

export default App
