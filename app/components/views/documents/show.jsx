import React, {Component} from 'react';

export default class DocumentShow extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.currentDocument.name}</h3>
      </div>
    );
  }
}
