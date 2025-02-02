"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscription = exports.UNIQUE_TICKET = exports.LIMIT = exports.DESC = exports.ASC = exports.CANCEL = exports.DONE = exports.WAIT = exports.BID = exports.ASK = exports.MONTHS = exports.WEEKS = exports.DAYS = exports.FALL = exports.RISE = exports.EVEN = exports.DEFAULT_MARKET = exports.DELETE = exports.POST = exports.GET = exports.WSS_HOST = exports.HOST = void 0;
// URL
const HOST = 'https://api.upbit.com/v1';
exports.HOST = HOST;
const WSS_HOST = 'wss://api.upbit.com/websocket/v1';
exports.WSS_HOST = WSS_HOST;
const GET = 'GET';
exports.GET = GET;
const POST = 'POST';
exports.POST = POST;
const DELETE = 'DELETE';
exports.DELETE = DELETE;
const DEFAULT_MARKET = 'KRW-BTC'; // ENUM for Price change

exports.DEFAULT_MARKET = DEFAULT_MARKET;
const EVEN = 'EVEN';
exports.EVEN = EVEN;
const RISE = 'RISE';
exports.RISE = RISE;
const FALL = 'FALL'; // ENUM for time units

exports.FALL = FALL;
const DAYS = 'days';
exports.DAYS = DAYS;
const WEEKS = 'weeks';
exports.WEEKS = WEEKS;
const MONTHS = 'months'; // ENUM for trade type

exports.MONTHS = MONTHS;
const ASK = 'ASK'; // ask

exports.ASK = ASK;
const BID = 'BID'; // buy
// ENUM for order status

exports.BID = BID;
const WAIT = 'wait';
exports.WAIT = WAIT;
const DONE = 'done';
exports.DONE = DONE;
const CANCEL = 'cancel'; // ENUM for order by

exports.CANCEL = CANCEL;
const ASC = 'asc';
exports.ASC = ASC;
const DESC = 'desc'; // ENUM for order type

exports.DESC = DESC;
const LIMIT = 'limit'; // ENUM for web socket message

exports.LIMIT = LIMIT;
const UNIQUE_TICKET = 'UNIQUE_TICKET';
exports.UNIQUE_TICKET = UNIQUE_TICKET;
const subscription = {
  intervalId: null,
  subscriptions: {}
};
exports.subscription = subscription;
