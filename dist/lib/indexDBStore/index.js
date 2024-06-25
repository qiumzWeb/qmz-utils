var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DBStorage = /** @class */ (function () {
    function DBStorage(name) {
        this.db = '';
        this.dbName = name;
        this._events_ = {};
        this.setTimers = {};
        this.setPromises = {};
    }
    // 打开db
    DBStorage.prototype.open = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var openDB = window.indexedDB.open(name);
                openDB.onerror = function () {
                    resolve(false);
                };
                openDB.onupgradeneeded = function (event) {
                    var db = event.target.result;
                    var dbStorate = db.createObjectStore(name, { keyPath: 'id' });
                    dbStorate.createIndex('value', 'value', { unique: true });
                };
                openDB.onsuccess = function (event) {
                    var db = event.target.result;
                    _this.db = db;
                    _this.dbName = name;
                    resolve(_this);
                };
            }
            catch (e) {
                reject(e);
            }
        });
    };
    // 创建事务
    DBStorage.prototype.createTransaction = function (type) {
        if (type === void 0) { type = 'readwrite'; }
        return this.db.transaction([this.dbName], type)
            .objectStore(this.dbName);
    };
    // 读取数据
    DBStorage.prototype.get = function (name) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var request, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.open(this.dbName)];
                    case 1:
                        _a.sent();
                        request = this.createTransaction('readonly').get(name);
                        request.onerror = function (error) {
                            console.log(error.target.error.message);
                            resolve(false);
                        };
                        request.onsuccess = function (e) {
                            resolve(e.target.result && e.target.result.value || null);
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        resolve(null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // 存储数据
    DBStorage.prototype.set = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.remove(name)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.add(name, value)];
                    case 2:
                        _a.sent();
                        this.$emit(name, value);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 新增数据
    DBStorage.prototype.add = function (name, value) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var request, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.open(this.dbName)];
                    case 1:
                        _a.sent();
                        request = this.createTransaction().add({
                            id: name,
                            value: value
                        });
                        request.onsuccess = function () {
                            resolve(_this);
                        };
                        request.onerror = function () {
                            resolve(false);
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        resolve(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // 删除数据
    DBStorage.prototype.remove = function (name) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var request, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.open(this.dbName)];
                    case 1:
                        _a.sent();
                        request = this.createTransaction().delete(name);
                        request.onsuccess = function () {
                            resolve(true);
                        };
                        request.onerror = function () {
                            resolve(false);
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        resolve(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // 清空
    DBStorage.prototype.clear = function (noClearArr) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var keys, clearKeys, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAllKeys()];
                    case 1:
                        keys = _a.sent();
                        clearKeys = keys;
                        if (Array.isArray(noClearArr)) {
                            clearKeys = keys.filter(function (e) { return !noClearArr.includes(e); });
                        }
                        clearKeys.forEach(function (k) {
                            _this.remove(k);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        resolve(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // 获取所有keys
    DBStorage.prototype.getAllKeys = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var request_1, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.open(this.dbName)];
                    case 1:
                        _a.sent();
                        request_1 = this.createTransaction().getAllKeys();
                        request_1.onsuccess = function () {
                            resolve(request_1.result || []);
                        };
                        request_1.onerror = function (error) {
                            console.log(error.target.error.message);
                            resolve([]);
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        resolve([]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // 监听数据变动
    DBStorage.prototype.watch = function (name, fn) {
        var _this = this;
        if (name && typeof fn === 'function') {
            if (!this._events_[name]) {
                this._events_[name] = [];
            }
            this._events_[name].push(fn);
        }
        return function () {
            (_this._events_[name] = _this._events_[name].filter(function (e) { return e !== fn; }));
        };
    };
    DBStorage.prototype.$emit = function (name, value) {
        if (this._events_[name] && Array.isArray(this._events_[name])) {
            this._events_[name].forEach(function (fn) {
                fn(value);
            });
        }
    };
    return DBStorage;
}());
export default function CreateDBStore(name) {
    return new DBStorage(name);
}
//# sourceMappingURL=index.js.map