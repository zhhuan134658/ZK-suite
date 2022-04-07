import { List } from 'antd-mobile';
import React from 'react';
var FancyListEntry = function (props) {
    var entry = props.entry;
    var renderIcon = function (entry) {
        if (entry.itemIcon) {
            return (React.createElement("div", { className: "fancy-list-item-entry-icon-wrapper", style: { display: 'flex', alignItems: 'center' } },
                React.createElement("img", { style: { width: '100%', height: '100%' }, className: "fancy-list-item-entry-icon", src: entry.itemIcon, alt: entry.itemLabel })));
        }
        else {
            return null;
        }
    };
    return (React.createElement("div", { className: "fancy-list-item-entry ".concat(entry.title ? 'title-entry' : '', " ").concat(entry.selected ? 'selected-entry' : '') },
        renderIcon(entry),
        React.createElement("span", { className: "fancy-list-item-entry-label" }, entry.itemLabel),
        '：',
        React.createElement("span", { className: "fancy-list-item-entry-value" }, entry.itemValue)));
};
var FancyListStyle = "\n    .fancy-list-item {\n        padding: 6px 8px;\n        width: calc(100vw - 16px);\n        display: flex;\n        flex-direction: column;\n        margin-bottom: 8px;\n        border-bottom:8px solid rgb(239, 239, 239);\n        justify-content: space-between;\n        background-color: #fff;\n        \n    }\n    .fancy-list-item .fancy-list-item-entry { \n        display: flex;\n        align-items: center;\n        margin-bottom: 8px;\n        font-size: 14px;\n        color: #666;\n    }\n    .fancy-list-item .fancy-list-item-entry .fancy-list-item-entry-icon-wrapper { \n        width: 16px;\n        height: 16px;\n    }\n    .fancy-list-item .fancy-list-item-entry.title-entry {\n        font-size: 16px;\n        font-weight: bold;\n        color: #333;\n        line-height: 20px;\n    }\n    .fancy-list-item .fancy-list-item-entry.selected-entry.title-entry {\n        color: #000000\n    }\n    .fancy-list-item .fancy-list-item-entry.selected-entry {\n        color: #ABABAB;\n    }\n    .fancy-list-item .fancy-list-item-entry .fancy-list-item-entry-value { \n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: 75%;\n     }\n     .fancy-list-item .fancy-list-item-entry:last-child { \n         margin-bottom: 0;\n     }\n     .fancyl-list-empty {\n         max-width: 100vw;\n     }\n";
var FancyListItem = function (props) {
    var itemData = props.itemData, onClick = props.onClick;
    return (React.createElement("div", { className: "fancy-list-item", onClick: function () {
            onClick(itemData);
        } }, itemData.children.map(function (item) { return (React.createElement(FancyListEntry, { key: item.itemLabel, entry: item })); })));
};
var FancyList = function (props) {
    var data = props.data, itemClick = props.itemClick;
    return (React.createElement("div", { className: "fancy-list-background", style: { backgroundColor: '#efefef', minHeight: '100vh', width: '100vw' } }, data.length === 0 ? (React.createElement("div", { className: "fancy-list-empty", style: {
            maxWidth: '100vw',
            maxHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        } },
        React.createElement("img", { src: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8SyQKD2DCh1638868050008.png', style: {
                maxWidth: '75%',
                maxHeight: '75%',
            } }))) : (React.createElement(List, { style: {
            backgroundColor: '#efefef',
            padding: '6px 8px',
            maxWidth: '100vw',
        } },
        React.createElement("style", null, FancyListStyle),
        data.map(function (item) { return (React.createElement(FancyListItem, { key: item.id, itemData: item, onClick: function () {
                itemClick(item);
            } })); })))));
};
export { FancyListItem, FancyListEntry, FancyList };
