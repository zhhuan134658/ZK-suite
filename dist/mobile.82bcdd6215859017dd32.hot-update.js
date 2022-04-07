webpackHotUpdate_ali_suite_demo("mobile",{

/***/ "./.debug/src/components/listDetail.tsx":
/*!**********************************************!*\
  !*** ./.debug/src/components/listDetail.tsx ***!
  \**********************************************/
/*! exports provided: DetailList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailList", function() { return DetailList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd-mobile */ "antd-mobile");
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_mobile__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_normalizeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/normalizeUtils */ "./.debug/src/utils/normalizeUtils.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var _this = undefined;





var DetailList = function DetailList(props) {
  var cascadeData = props.cascadeData,
      itemClick = props.itemClick,
      sideChange = props.sideChange,
      rightListData = props.rightListData,
      showTypes = props.showTypes;
  var listItemStyle = {
    fontSize: '16px'
  };
  var listSpanStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px'
  };

  var renderItemEntry = function renderItemEntry(item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_mobile__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
      arrow: "empty",
      className: "item-entry",
      onClick: itemClick.bind(_this, item),
      key: item.key,
      style: listItemStyle
    }, item.unit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: listSpanStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        color: '#333'
      }
    }, item.name, "/"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        color: '#666'
      }
    }, item.unit, "/"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        color: '#999'
      }
    }, item.size)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: listSpanStyle
    }, " ", item.name));
  };

  var itemList = function itemList(_itemList) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_mobile__WEBPACK_IMPORTED_MODULE_1__["List"], null, _itemList.map(function (item) {
      return renderItemEntry(item);
    }));
  };

  var _a = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]),
      childrenList = _a[0],
      setChildrenList = _a[1];

  var _b = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([{
    title: '全部',
    key: '0'
  }]),
      navList = _b[0],
      setNavList = _b[1];

  var setNav = function setNav(key) {
    var index = navList.findIndex(function (item) {
      return item.key === key;
    });
    navList.splice(index + 1, navList.length - index - 1);

    if (navList.length === 0) {
      navList.push({
        title: '全部',
        key: '0'
      });
      setNavList(navList);
    } else {
      setNavList(navList);
    }

    sideChange(key);
  };

  var setNavChildren = function setNavChildren(key) {
    var navNode = Object(_utils_normalizeUtils__WEBPACK_IMPORTED_MODULE_2__["searchTree"])(cascadeData[0], 'key', key);

    if (navNode && navNode.children) {
      setChildrenList(navNode.children);
    }
  };

  var setTypeStyle = function setTypeStyle() {
    return __assign({
      color: '#333'
    }, listSpanStyle);
  };

  var renderTypeEntry = function renderTypeEntry(navItem) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_mobile__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
      className: "nav-entry",
      onClick: function onClick() {
        console.log('nav', navItem);
        setNavChildren(navItem.key);
        sideChange(navItem.key);
        navList.push(navItem);
        setNavList(navList);
      },
      style: listItemStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: setTypeStyle()
    }, "".concat(navItem.title, "(").concat(navItem['quantity'], ")")));
  };

  var typeList = function typeList(_typeList) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_mobile__WEBPACK_IMPORTED_MODULE_1__["List"], null, _typeList.map(function (navItem) {
      return renderTypeEntry(navItem);
    }));
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log('CASCADE', cascadeData);

    if (cascadeData.length > 0 && cascadeData[0]['children'] && cascadeData[0]['children'].length > 0) {
      setChildrenList(cascadeData[0]['children']);
    }
  }, [cascadeData]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "materialDetail",
    style: {
      width: '100vw',
      height: '100%',
      backgroundColor: '#F2F1F6'
    }
  }, showTypes && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "material-cascade-nav",
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      marginBottom: '12px'
    }
  }, navList.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: 'material-cascade-nav-item' + (index === navList.length - 1 ? ' material-cascade-nav-item-last' : ''),
      style: index === 0 ? {
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        fontSize: '16px'
      } : {
        paddingTop: '8px',
        paddingBottom: '8px',
        fontSize: '16px'
      },
      key: item.key,
      onClick: function onClick() {
        setNav(item.key);
        setNavChildren(item.key);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: index !== navList.length - 1 ? {
        color: '#0089FF'
      } : {
        color: '#666'
      }
    }, "".concat(item.title), index !== navList.length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_mobile__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "right",
      color: "#666"
    })));
  })), childrenList.length > 0 && showTypes && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "material-cascade-types",
    style: {
      marginBottom: '12px'
    }
  }, typeList(childrenList)), rightListData.length > 0 && itemList(rightListData), rightListData.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      color: '#999',
      backgroundColor: '#FFF'
    }
  }, "\u6682\u65E0\u6570\u636E\uFF01"));
};



/***/ })

})
//# sourceMappingURL=mobile.82bcdd6215859017dd32.hot-update.js.map