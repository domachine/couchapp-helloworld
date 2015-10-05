import React, {Component} from 'react';

import DocumentsIndex from './views/documents/index.jsx';
import DocumentShow from './views/documents/show.jsx';

var views = {
  'documents/index': DocumentsIndex,
  'documents/show': DocumentShow
};

export default class App extends Component {
  render() {
    console.log(this.props.view);
    let View = views[this.props.view];

    return (
      <div>
        <View {... this.props}/>
      </div>
    );
  }
}
