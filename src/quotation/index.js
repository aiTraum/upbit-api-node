"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderbook = exports.getTick = exports.getCandles = exports.getMinCandles = exports.getTicker = exports.subscribe = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _ws = _interopRequireDefault(require("ws"));

var _constants = require("../constants");

var _utils = require("../utils");

var Queue = require('bull');

var awsConfig = require('../../../../src/common/aws_config');

/**
 * Get websocket instance to subscribe websocket protocol
 *
 * @param {Object} options
 * @param {Function} options.reconnect - Callback that is executed when try to reconnect to websocket
 * @param {Function} options.openCallback - Callback that is executed when websocket is opened
 * @param {Function} options.messageCallback - Callback that is executed when message is received
 * @return {Object} ws - instance of WebSocket
 */
const subscribe = options => {
  const ws = new _ws.default(_constants.WSS_HOST);
  const reconnect = options.reconnect,
        openCallback = options.openCallback,
        messageCallback = options.messageCallback,
        subscriptionList = options.subscriptionList;
  ws.reconnect = !!reconnect;
  ws.endpoint = _constants.WSS_HOST;
  ws.isAlive = false;
  ws.on('open', _utils.handleWsOpen.bind(ws, _constants.WSS_HOST, _constants.subscription, subscriptionList, openCallback));
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  ws.on('error', _utils.handleWsError);
  ws.on('close', _utils.handleWsClose.bind(ws, _constants.subscription, reconnect));
  ws.on('message', data => {
    if (typeof messageCallback === 'function') {
      try {
        messageCallback(JSON.parse(data));
      } catch (error) {
        console.error(`Parse error : ${error.message}`);
      }
    }
  });
  return ws;
};
/**
 * Get tickers of given markets
 * https://api.upbit.com/v1/ticker?markets=KRW-BTC
 *
 * @async
 * @param {Object[]} markets - Element should folow AAA-BBB
 * @return {Promise<Object>}
 */


exports.subscribe = subscribe;

const getTicker =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (markets = [_constants.DEFAULT_MARKET]) {
    const pathname = 'ticker';
    const qs = `markets=${(0, _utils.serializeArray)(markets, _ => _.toUpperCase())}`;
    const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
    const result = yield (0, _nodeFetch.default)(endpoint);
    const data = yield result.json();
    return data;
  });

  return function getTicker() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Get candles of given market (time unit: minutes)
 * https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=3
 *
 * @async
 * @param {String} market - AAA-BBB
 * @param {Number} minutes - Interval of candle. one of [1, 3, 5, 10, 30, 60]
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */


exports.getTicker = getTicker;

const getMinCandles =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (market = _constants.DEFAULT_MARKET, minutes = 5, count = 3) {
    if (count > 200) {
      throw new Error(`Invalid data for count. ${count} must under 200`);
    }

    const pathname = `candles/minutes/${minutes}`;
    const qs = `market=${market.toUpperCase()}&count=${count}`;
    const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
    const result = yield (0, _nodeFetch.default)(endpoint);
    const data = yield result.json();
    return data;
  });

  return function getMinCandles() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get candles of given market (time unit: day | week | month)
 * https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=3
 *
 * @async
 * @param {String} market - AAA-BBB
 * @param {String} timeUnit - Interval of candle. one of [days, weeks, months]
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */


exports.getMinCandles = getMinCandles;

const getCandles =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (market = _constants.DEFAULT_MARKET, timeUnit = 'days', count = 3) {
    if (count > 200) {
      throw new Error(`Invalid data for count. ${count} must under 200`);
    }

    const pathname = `candles/${timeUnit}`;
    const qs = `market=${market.toUpperCase()}&count=${count}`;
    const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
    const result = yield (0, _nodeFetch.default)(endpoint);
    const data = yield result.json();
    return data;
  });

  return function getCandles() {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Get Tick price of given market
 * https://api.upbit.com/v1/trades/ticks?market=KRW-BTC&count=3
 *
 * @async
 * @param {String} market - AAA-BBB
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */


exports.getCandles = getCandles;

const getTick =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* (market = _constants.DEFAULT_MARKET, count = 3) {
    const pathname = 'trades/ticks';
    const qs = `market=${market.toUpperCase()}&count=${count}`;
    const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
    const result = yield (0, _nodeFetch.default)(endpoint);
    const data = yield result.json();
    return data;
  });

  return function getTick() {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Get Orderbook of given market
 * https://api.upbit.com/v1/orderbook?markets=KRW-BTC
 *
 * @async
 * @param {Object[]} markets - Element should folow AAA-BBB
 * @param {Number} count - Numbers of candle count you want. 1 - 200
 * @return {Promise<Object>}
 */


exports.getTick = getTick;

const getOrderbook =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* (markets = [_constants.DEFAULT_MARKET]) {
    const pathname = 'orderbook';
    const qs = `markets=${(0, _utils.serializeArray)(markets, _ => _.toUpperCase())}`;
    const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
    const result = yield (0, _nodeFetch.default)(endpoint);
    const data = yield result.json();
    return data;
  });

  return function getOrderbook() {
    return _ref5.apply(this, arguments);
  };
}();

exports.getOrderbook = getOrderbook;
