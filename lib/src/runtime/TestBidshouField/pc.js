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
import React from 'react';
import { Table, Tooltip, Modal, Input, Button, Pagination, notification, Layout, Tree, } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var Content = Layout.Content, Sider = Layout.Sider;
var Search = Input.Search;
var myColumns = [
    {
        title: '主题',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("span", null, record.name))); },
    },
    {
        title: '申请人',
        dataIndex: 'send_name',
    },
    {
        title: '收入金额',
        dataIndex: 'shou_money',
    },
];
var FormField = {
    getInitialState: function () {
        var form = this.props.form;
        return {
            msgdata: '',
            newOptine: [],
            Inputvalue: '',
            current_page: '',
            total2: '',
            allData: {
                type: '0',
                number: '10',
                page: '1',
                name: '',
            },
            isModalVisible: false,
            visibleModal: false,
            listData: [],
            treeData: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            loading: false,
            leaveLongVal: '',
            dataSource: [],
            count: 1,
            currentEditId: 0,
            currentSelectData: [],
            selectedRowKeys: [],
        };
    },
    methods: function () {
        var _this = this;
        return {
            handleSearch: function (value) {
                var newData = _this.state.allData;
                newData.name = value;
                newData.page = 1;
                newData.rk_id = [];
                _this.setState({ allData: newData });
                _this.asyncSetFieldProps(newData);
            },
            handleNewCancel: function () {
                _this.setState({
                    visibleModal: false,
                });
            },
            handleChangePage: function (page) {
                changePage(_this, page);
            },
            handleRowChange: function (row) {
                _this.setState({
                    currentEditId: row.key,
                });
            },
            handleRowDelete: function (row) {
                var dataSource = __spreadArray([], _this.state.dataSource, true);
                _this.setState({
                    dataSource: dataSource.filter(function (item) { return item.id !== row.id; }),
                });
            },
            iconClick: function () {
                _this.setState({ Inputvalue: '' });
            },
            handleAddNew: function () {
                _this.setState({
                    visibleModal: true,
                });
            },
            handleAdd: function () {
                var newpage = _this.state.allData;
                _this.asyncSetFieldProps(newpage);
                _this.setState({
                    isModalVisible: true,
                });
            },
            handleSave: function (row) {
                var newData = _this.state.dataSource;
                var index = newData.findIndex(function (item) { return item.id === row.id; });
                var item = newData[index];
                newData.splice(index, 1, __assign(__assign({}, item), row));
                if (row.num2) {
                    newData[index].num3 = row.num1 * row.num2;
                }
                _this.setState({ dataSource: newData });
            },
            rowClick: function (record) {
                var form = _this.props.form;
                _this.setState({ Inputvalue: record.name, isModalVisible: false }, function () {
                    form.setFieldValue('TestBidshou', record.name);
                    form.setFieldExtendValue('TestBidshou', record.name);
                });
            },
        };
    },
    handleOk: function () {
        var newData = __spreadArray([], this.state.dataSource, true);
        var cData = __spreadArray([], this.state.currentSelectData, true);
        var lData = [];
        if (cData.length > 0) {
            cData.forEach(function (element) {
                newData.push(element);
            });
        }
        lData = uniqueArrayByKey(newData, ['id']);
        console.log('pp+' + JSON.stringify(lData));
        this.setState({
            dataSource: lData,
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    handleCancel: function () {
        this.setState({ isModalVisible: false, selectedRowKeys: [] });
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var bizAlias = 'TestBidshou';
        var promise = asyncSetProps(_this, data, bizAlias, null, null, 'Autotoupro');
        promise.then(function (res) {
            var dataArray = res.dataArray;
            if (dataArray.length === 0) {
                _this.setState({ Inputvalue: '暂无合同' });
                _this.props.form.setFieldValue('TestBidshou', '暂无合同');
            }
            else {
                _this.setState({
                    listData: dataArray,
                    current_page: res.currentPage,
                    total2: res.totalCount,
                });
                _this.setState({
                    treeData: __spreadArray([], res.extendArray, true),
                });
                var dropdownArray = __spreadArray([], res.extendArray, true);
                dropdownArray.splice(0, 1);
                _this.setState({ newOptine: dropdownArray });
                if (_this.state.msgdata === '1') {
                    notification.open({
                        message: res.message,
                    });
                    _this.setState({ msgdata: '0' });
                }
            }
        });
    },
    fieldDidUpdate: function () {
        return null;
    },
    fieldRender: function () {
        var _this_1 = this;
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        var field = form.getFieldInstance('TestBidshou');
        var label = form.getFieldProp('TestBidshou', 'label');
        var required = form.getFieldProp('TestBidshou', 'required');
        var onSelect = function (keys, info) {
            console.log(info.node.key);
            var treedata = {
                name: '',
                number: '10',
                page: '1',
            };
            treedata = {
                name: '',
                number: '10',
                page: '1',
            };
            _this_1.setState({
                allData: treedata,
            });
            _this_1.asyncSetFieldProps(treedata);
        };
        var onExpand = function () {
            console.log('Trigger Expand');
        };
        form.onFieldExtendValueChange('TestBidshou', function (value) {
            _this_1.setState({
                Inputvalue: value,
            });
        });
        // 详情页
        if (viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } },
                    " ",
                    value)));
        }
        return (React.createElement("div", { className: "TestBidshouField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputvalue, onClick: this.methods().handleAdd, placeholder: "\u8BF7\u9009\u62E9", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u5173\u8054\u6295\u6807\u6536\u5165\u7533\u8BF7", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Layout, null,
                        React.createElement(Sider, { className: "newside_new" },
                            React.createElement(Tree, { blockNode: true, defaultExpandAll: true, onSelect: onSelect, onExpand: onExpand, treeData: this.state.treeData })),
                        React.createElement(Content, null,
                            React.createElement("div", { className: "header_tab_class" },
                                React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.onSearch })),
                            React.createElement(Table, { onRow: function (record) {
                                    return {
                                        onClick: _this_1.methods().rowClick.bind(_this_1, record),
                                    };
                                }, rowKey: function (record) { return record.id; }, columns: myColumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.onChangepage })))))));
    },
};
export default FormField;
