"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _jsonwebtoken = require("jsonwebtoken");

var _constants = require("../constants");

var _utils = require("../utils");

class Exchange {
  constructor(accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }
  /**
   * Get user's asset information
   * https://api.upbit.com/v1/accounts
   *
   * @async
   * @return {Promise<Object>}
   */


  getMyAssets() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const pathname = 'accounts';
      const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname);
      const payload = Exchange.getPayload(_this.accessKey);
      const token = (0, _jsonwebtoken.sign)(payload, _this.secretKey);
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const options = {
        method: _constants.GET,
        url: endpoint,
        headers
      };
      const result = yield (0, _nodeFetch.default)(endpoint, options);
      const data = yield result.json();
      return data;
    })();
  }
  /**
   * Get order chance
   * https://api.upbit.com/v1/accounts
   *
   * @async
   * @param {string} market - AAA-BBB
   * @return {Promise<Object>}
   */


  getOrderChance(market = _constants.DEFAULT_MARKET) {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const pathname = 'orders/chance';
      const qs = `market=${market.toUpperCase()}`;
      const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
      const payload = Exchange.getPayload(_this2.accessKey, qs);
      const token = (0, _jsonwebtoken.sign)(payload, _this2.secretKey);
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const options = {
        method: _constants.GET,
        url: endpoint,
        headers
      };
      const result = yield (0, _nodeFetch.default)(endpoint, options);
      const data = yield result.json();
      return data;
    })();
  }
  /**
   * Get user's order list
   * https://api.upbit.com/v1/orders
   *
   * @async
   * @param {string} [market] - AAA-BBB
   * @param {string} state - status of order. one of [wait, done, cancel]
   * @param {number|string} page - page number
   * @param {string} orderBy - sorting method. one of [asc, desc]
   * @return {Promise<Object>}
   */


  getOrderList(market, state = _constants.WAIT, page = 1, orderBy = _constants.ASC) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const pathname = 'orders';
      const qs = market ? `market=${market}&state=${state}&page=${page}&order_by=${orderBy}` : `state=${state}&page=${page}&${orderBy}`;
      const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
      const payload = Exchange.getPayload(_this3.accessKey, qs);
      const token = (0, _jsonwebtoken.sign)(payload, _this3.secretKey);
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const options = {
        method: _constants.GET,
        url: endpoint,
        headers
      };
      const result = yield (0, _nodeFetch.default)(endpoint, options);
      const data = yield result.json();
      return data;
    })();
  }
  /**
   * Get user's specific order
   * https://api.upbit.com/v1/order
   *
   * @async
   * @param {string} uuid - uuid for order
   * @return {Promise<Object>}
   */


  getOrder(uuid) {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const pathname = 'order';
      const qs = `uuid=${uuid}`;
      const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
      const payload = Exchange.getPayload(_this4.accessKey, qs);
      const token = (0, _jsonwebtoken.sign)(payload, _this4.secretKey);
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const options = {
        method: _constants.GET,
        url: endpoint,
        headers
      };
      const result = yield (0, _nodeFetch.default)(endpoint, options);
      const data = yield result.json();
      return data;
    })();
  }
  /**
   * Create order
   * https://api.upbit.com/v1/orders
   *
   * @async
   * @param {string} market - AAA-BBB
   * @param {string} side - one of [bid, ask] (bid: buy, ask: sell)
   * @param {string} volume - amount you want to trade
   * @param {string} price - price you want to trade
   * @param {string} orderType - one of [limit]
   * @return {Promise<Object>}
   */


  createOrder(market = _constants.DEFAULT_MARKET, side, volume, price, orderType) {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      // if (!side || !volume || !price) {
      //   throw new Error('Invalid data format for creating order. `side`, `volume` and `price` are required.');
      // }
      if (!side) {
        throw new Error('Invalid data format for creating order. `side`, `volume` and `price` are required.');
      }

      const pathname = 'orders';
      const qs = `market=${market}&side=${side}&volume=${volume}&price=${price}&ord_type=${orderType}`;
      const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname);
      const payload = Exchange.getPayload(_this5.accessKey, qs);
      const token = (0, _jsonwebtoken.sign)(payload, _this5.secretKey);
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      const options = {
        method: _constants.POST,
        url: endpoint,
        headers,
        body: (0, _stringify.default)({
          market,
          side,
          volume,
          price,
          ord_type: orderType
        })
      };
      const result = yield (0, _nodeFetch.default)(endpoint, options);
      const data = yield result.json();
      return data;
    })();
  }
  /**
   * Cancel order
   * https://api.upbit.com/v1/order
   *
   * @async
   * @param {string} uuid - uuid for order
   * @return {Promise<Object>}
   */


  cancelOrder(uuid) {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const pathname = 'order';
      const qs = `uuid=${uuid}`;
      const endpoint = (0, _utils.getEndpoint)(_constants.HOST, pathname, qs);
      const payload = Exchange.getPayload(_this6.accessKey, qs);
      const token = (0, _jsonwebtoken.sign)(payload, _this6.secretKey);
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const options = {
        method: _constants.DELETE,
        url: endpoint,
        headers
      };
      const result = yield (0, _nodeFetch.default)(endpoint, options);
      const data = yield result.json();
      return data;
    })();
  }

}

exports.default = Exchange;
(0, _defineProperty2.default)(Exchange, "getPayload", (accessKey, query) => {
  if (query) {
    return {
      access_key: accessKey,
      nonce: Date.now(),
      query
    };
  }

  return {
    access_key: accessKey,
    nonce: Date.now()
  };
});
