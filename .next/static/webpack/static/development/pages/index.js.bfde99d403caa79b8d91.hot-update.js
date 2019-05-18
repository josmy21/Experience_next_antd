webpackHotUpdate("static/development/pages/index.js",{

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
        key: count,
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
            lineNumber: 61
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](_constants__WEBPACK_IMPORTED_MODULE_14__["default"].Consumer, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
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
              lineNumber: 64
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
            lineNumber: 74
          },
          __self: this
        }, "Cancel")) : react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("a", {
          href: "javascript:;",
          onClick: function onClick() {
            return _this.handleEdit(record.key);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Icon"], {
          type: "edit",
          style: _style__WEBPACK_IMPORTED_MODULE_16__["default"].icon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
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
            lineNumber: 92
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Icon"], {
          type: "delete",
          style: _style__WEBPACK_IMPORTED_MODULE_16__["default"].icon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 98
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
          lineNumber: 262
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"]("style", {
        dangerouslySetInnerHTML: {
          __html: antd_dist_antd_min_css__WEBPACK_IMPORTED_MODULE_11___default.a
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        type: "flex",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 264
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 265
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd_lib_typography_Text__WEBPACK_IMPORTED_MODULE_13___default.a, {
        style: {
          fontWeight: "bold"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 266
        },
        __self: this
      }, dataSource.length, " Users")), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 268
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 269
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        offset: 21,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 271
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: this.handleAdd,
        type: "primary",
        style: !disableButton ? _style__WEBPACK_IMPORTED_MODULE_16__["default"].button_add : null,
        disabled: disableButton,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 272
        },
        __self: this
      }, "Add User"))), react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 282
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](_constants__WEBPACK_IMPORTED_MODULE_14__["default"].Provider, {
        value: this.props.form,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 283
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10__["createElement"](antd__WEBPACK_IMPORTED_MODULE_12__["Table"], {
        dataSource: dataSource,
        columns: columns,
        components: components,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 284
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
//# sourceMappingURL=index.js.bfde99d403caa79b8d91.hot-update.js.map