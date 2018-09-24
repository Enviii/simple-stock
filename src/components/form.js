import React from 'react';
import ReactDOM from 'react-dom';

class StockForm extends React.Component {
  render() {
    return (
      <Form>
        <legend>Title</legend>
      </Form>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById('example'));