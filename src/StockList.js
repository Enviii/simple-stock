import React from 'react';
import StockInfo from './StockInfo.js'

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>

        <StockInfo stocks={this.props.items} />
      </div>
    );
  }
}

export default StockList
