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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Drawer, InputItem, List, SearchBar, Tabs } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange } from '../../utils/searchUtils';
var FormField = {
    getInitialState: function () {
        var form = this.props.form;
        return {
            initialPage: '0',
            detdate: 'a1',
            SearchBarvalue: '',
            showElem: 'none',
            inputvalue: '',
            allData: { type: '0', number: '99999', page: '1', name: '' },
            listData: [],
        };
    },
    handleOk: function () {
        throw new Error('Function not implemented.');
    },
    handleCancel: function () {
        this.setState({
            showElem: 'none',
        });
    },
    methods: function () {
        var _this = this;
        return {
            onOpenChange: function () {
                var newData = _this.state.allData;
                newData.name = '';
                newData.type = 0;
                newData.page = 1;
                newData.rk_id = [_this.state.detdate[0]];
                newData.project_name = '';
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    showElem: 'inherit',
                });
            },
            onExtraClick: function () {
                _this.setState({ inputvalue: '' });
            },
            handleClick: function (item) {
                var form = _this.props.form;
                var dtar = '';
                if (_this.state.detdate === 'a1') {
                    dtar = '材料合同-' + item.name;
                }
                else if (_this.state.detdate === 'b1') {
                    dtar = '劳务合同-' + item.name;
                }
                else if (_this.state.detdate === 'c1') {
                    dtar = '分包合同-' + item.name;
                }
                else if (_this.state.detdate === 'd1') {
                    dtar = '租赁合同-' + item.name;
                }
                _this.setState({ inputvalue: dtar, showElem: 'none' }, function () {
                    form.setFieldValue('SelecTicke', dtar);
                    form.setFieldExtendValue('SelecTicke', dtar);
                });
            },
            onSubmit: function (value) {
                var data = _this.state.allData;
                data.name = value;
                _this.asyncSetFieldProps(data);
            },
            onSearchBarChange: function (value) {
                searchBarChange(_this, value, '');
            },
        };
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'SelecTicke', 'ticket_register');
        promise.then(function (res) {
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
            });
        });
    },
    fieldDidUpdate: function () {
        return null;
    },
    fieldRender: function () {
        var _this_1 = this;
        // fix in codepen
        var form = this.props.form;
        var field = form.getFieldInstance('SelecTicke');
        var label = form.getFieldProp('SelecTicke', 'label');
        var required = form.getFieldProp('SelecTicke', 'required');
        var tabs = [
            { title: '材料合同', key: '0' },
            { title: '劳务合同', key: '1' },
            { title: '分包合同', key: '2' },
            { title: '租赁合同', key: '3' },
        ];
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165\u540D\u79F0", onSubmit: this.methods().onSubmit, onChange: this.methods().onSearchBarChange, onCancel: this.handleCancel, showCancelButton: true }),
            React.createElement(Tabs, { tabs: tabs, initialPage: '0', renderTabBar: function (props) { return React.createElement(Tabs.DefaultTabBar, __assign({}, props, { page: 3 })); }, onChange: function (tab, index) {
                    console.log('onChange', index, tab, '1111');
                    _this_1.setState({ detdate: 'a1' });
                    var newpage = {
                        detailPage: 1,
                        defaultActiveKey: 'a',
                        rk_id: ['a'],
                        number: '1000',
                        page: 1,
                        name: '',
                    };
                    if (index === 0) {
                        _this_1.setState({ detdate: 'a1' });
                        newpage.rk_id = ['a'];
                    }
                    else if (index === 1) {
                        _this_1.setState({ detdate: 'b1' });
                        newpage.rk_id = ['b'];
                    }
                    else if (index === 2) {
                        _this_1.setState({ detdate: 'c1' });
                        newpage.rk_id = ['c'];
                    }
                    else if (index === 3) {
                        _this_1.setState({ detdate: 'd1' });
                        newpage.rk_id = ['d'];
                    }
                    _this_1.setState({
                        allData: newpage,
                    });
                    _this_1.asyncSetFieldProps(newpage);
                } }),
            React.createElement(List, null, this.state.listData.map(function (item, index) {
                var text = item.xuan === 1 ? '#000000' : '#000000';
                var style = {
                    color: text,
                };
                return (React.createElement(List.Item, { onClick: _this_1.methods().handleClick.bind(_this_1, item), key: index, multipleLine: true },
                    React.createElement("span", { style: style },
                        " ",
                        item.name)));
            }))));
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, label),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        value))));
        }
        return (React.createElement("div", { className: "CorpHouse_class_m" },
            React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "m-group m-group-mobile" },
                    React.createElement("div", { className: "m-field-wrapper" },
                        React.createElement("div", { className: "m-field m-field-mobile m-mobile-input vertical" },
                            React.createElement("div", { className: "m-field-head", style: { marginLeft: '-7px' } },
                                React.createElement("label", { className: "m-field-label" },
                                    React.createElement("span", null,
                                        required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                                        label))),
                            React.createElement("div", { className: "m-field-box" },
                                React.createElement("div", { className: "m-field-content left" },
                                    React.createElement("div", { className: "input-wrapper" },
                                        React.createElement(InputItem, { editable: false, extra: "x", onExtraClick: this.methods().onExtraClick, className: "ant-input m-mobile-inner-input", type: "text", placeholder: "\u8BF7\u9009\u62E9", value: this.state.inputvalue, onClick: this.methods().onOpenChange })))))),
                    createPortal(React.createElement(Drawer, { className: "isvzhukuaiwarehousing", open: true, style: {
                            minHeight: document.documentElement.clientHeight,
                            display: this.state.showElem,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgb(255, 255, 255)',
                            position: 'fixed',
                            zIndex: 100,
                        }, enableDragHandle: true, contentStyle: {
                            color: '#A6A6A6',
                            textAlign: 'center',
                            paddingTop: 42,
                        }, sidebar: sidebar, onOpenChange: this.methods().onOpenChange }), document.getElementById('MF_APP'))))));
    },
    onExtraClick: function () {
        throw new Error('Function not implemented.');
    },
    onOpenChange: function () {
        throw new Error('Function not implemented.');
    },
    onCancel: function () {
        throw new Error('Function not implemented.');
    },
    onSearchBarChange: function (value) {
        throw new Error('Function not implemented.');
    },
    onSubmit: function (value) {
        throw new Error('Function not implemented.');
    },
    habdlClick: function (item) {
        throw new Error('Function not implemented.');
    },
};
export default FormField;
