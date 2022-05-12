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
import { Table, Tooltip, Modal, Input, Button, Pagination } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { searchBarSubmit } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
var Search = Input.Search;
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var myColumns = [
    {
        title: '账户名称',
        dataIndex: 'accountname',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.accountname },
            React.createElement("span", null, record.accountname))); },
    },
    {
        title: '账号',
        dataIndex: 'accountnumber',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.accountnumber },
            React.createElement("span", null, record.accountnumber))); },
    },
    {
        title: '开户行',
        dataIndex: 'bankofdeposit',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.bankofdeposit },
            React.createElement("span", null, record.bankofdeposit))); },
    },
];
var FormField = {
    getInitialState: function () {
        var form = this.props.form;
        return {
            Inputvalue: '',
            current_page: '',
            total2: '',
            allData: { type: '0', number: '10', page: '1', name: '' },
            isModalVisible: false,
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
                searchBarSubmit(_this, value, '');
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
                var form = _this.props.form;
                _this.setState({
                    Inputvalue: '',
                });
                form.setFieldValue('Inputvalue1', '');
                form.setFieldExtendValue('Inputvalue1', '');
                form.setFieldValue('Inputvalue2', '');
                form.setFieldExtendValue('Inputvalue2', '');
                form.setFieldValue('SelectAcc', '');
                form.setFieldExtendValue('SelectAcc', '');
            },
            handleAdd: function () {
                var newData = _this.state.allData;
                _this.asyncSetFieldProps(newData);
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
                form.setFieldValue('Inputvalue', record.accountname);
                form.setFieldExtendValue('Inputvalue', record.accountname);
                form.setFieldValue('Inputvalue1', record.accountnumber);
                form.setFieldValue('Inputvalue2', record.bankofdeposit);
                form.setFieldExtendValue('Inputvalue1', record.accountnumber);
                form.setFieldExtendValue('Inputvalue2', record.bankofdeposit);
                _this.setState({
                    Inputvalue: record.accountname,
                    isModalVisible: false,
                }, function () {
                    form.setFieldValue('SelectAcc', record.accountname);
                    form.setFieldExtendValue('SelectAcc', record.accountname);
                });
            },
        };
    },
    handleOk: function () {
        var newData = __spreadArray([], this.state.dataSource, true);
        var selectData = __spreadArray([], this.state.currentSelectData, true);
        if (selectData.length > 0) {
            selectData.forEach(function (element) {
                newData.push(element);
            });
        }
        var uniqueData = __spreadArray([], uniqueArrayByKey(newData, ['id']), true);
        this.setState({
            dataSource: uniqueData,
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    handleCancel: function () {
        this.setState({ isModalVisible: false, selectedRowKeys: [] });
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var bizAlias = 'SelectAcc';
        var promise = asyncSetProps(_this, data, bizAlias);
        promise.then(function (res) {
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
                current_page: res.currentPage,
                total2: res.totalCount,
            });
        });
    },
    fieldRender: function () {
        var _this_1 = this;
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        var field = form.getFieldInstance('SelectAcc');
        var label = form.getFieldProp('SelectAcc', 'label');
        var required = form.getFieldProp('SelectAcc', 'required');
        // 详情页
        if (viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } },
                    " ",
                    value)));
        }
        return (React.createElement("div", { className: "SelectAccField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputvalue, onClick: this.methods().handleAdd, placeholder: "\u8BF7\u9009\u62E9\u8D26\u6237", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u9009\u62E9\u8D26\u6237", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().handleSearch }),
                    React.createElement(Table, { scroll: { y: '255px' }, onRow: function (record) {
                            return {
                                onClick: _this_1.methods().rowClick.bind(_this_1, record),
                            };
                        }, rowKey: function (record) { return record.id; }, columns: myColumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                    React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleChangePage })))));
    },
};
export default FormField;
