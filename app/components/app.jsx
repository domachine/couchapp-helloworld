import React, {Component} from 'react';

import {
  addDocument
} from '../actions';

export default class App extends Component {
  handleClickAdd() {
    this.props.dispatch(addDocument());
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <button onClick={e => this.handleClickAdd()}></button>
        <ul>
          {this.props.documents.map(document =>
            <li key={document._id}>{document.name}</li>
          )}
        </ul>
      </div>
    );
  }
}
