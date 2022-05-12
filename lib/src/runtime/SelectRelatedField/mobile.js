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
import { FancyList } from '../../components/fancyLists';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
import { searchBarChange } from '../../utils/searchUtils';
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
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    showElem: 'inherit',
                });
            },
            onExtraClick: function () {
                var form = _this.props.form;
                _this.setState({ inputvalue: '' });
                form.setFieldValue('SelectRelated', '');
                form.setFieldExtendValue('SelectRelated', '');
                form.setFieldValue('Moneytest', '');
                form.setFieldExtendValue('Moneytest', '');
            },
            handleClick: function (record) {
                var form = _this.props.form;
                _this.setState({ inputvalue: record.title });
                form.setFieldValue('SelectRelated', record.title);
                form.setFieldExtendValue('SelectRelated', record.title);
                form.setFieldValue('Moneytest', record.money);
                form.setFieldExtendValue('Moneytest', record.money);
                console.log('record', record);
                _this.setState({ showElem: 'none' });
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
        var form = _this.props.form;
        data['bond_type'] = form.getFieldValue('RadioField');
        data['contract_name'] = form.getFieldValue('SelectHe');
        var projectName = form.getFieldValue('SelectDeposit');
        var promise = asyncSetProps(_this, data, 'SelectRelated', '', projectName);
        promise.then(function (res) {
            var listData = __spreadArray([], res.dataArray, true);
            _this.setState({
                listData: __spreadArray([], listData, true),
            });
        });
    },
    fieldDidUpdate: function () {
        return null;
    },
    fieldRender: function () {
        // fix in codepen
        var form = this.props.form;
        var field = form.getFieldInstance('SelectRelated');
        var label = form.getFieldProp('SelectRelated', 'label');
        var required = form.getFieldProp('SelectRelated', 'required');
        var setUpParser = function () {
            var type = form.getFieldValue('RadioField');
            var parser = [];
            switch (type) {
                case '投标保证金支出':
                    parser = [
                        {
                            key: 'extend_five',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 't1',
                            label: '收取单位',
                            index: 2,
                        },
                        {
                            key: 'bond_money',
                            label: '保证金金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '履约保证金支出':
                    parser = [
                        {
                            key: 'extend_two',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 'party_a',
                            label: '甲方单位',
                            index: 2,
                        },
                        {
                            key: 'bond_money',
                            label: '保证金金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '劳务分包保证金退回':
                    parser = [
                        {
                            key: 'extend_five',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 't1',
                            label: '劳务分包单位',
                            index: 2,
                        },
                        {
                            key: 'return_money',
                            label: '退回金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '专业分包保证金退回':
                    parser = [
                        {
                            key: 'extend_five',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 't1',
                            label: '分包单位',
                            index: 2,
                        },
                        {
                            key: 'return_money',
                            label: '退回金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '投标保证金退回':
                    parser = [
                        {
                            key: 'extend_five',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 'bond_money',
                            label: '保证金金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '履约保证金退回':
                    parser = [
                        {
                            key: 'extend_two',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 'party_a',
                            label: '甲方单位',
                            index: 2,
                        },
                        {
                            key: 'return_money',
                            label: '退回金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '劳务分包保证金收入':
                    parser = [
                        {
                            key: 'extend_five',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 'unit',
                            label: '劳务分包单位',
                            index: 2,
                        },
                        {
                            key: 'bond_money',
                            label: '保证金金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                case '专业分包保证金收入':
                    parser = [
                        {
                            key: 'extend_five',
                            label: '主题',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 't1',
                            label: '分包单位',
                            index: 2,
                        },
                        {
                            key: 'bond_money',
                            label: '保证金金额',
                            index: 3,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
                default:
                    parser = [
                        {
                            key: 'name',
                            label: '申请名称',
                            index: 1,
                            title: true,
                        },
                        {
                            key: 'bond_money',
                            label: '申请金额',
                            index: 2,
                            icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
                        },
                    ];
                    break;
            }
            return parser;
        };
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.methods().onSubmit, onChange: this.methods().onSearchBarChange, onCancel: this.handleCancel, showCancelButton: true }),
            React.createElement(FancyList, { data: parseListData(this.state.listData, setUpParser()), itemClick: this.methods().handleClick })));
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
