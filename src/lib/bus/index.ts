import { isTrue, deepClone, isObj } from '../tools';

export default {
  _events: {},
  _store: {},
  _listeners: [],
  $on(name:string, fn:any) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(fn);
    return () =>
      (this._events[name] = this._events[name].filter((e:any) => e !== fn));
  },
  $emit(name:string, ...args:any) {
    if (this._events[name] && Array.isArray(this._events[name])) {
      this._events[name].forEach((fn:any) => {
        fn(...args);
      });
    }
  },
  clear(name:string) {
    if (name && this._events[name]) {
      delete this._events[name];
    } else {
      this._events = {};
    }
  },
  setState(state:any) {
    Object.assign(this._store, state);
    this._listeners.forEach((l:any) => l());
  },
  getState(key:any) {
    if (isTrue(key)) {
      const state = this._store[key];
      if (isObj(state)) return deepClone(state);
      return state;
    }
    return deepClone(this._store);
  },
  subscribe(listener:any) {
    this._listeners.push(listener);
    return () =>
      (this._listeners = this._listeners.filter((l:any) => l !== listener));
  }
};
