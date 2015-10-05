import React from 'react';
import {Observable} from 'rx';
import Backbone from 'backbone';

import store from './stores';
import App from './components/app.jsx';
import {
  indexDocuments,
  showDocument,

  loadDocuments
} from './actions';

/*
 * Application routes.
 */

var routes = {
  '': () => store.dispatch(indexDocuments()),
  'documents/:id': (id) => store.dispatch(showDocument(id))
};

/*
 * `render` renders the Application based on the given state.
 */

function render(state) {
  let props = {
    ... state,
    dispatch: store.dispatch
  };
  React.render(<App {... props}/>, document.body);
}

store.subscribe(render);

// Subscribe to couchdb changes.
var source = new EventSource('/master/_changes?feed=eventsource&filter=_view&view=helloworld/documents-by-name&since=now');
source.onerror = e => console.error(e);
source.addEventListener('message', e => {
  let {changes} = JSON.parse(e.data);
  if (changes.length > 0) store.dispatch(loadDocuments());
}, false);

// Initially hydrate the documents store.
store.dispatch(loadDocuments());

var router = new Backbone.Router({
  routes: routes
});
Backbone.history.start();
