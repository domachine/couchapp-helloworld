import React, {Component} from 'react';

import {
  createDocument
} from '../../../actions';

export default class DocumentsIndex extends Component {
  constructor() {
    super();
    this.state = { currentTitle: '' };
  }

  handleChangeCurrentTitle(e) {
    this.setState({ currentTitle: e.target.value });
  }

  handleClickCreateDocument(e) {
    e.preventDefault();
    this.props.dispatch(createDocument(this.state.currentTitle));
  }

  render() {
    return (
      <div>
        <h1>Hello world it ...!</h1>
        <small>Ready to take over!</small>
        <ul>
          {this.props.documents.map(document =>
            <li key={document._id}>
              <a href={`#documents/${document._id}`}>
                {document.name}
              </a>
            </li>
           )}
        </ul>
        <input type="text" onChange={e => this.handleChangeCurrentTitle(e)} value={this.state.currentTitle}/>
        <button onClick={e => this.handleClickCreateDocument(e)}>Create document</button>
      </div>
    );
  }
}
