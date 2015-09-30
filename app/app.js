import React from 'react';

import store from './stores';
import App from './components/app.jsx';
import {loadDocuments} from './actions';

store.subscribe(state => {
  let props = {
    ... state,
    dispatch: store.dispatch
  };

  React.render(<App {... props}/>, document.body);
});

subscribeCouch(store);

function subscribeCouch(store) {
  poll();

  function poll(seq = null) {
    const urlPrefix = '/master/_changes?feed=longpoll&filter=_view&view=helloworld/documents-by-name';
    let xhr = new XMLHttpRequest();
    let url = seq ? `${urlPrefix}&since=${seq}` : urlPrefix;
    xhr.open('GET', url);
    xhr.onload = function() {
      let json = JSON.parse(this.responseText);
      let {results, last_seq} = json;
      if (results.length > 0) store.dispatch(loadDocuments());
      poll(last_seq);
    };
    xhr.send();
  }
}
