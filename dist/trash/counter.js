"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  // const obj = [{sess:'a',}];
  function counter() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _classCallCheck(this, counter);

    this.x = x;
    this.array = [];
  }

  _createClass(counter, [{
    key: "inc",
    value: function inc() {
      this.x++;
    }
  }, {
    key: "addObj",
    value: function addObj(obj) {
      this.array.push(obj);
    }
  }, {
    key: "getObj",
    value: function getObj() {
      if (this.array.length == 0) return false;
      return this.array.pop();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.x;
    }
  }, {
    key: "running",
    value: function () {
      var _running = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var delay,
            time,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                delay = _args.length > 0 && _args[0] !== undefined ? _args[0] : 5000;
                time = Date.now();
                setInterval(function () {
                  _this.inc();
                }, delay);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function running() {
        return _running.apply(this, arguments);
      }

      return running;
    }()
  }]);

  return counter;
}();