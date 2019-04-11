"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// var http=require('https');
// var cheerio = require('cheerio');
var baseScrapper =
/*#__PURE__*/
function () {
  function baseScrapper() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'baseScrapper';
    var baseUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://www.google.com/';

    _classCallCheck(this, baseScrapper);

    this.prefix = prefix;
    this.baseUri = baseUri;
    this.defHeader = {};
    console.log('Create baseScrapper');
  }

  _createClass(baseScrapper, [{
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(page, data) {
        var header,
            options,
            resp,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                header = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
                options = {
                  method: 'POST',
                  // host:'',
                  body: JSON.stringify(data),
                  headers: _objectSpread({}, this.defHeader, {
                    header: header
                  })
                };
                _context.next = 4;
                return http.request(this.baseUri + page, options);

              case 4:
                resp = _context.sent;
                console.log(resp.headers);
                return _context.abrupt("return", resp);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function post(_x, _x2) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(page) {
        var header,
            options,
            resp,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                header = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                options = {
                  host: '',
                  method: 'GET',
                  headers: _objectSpread({}, this.defHeader, {
                    header: header
                  })
                };
                _context2.next = 4;
                return http.request(this.baseUri + page, options);

              case 4:
                resp = _context2.sent;
                console.log(resp.headers);
                return _context2.abrupt("return", resp);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "head",
    value: function () {
      var _head = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(page) {
        var header,
            options,
            resp,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                header = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                options = {
                  host: '',
                  method: 'HEAD',
                  headers: _objectSpread({}, this.defHeader, {
                    header: header
                  })
                };
                _context3.next = 4;
                return http.request(this.baseUri + page, options);

              case 4:
                resp = _context3.sent;
                console.log(resp.headers);
                return _context3.abrupt("return", resp);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function head(_x4) {
        return _head.apply(this, arguments);
      }

      return head;
    }()
  }]);

  return baseScrapper;
}();

module.exports = baseScrapper;