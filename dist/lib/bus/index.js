import { isTrue, deepClone, isObj } from '../tools';
export default {
    _events: {},
    _store: {},
    _listeners: [],
    $on: function (name, fn) {
        var _this = this;
        if (!this._events[name]) {
            this._events[name] = [];
        }
        this._events[name].push(fn);
        return function () {
            return (_this._events[name] = _this._events[name].filter(function (e) { return e !== fn; }));
        };
    },
    $emit: function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._events[name] && Array.isArray(this._events[name])) {
            this._events[name].forEach(function (fn) {
                fn.apply(void 0, args);
            });
        }
    },
    clear: function (name) {
        if (name && this._events[name]) {
            delete this._events[name];
        }
        else {
            this._events = {};
        }
    },
    setState: function (state) {
        Object.assign(this._store, state);
        this._listeners.forEach(function (l) { return l(); });
    },
    getState: function (key) {
        if (isTrue(key)) {
            var state = this._store[key];
            if (isObj(state))
                return deepClone(state);
            return state;
        }
        return deepClone(this._store);
    },
    subscribe: function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () {
            return (_this._listeners = _this._listeners.filter(function (l) { return l !== listener; }));
        };
    }
};
//# sourceMappingURL=index.js.map