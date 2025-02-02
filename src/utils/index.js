"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeArray = exports.getEndpoint = exports.handleWsClose = exports.handleWsError = exports.handleWsOpen = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _ws = require("ws");

var _constants = require("../constants");

const heartbeat = state => {
  (0, _values.default)(state.subscriptions).forEach(ws => {
    if (ws.isAlive) {
      ws.isAlive = false;

      if (ws.readyState === _ws.OPEN) {
        ws.ping(() => {});
      }
    } else {
      if (ws.readyState === _ws.OPEN) {
        ws.terminate();
      }
    }
  });
};

const handleWsOpen = function handleWsOpen(host, state, subscriptionList, openCallback) {
  if (typeof openCallback === 'function') {
    openCallback(host);
  }

  this.isAlive = true;
  const entries = (0, _entries.default)(subscriptionList);
  const messageJson = entries.reduce((prev, [type, codes]) => [...prev, {
    type,
    codes
  }], [{
    ticket: _constants.UNIQUE_TICKET
  }]);
  const message = (0, _stringify.default)(messageJson);
  this.send(message);

  if ((0, _keys.default)(state.subscriptions).length === 0) {
    state.intervalId = setInterval(() => {
      heartbeat(state);
    }, 30000);
  }

  state.subscriptions[host] = this;
};

exports.handleWsOpen = handleWsOpen;

const handleWsError = err => {
  console.error(`WebSocket error : ${[err.code, err.message].filter(_ => _).join(',')}`);
};

exports.handleWsError = handleWsError;

const handleWsClose = function handleWsClose(state, reconnect) {
  delete state.subscriptions[this.endpoint];

  if (!(0, _keys.default)(state.subscriptions).length && state.intervalId) {
    clearInterval(state.intervalId);
  }

  if (typeof reconnect === 'function') {
    reconnect();
  }
};

exports.handleWsClose = handleWsClose;

const getEndpoint = (host, pathname, qs) => qs ? `${host}/${pathname}?${qs}` : `${host}/${pathname}`;

exports.getEndpoint = getEndpoint;

const serializeArray = (arr, callback) => arr.map(callback).join(',');

exports.serializeArray = serializeArray;
