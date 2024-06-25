import { isTrue, deepClone, isObj } from '../tools';
export function createBus(globalBusName) {
    var Bus = {
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
            if (!isObj(state))
                return;
            Object.assign(this._store, state);
            this._listeners.forEach(function (l) { return l(deepClone(state)); });
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
        },
        watch: function (name, callback) {
            if (typeof name === 'string')
                (name = [name]);
            if (!Array.isArray(name))
                return;
            return this.subscribe(function (state) {
                if (name.some(function (n) { return state.hasOwnProperty(n); })) {
                    typeof callback === 'function' && callback(state);
                }
            });
        }
    };
    if (globalBusName) {
        window[globalBusName] = Bus;
    }
    return Bus;
}
export default createBus('_Bus');
//# sourceMappingURL=index.js.map