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
var EnumStatus;
(function (EnumStatus) {
    EnumStatus[EnumStatus["uninitialized"] = 0] = "uninitialized";
    EnumStatus[EnumStatus["initialized"] = 1] = "initialized";
    EnumStatus[EnumStatus["waiting"] = 2] = "waiting";
    EnumStatus[EnumStatus["working"] = 3] = "working";
    EnumStatus[EnumStatus["canceled"] = 4] = "canceled";
    EnumStatus[EnumStatus["unkown"] = 5] = "unkown";
})(EnumStatus || (EnumStatus = {}));
var NextGenerator = /** @class */ (function () {
    function NextGenerator(generator) {
        this.generator = generator;
        this.status = EnumStatus.uninitialized;
        // 下次回调函数的参数
        this.args = [];
        this.status = EnumStatus.initialized;
        this.next = this.next.bind(this);
    }
    NextGenerator.prototype.createCallback = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var info = _this.generator(_this.cb.bind(_this.args[0], resolve));
            info.execute(undefined);
        });
    };
    NextGenerator.prototype.cancel = function () {
        this.status = EnumStatus.canceled;
        if (this.nextInfo && typeof this.nextInfo.cancel === "function") {
            this.nextInfo.cancel();
        }
    };
    NextGenerator.prototype.next = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.status === EnumStatus.canceled) {
                            return [2 /*return*/, console.warn("current status is canceled, please call continue method to continue")];
                        }
                        if (this.status === EnumStatus.waiting) {
                            return [2 /*return*/, console.warn("current status is waiting, please don't multiple call next method")];
                        }
                        if (args.length > 0) {
                            this.args = args;
                        }
                        _a.label = 1;
                    case 1:
                        if (!(this.status !== EnumStatus.canceled)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createCallback()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NextGenerator.prototype.start = function (cb) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof cb === "function") {
            this.cb = cb;
        }
        if (typeof this.cb !== "function") {
            throw new SyntaxError("param cb must be a function");
        }
        if (args.length > 0) {
            this.args = args;
        }
        this.next();
    };
    NextGenerator.prototype["continue"] = function () {
        this.status = EnumStatus.initialized;
        this.next();
    };
    return NextGenerator;
}());
function createTimeoutGenerator(interval) {
    if (interval === void 0) { interval = 1000; }
    var timeoutGenerator = function (cb) {
        var ticket;
        function execute() {
            ticket = setTimeout(cb, interval);
        }
        return {
            execute: execute,
            cancel: function () {
                clearTimeout(ticket);
            }
        };
    };
    var factory = new NextGenerator(timeoutGenerator);
    return factory;
}
//# sourceMappingURL=index.js.map