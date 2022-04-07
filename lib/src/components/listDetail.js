var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
import React, { useEffect } from 'react';
import { List, Result } from 'antd-mobile';
import { searchTree } from '../utils/normalizeUtils';
import { ExclamationCircleOutline, RightOutline } from 'antd-mobile-icons';
var DetailList = function (props) {
    var cascadeData = props.cascadeData, itemClick = props.itemClick, sideChange = props.sideChange, rightListData = props.rightListData, showTypes = props.showTypes;
    var listItemStyle = {
        fontSize: '16px',
    };
    var listSpanStyle = {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8px',
        paddingBottom: '8px',
    };
    var renderItemEntry = function (item) {
        return (React.createElement(List.Item, { className: "item-entry", onClick: itemClick.bind(_this, item), key: item.key, style: listItemStyle }, item.unit ? (React.createElement("span", { style: listSpanStyle },
            React.createElement("span", { style: {
                    color: '#333',
                } },
                item.name,
                "/"),
            React.createElement("span", { style: {
                    color: '#666',
                } },
                item.unit,
                "/"),
            React.createElement("span", { style: {
                    color: '#999',
                } }, item.size))) : (React.createElement("span", { style: listSpanStyle },
            " ",
            item.name))));
    };
    var itemList = function (itemList) {
        return (React.createElement(List, null, itemList.map(function (item) {
            return renderItemEntry(item);
        })));
    };
    var _a = React.useState([]), childrenList = _a[0], setChildrenList = _a[1];
    var _b = React.useState([{ title: '全部', key: '0' }]), navList = _b[0], setNavList = _b[1];
    var setNav = function (key) {
        var index = navList.findIndex(function (item) { return item.key === key; });
        navList.splice(index + 1, navList.length - index - 1);
        if (navList.length === 0) {
            navList.push({ title: '全部', key: '0' });
            setNavList(navList);
        }
        else {
            setNavList(navList);
        }
        sideChange(key);
    };
    var setNavChildren = function (key) {
        var navNode = searchTree(cascadeData[0], 'key', key);
        if (navNode && navNode.children) {
            setChildrenList(navNode.children);
        }
    };
    var setTypeStyle = function () {
        return __assign({ color: '#333' }, listSpanStyle);
    };
    var renderTypeEntry = function (navItem) {
        return (React.createElement(List.Item, { className: "nav-entry", onClick: function () {
                console.log('nav', navItem);
                setNavChildren(navItem.key);
                sideChange(navItem.key);
                navList.push(navItem);
                setNavList(navList);
            }, style: listItemStyle },
            React.createElement("span", { style: setTypeStyle() }, "".concat(navItem.title, "(").concat(navItem['quantity'], ")"))));
    };
    var typeList = function (typeList) {
        return (React.createElement(List, null, typeList.map(function (navItem) {
            return renderTypeEntry(navItem);
        })));
    };
    useEffect(function () {
        console.log('CASCADE', cascadeData);
        if (cascadeData.length > 0 &&
            cascadeData[0]['children'] &&
            cascadeData[0]['children'].length > 0) {
            setChildrenList(cascadeData[0]['children']);
        }
    }, [cascadeData]);
    return (React.createElement("div", { className: "materialDetail", style: {
            width: '100vw',
            height: '100%',
            backgroundColor: '#F2F1F6',
        } },
        showTypes && (React.createElement("div", { className: "material-cascade-nav", style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFF',
                marginBottom: '12px',
            } }, navList.map(function (item, index) {
            return (React.createElement("div", { className: 'material-cascade-nav-item' +
                    (index === navList.length - 1
                        ? ' material-cascade-nav-item-last'
                        : ''), style: index === 0
                    ? {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        paddingLeft: '16px',
                        fontSize: '16px',
                    }
                    : {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        fontSize: '16px',
                    }, key: item.key, onClick: function () {
                    setNav(item.key);
                    setNavChildren(item.key);
                } },
                React.createElement("span", { style: index !== navList.length - 1
                        ? { color: '#0089FF' }
                        : { color: '#666' } }, "".concat(item.title),
                    index !== navList.length - 1 && (React.createElement(RightOutline, { color: "#666" })))));
        }))),
        childrenList.length > 0 && showTypes && (React.createElement("div", { className: "material-cascade-types", style: {
                marginBottom: '12px',
            } }, typeList(childrenList))),
        rightListData.length > 0 && itemList(rightListData),
        rightListData.length === 0 && (React.createElement(Result, { title: '暂无数据', img: React.createElement(ExclamationCircleOutline, { color: "var(--adm-color-light)", fontSize: 48 }), style: {
                color: '#999',
                backgroundColor: '#FFF',
            } }))));
};
export { DetailList };
