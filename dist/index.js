"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextGenerator = void 0;
exports.createRequestAnimationFrameGenerator = createRequestAnimationFrameGenerator;
exports.createTimeoutGenerator = createTimeoutGenerator;
exports.createTimeout0Generator = createTimeout0Generator;
exports.createNextGenerator = createNextGenerator;
const NextGenerator_1 = __importDefault(require("./NextGenerator"));
var NextGenerator_2 = require("./NextGenerator");
Object.defineProperty(exports, "NextGenerator", { enumerable: true, get: function () { return __importDefault(NextGenerator_2).default; } });
function createRequestAnimationFrameGenerator() {
    const generator = function (cb) {
        let ticket;
        function next() {
            ticket = window.requestAnimationFrame(cb);
        }
        return {
            next,
            cancel: function () {
                cancelAnimationFrame(ticket);
            }
        };
    };
    const factory = new NextGenerator_1.default(generator);
    return factory;
}
function createTimeoutGenerator(interval = 1000) {
    const generator = function (cb) {
        let ticket;
        function next() {
            ticket = setTimeout(cb, interval);
        }
        return {
            next,
            cancel: function () {
                clearTimeout(ticket);
            }
        };
    };
    const factory = new NextGenerator_1.default(generator);
    return factory;
}
function createTimeout0Generator() {
    const generator = function (cb) {
        let ticket;
        function next() {
            ticket = setTimeout(cb, 0);
        }
        return {
            next,
            cancel: function () {
                clearTimeout(ticket);
            }
        };
    };
    const factory = new NextGenerator_1.default(generator);
    return factory;
}
function createNextGenerator() {
    const generator = function (cb) {
        function next() {
            cb();
        }
        return {
            next,
            cancel: function () { }
        };
    };
    const factory = new NextGenerator_1.default(generator);
    return factory;
}
