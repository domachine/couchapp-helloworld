import {EventEmitter} from 'events';
import {Observable} from 'rx';

import reduce from '../reducers';

let store = new EventEmitter();
let o = Observable
    .fromEvent(store, 'change')
    .flatMap(a => a)
    .scan(reduce, {});

store.dispatch = action => store.emit('change', action);
store.subscribe = o.subscribe.bind(o);
store.observable = o;

export default store;
