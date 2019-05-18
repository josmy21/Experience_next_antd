webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var antd_dist_antd_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd/dist/antd.min.css */ "./node_modules/antd/dist/antd.min.css");
/* harmony import */ var antd_dist_antd_min_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_min_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var antd_lib_typography_Text__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! antd/lib/typography/Text */ "./node_modules/antd/lib/typography/Text.js");
/* harmony import */ var antd_lib_typography_Text__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(antd_lib_typography_Text__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./constants */ "./pages/constants.js");
/* harmony import */ var _editableCell__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./editableCell */ "./pages/editableCell.js");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./style */ "./pages/style.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! uuid/v1 */ "./node_modules/uuid/v1.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(uuid_v1__WEBPACK_IMPORTED_MODULE_17__);










var _jsxFileName = "/Users/ebin/Downloads/Experience_Next_Antd/pages/index.js";

/**
 *  Author  : Josmy Jose(josmyjose21@gmail.com)
 *  Date    : 18-05-2019
 **/








/**Creating App Component for rendering the complete layout including table */

var App =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(App, _React$Component);

  function App(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, App);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(App).call(this, props));
    /**  Intializing the State variables  */

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "handleAdd", function () {
      var _this$state = _this.state,
          count = _this$state.count,
          dataSource = _this$state.dataSource;
      var newData = {
        key: uuid_v1__WEBPACK_IMPORTED_MODULE_17___default()(),
        name: "",
        email: ""
      };

      _this.setState({
        dataSource: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(dataSource), [newData]),
        count: count + 1,
        editingKey: count,
        disableButton: true
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "handleDelete", function (key) {
      var dataSource = Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.state.dataSource);

      var count = _this.state.count;

      _this.setState({
        count: count - 1,
        dataSource: dataSource.filter(function (item) {
          return item.key !== key;
        }),
        disableButton: false
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "handleEdit", function (key) {
      _this.setState({
        editingKey: key
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "isEditing", function (record) {
      var editingKey = _this.state.editingKey;
      return record.key === editingKey;
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this), "cancel", function () {
      var _this$state2 = _this.state,
          dataSource = _this$state2.dataSource,
          count = _this$state2.count;
      dataSource.map(function (item) {
        if (item.name === "" || item.email === "") {
          _this.setState({
            count: count - 1,
            dataSource: dataSource.filter(function (item) {
              return item.key !== count - 1;
            }),
            disableButton: false
          });
        }
      });

      _this.setState({
        editingKey: ""
      });
    });

    _this.state = {
      count: 2,
      editingKey: "",
      disableButton: false,
      dataSource: [{
        key: "0",
        name: "Josmy",
        email: "josmyjose21@gmail.com"
      }, {
        key: "1",
        name: "Jose",
        email: "JoseGeorge@gmail.com"
      }]
    };
    /**Setting  the Columns for the table with properties title,dataIndex,key,editable and
     * render function for rendering components inside columns*/

    _this.columns = [{
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true
    }, {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true
    }, {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      render: function render(text, record) {
        var editable = _this.isEditing(record);

        var _this$state3 = _this.state,
            dataSource = _this$state3.dataSource,
            editingKey = _this$state3.editingKey;
        return editable ? react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](_constants__WEBPACK_IMPORTED_MODULE_14__["default"].Consumer, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 63
          },
          __self: this
        }, function (form) {
          return react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("a", {
            href: "javascript:;",
            onClick: function onClick() {
              return _this.save(form, record.key);
            },
            style: _style__WEBPACK_IMPORTED_MODULE_16__["default"].save,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 65
            },
            __self: this
          }, "Save");
        }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("a", {
          href: "javascript:;",
          onClick: function onClick() {
            return _this.cancel(record.key);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 75
          },
          __self: this
        }, "Cancel")) : react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("a", {
          href: "javascript:;",
          onClick: function onClick() {
            return _this.handleEdit(record.key);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Icon"], {
          type: "edit",
          style: _style__WEBPACK_IMPORTED_MODULE_16__["default"].icon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          },
          __self: this
        }));
      }
    }, {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render: function render(text, record) {
        return _this.state.dataSource.length >= 1 ? react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("a", {
          href: "javascript:;",
          onClick: function onClick() {
            _this.handleDelete(record.key);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 93
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Icon"], {
          type: "delete",
          style: _style__WEBPACK_IMPORTED_MODULE_16__["default"].icon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          },
          __self: this
        })) : null;
      }
    }];
    return _this;
  }
  /**Seting State to local Storage on ComponentDidUpdate  */


  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(App, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      localStorage.setItem('states', _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(this.state));
    }
    /**Getting the state from local Storage on ComponentDidMount */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {} // const data = localStorage.getItem('states')
    // if(data) {
    //   console.log(data);
    //   this.setState(prevState => {
    //     return JSON.parse(data)
    //   })
    // }

    /**Funtion
     * name     :handleAdd
     * arguments:none
     * purpose  :updating the data source and incrementing count.
     * return   :none
     */

  }, {
    key: "save",

    /**Funtion
     * name     :save
     * arguments:form,key
     * purpose  :Splice the old item,Update it with new item entered
     * return   :return false in case of any validation err
     */
    value: function save(form, key) {
      var _this2 = this;

      form.validateFields(function (error, row) {
        if (error) {
          return;
        }

        var newData = Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_this2.state.dataSource);

        var index = newData.findIndex(function (item) {
          return key === item.key;
        });

        if (index > -1) {
          var item = newData[index];
          newData.splice(index, 1, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item, row));

          _this2.setState({
            dataSource: newData,
            editingKey: "",
            disableButton: false
          });
        } else {
          newData.push(row);

          _this2.setState({
            dataSource: newData,
            editingKey: "",
            disableButton: false
          });
        }
      });
    }
    /**Funtion
     * name     :cancel
     * arguments:none
     * purpose  :Setting editingKey empty if user cancelled row editing
     * return   :return false in case of any validation err
     */

  }, {
    key: "render",

    /**Rendering the Ui components */
    value: function render() {
      var _this3 = this;

      var _this$state4 = this.state,
          dataSource = _this$state4.dataSource,
          count = _this$state4.count,
          disableButton = _this$state4.disableButton;
      var components = {
        body: {
          cell: _editableCell__WEBPACK_IMPORTED_MODULE_15__["default"]
        }
      };
      var columns = this.columns.map(function (col) {
        if (!col.editable) {
          return col;
        }

        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, col, {
          onCell: function onCell(record) {
            return {
              record: record,
              inputType: col.dataIndex === "name" ? "text" : "email",
              dataIndex: col.dataIndex,
              title: col.title,
              editing: _this3.isEditing(record)
            };
          }
        });
      });
      return react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("div", {
        style: _style__WEBPACK_IMPORTED_MODULE_16__["default"].container,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("style", {
        dangerouslySetInnerHTML: {
          __html: antd_dist_antd_min_css__WEBPACK_IMPORTED_MODULE_11___default.a
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 264
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        type: "flex",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 265
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 266
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd_lib_typography_Text__WEBPACK_IMPORTED_MODULE_13___default.a, {
        style: {
          fontWeight: "bold"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 267
        },
        __self: this
      }, dataSource.length, " Users")), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 269
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 270
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        offset: 21,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 272
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: this.handleAdd,
        type: "primary",
        style: !disableButton ? _style__WEBPACK_IMPORTED_MODULE_16__["default"].button_add : null,
        disabled: disableButton,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 273
        },
        __self: this
      }, "Add User"))), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 283
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](_constants__WEBPACK_IMPORTED_MODULE_14__["default"].Provider, {
        value: this.props.form,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 284
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Table"], {
        dataSource: dataSource,
        columns: columns,
        components: components,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 285
        },
        __self: this
      }))));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

var EditableFormTable = antd__WEBPACK_IMPORTED_MODULE_12__["Form"].create()(App);
/* harmony default export */ __webpack_exports__["default"] = (EditableFormTable);

/***/ })

})
//# sourceMappingURL=index.js.6e93e62594e5a06d58d6.hot-update.js.map