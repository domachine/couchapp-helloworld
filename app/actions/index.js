import {Observable} from 'rx';

export const ADD_DOCUMENT = 'ADD_DOCUMENT';
export const HYDRATE_DOCUMENTS = 'HYDRATE_DOCUMENTS';

export function addDocument() {
  return [
    {type: 'START_SAVING'},

    new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let doc = {type: 'test', name: 'Test it now!'};
      xhr.open('POST', '/master');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => resolve({type: ADD_DOCUMENT, document: doc});
      xhr.send(JSON.stringify(doc));
    }),

    {type: 'STOP_SAVING'}
  ];
}

export function loadDocuments() {
  return [
    {type: 'START_SAVING'},

    new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/master/_design/helloworld/_view/documents-by-name?include_docs=true');
      xhr.onload = () => {
        let json = JSON.parse(xhr.responseText);
        resolve({type: HYDRATE_DOCUMENTS, documents: json.rows.map(r => r.doc)});
      };
      xhr.send();
    }),

    {type: 'STOP_SAVING'}
  ];
}
