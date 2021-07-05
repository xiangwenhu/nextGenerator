;
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
    }
    NextGenerator.prototype.next = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.status === EnumStatus.canceled) {
            return console.warn("current status is canceled, please call continute method to continue");
        }
        if (this.status === EnumStatus.waiting) {
            return console.warn("current status is waiting, please don't multiple call next method");
        }
        if (args.length > 0) {
            this.args = args;
        }
        // this.args[0] context
        var boundFn = (_a = this.execute).bind.apply(_a, [this, this.cb].concat(this.args));
        this.nextInfo = this.generator(boundFn);
        this.status = EnumStatus.waiting;
        this.nextInfo.execute(undefined);
    };
    NextGenerator.prototype.execute = function (cb, context) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.status = EnumStatus.working;
        cb.apply(context, [this.next.bind(this), context].concat(args));
    };
    NextGenerator.prototype.cancel = function () {
        this.status = EnumStatus.canceled;
        if (this.nextInfo && typeof this.nextInfo.cancel === "function") {
            this.nextInfo.cancel();
        }
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
        this.status = EnumStatus.canceled;
        this.next();
    };
    return NextGenerator;
}());

function createRequestAnimationFrameGenerator() {
    var requestAnimationFrameGenerator = function (cb) {
        var ticket;
        function execute() {
            ticket = window.requestAnimationFrame(cb);
        }
        return {
            execute: execute,
            cancel: function () {
                cancelAnimationFrame(ticket);
            }
        };
    };
    var factory = new NextGenerator(requestAnimationFrameGenerator);
    return factory;
}
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
function createStepUpGenerator(interval) {
    if (interval === void 0) { interval = 1000; }
    var stepUpGenerator = function (cb) {
        var ticket;
        function execute() {
            interval = interval * 2;
            ticket = setTimeout(cb, interval);
        }
        return {
            execute: execute,
            cancel: function () {
                clearTimeout(ticket);
            }
        };
    };
    var factory = new NextGenerator(stepUpGenerator);
    return factory;
}
