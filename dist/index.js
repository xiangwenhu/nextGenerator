"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestAnimationFrameGenerator = createRequestAnimationFrameGenerator;
exports.createTimeoutGenerator = createTimeoutGenerator;
exports.createNextGenerator = createNextGenerator;
var NextGenerator_1 = __importDefault(require("./NextGenerator"));
function createRequestAnimationFrameGenerator() {
    var generator = function (cb) {
        var ticket;
        function next() {
            ticket = window.requestAnimationFrame(cb);
        }
        return {
            next: next,
            cancel: function () {
                cancelAnimationFrame(ticket);
            }
        };
    };
    var factory = new NextGenerator_1.default(generator);
    return factory;
}
function createTimeoutGenerator(interval) {
    if (interval === void 0) { interval = 1000; }
    var generator = function (cb) {
        var ticket;
        function next() {
            ticket = setTimeout(cb, interval);
        }
        return {
            next: next,
            cancel: function () {
                clearTimeout(ticket);
            }
        };
    };
    var factory = new NextGenerator_1.default(generator);
    return factory;
}
function createNextGenerator() {
    var generator = function (cb) {
        var ticket;
        function next() {
            ticket = setTimeout(cb, 0);
        }
        return {
            next: next,
            cancel: function () {
                clearTimeout(ticket);
            }
        };
    };
    var factory = new NextGenerator_1.default(generator);
    return factory;
}
