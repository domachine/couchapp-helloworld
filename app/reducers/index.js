import {
  INDEX_DOCUMENTS,
  SHOW_DOCUMENT,

  HYDRATE_DOCUMENTS
} from '../actions';

export default function(state, action) {
  return {
    view: view(state.view, action),
    currentDocument: currentDocument(state.currentDocument, action),
    documents: documents(state.documents, action),
    timestamp: timestamp(state.timestamp, action)
  };
}

function view(state = 'documents/index', action) {
  switch (action.type) {
  case INDEX_DOCUMENTS:
    return 'documents/index'
  case SHOW_DOCUMENT:
    return 'documents/show';
  default:
    return state;
  }
}

function currentDocument(state = {}, action) {
  switch (action.type) {
  case SHOW_DOCUMENT:
    return action.document;
  default:
    return state;
  }
}

function timestamp(state, action) {
  return action.type === '@@UPDATE' ? action.timestamp : state;
}

function documents(state = [], action) {
  switch (action.type) {
  case HYDRATE_DOCUMENTS:
    return action.documents;
  default:
    return state;
  }
}
