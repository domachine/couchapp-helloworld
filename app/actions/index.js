import {Observable} from 'rx';

export const INDEX_DOCUMENTS = 'INDEX_DOCUMENTS';
export const SHOW_DOCUMENT = 'SHOW_DOCUMENT';
export const HYDRATE_DOCUMENTS = 'HYDRATE_DOCUMENTS';

/** Action creators **/

let indexDocuments = simpleAction(INDEX_DOCUMENTS);

export {indexDocuments};

export function showDocument(id) {
  return load(
    get(id).then(json => ({type: SHOW_DOCUMENT, document: json}))
  );
}

export function createDocument(title) {
  return load(
    post({type: 'document', name: title})
      .then(json => ({type: '@@NOOP'}))
  );
}

export function loadDocuments() {
  return load(
    view('documents-by-name')
      .then(
        json => ({
          type: HYDRATE_DOCUMENTS,
          documents: json.rows.map(r => r.doc)
        })
      )
  );
}

function simpleAction(type, body = {}) {
  return () => Observable.return({... body, type: type})
}

function load(action) {
  return Observable.from([
    Observable.return({type: 'START_LOADING'}),
    Observable.fromPromise(action),
    Observable.return({type: 'STOP_LOADING'}),
  ]).concatMap(a => a)
}

/** Utility functions to abstract couchdb API **/

function get(id, options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/master/${id}`);
    xhr.onload = () => {
      let json = JSON.parse(xhr.responseText);
      resolve(json);
    };
    xhr.send();
  });
}

function post(document, options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/master');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      let json = JSON.parse(xhr.responseText);
      resolve(json);
    };
    xhr.send(JSON.stringify(document));
  });
}

function view(view, options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/master/_design/helloworld/_view/${view}?include_docs=true`);
    xhr.onload = () => {
      let json = JSON.parse(xhr.responseText);
      resolve(json);
    };
    xhr.send();
  });
}
