import {
  ADD_DOCUMENT,
  HYDRATE_DOCUMENTS
} from '../actions';

export default function(state, action) {
  return {
    documents: documents(state.documents, action)
  };
}

function documents(state = [], action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return [... state, action.document];
    case HYDRATE_DOCUMENTS:
      return action.documents;
    default:
      return state;
  }
}
