var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Drawer, InputItem, SearchBar } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { StorageMobileDialog } from '../../components/addDetail';
import { FancyList } from '../../components/fancyLists';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
var FormField = {
    getInitialState: function () {
        return {
            SearchBarvalue: '',
            showElem: 'none',
            inputvalue: '',
            allData: { type: '0', number: '99999', page: '1', name: '' },
            listData: [],
        };
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'CorpHouse');
        promise.then(function (res) {
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
            });
        });
    },
    methods: function () {
        var _this = this;
        return {
            onOpenChange: function () {
                var newData = _this.state.allData;
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    showElem: 'inherit',
                });
            },
            handleClick: function (item) {
                var form = _this.props.form;
                _this.setState({
                    inputvalue: item.name,
                    showElem: 'none',
                }, function () {
                    form.setFieldValue('CorpHouse', item.name);
                    form.setFieldExtendValue('CorpHouse', item.name);
                });
            },
            onSubmit: function (value) {
                searchBarSubmit(_this, value, '');
            },
            onSearchBarChange: function (value) {
                searchBarChange(_this, value, '');
            },
        };
    },
    handleOk: function () {
        this.setState({
            showElem: 'none',
        });
    },
    handleCancel: function () {
        this.setState({
            showElem: 'none',
        });
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('CorpHouse');
        var label = form.getFieldProp('CorpHouse', 'label');
        var required = form.getFieldProp('CorpHouse', 'required');
        var onFinish = function (values) {
            _this_1.setState({
                msgdata: '1',
            });
            console.log('Success:', values);
            //   const [form] = Form.useForm();
            var newdate = _this_1.state.allData;
            newdate['cang_add'] = values;
            _this_1.asyncSetFieldProps(newdate);
            newdate['cang_add'] = '';
        };
        var onFinishFailed = function (errorInfo) {
            console.log('Failed:', errorInfo);
        };
        var parser = [
            {
                key: 'name',
                label: '仓库名称',
                index: 1,
                title: true,
            },
            {
                key: 'number',
                label: '编号',
                index: 2,
            },
            {
                key: 'address',
                label: '地址',
                index: 3,
            },
            {
                key: 'remarks',
                label: '备注',
                index: 4,
            },
        ];
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.methods().onSubmit, onChange: this.methods().onSearchBarChange, onCancel: this.handleCancel, showCancelButton: true }),
            React.createElement(StorageMobileDialog, { onFinish: onFinish, onFinishFailed: onFinishFailed }),
            React.createElement(FancyList, { data: parseListData(this.state.listData, parser), itemClick: this.methods().handleClick })));
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
                                        React.createElement(InputItem, { editable: false, className: "ant-input m-mobile-inner-input", type: "text", placeholder: "\u8BF7\u9009\u62E9", value: this.state.inputvalue, onClick: this.methods().onOpenChange })))))),
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
