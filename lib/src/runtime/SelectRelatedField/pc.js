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
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var Search = Input.Search;
var FormField = {
    getInitialState: function () {
        var form = this.props.form;
        return {
            Inputvalue: '',
            myColumns: [],
            //   Inputvalue: '123',
            current_page: '',
            total2: '',
            allData: {
                type: '0',
                number: '10',
                page: '1',
                name: '',
                project_name: '',
            },
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
                var newData = _this.state.allData;
                newData.name = value;
                newData.type = 0;
                newData.page = 1;
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
                var form = _this.props.form;
                _this.setState({ Inputvalue: '' });
                form.setFieldValue('SelectRelated', '');
                form.setFieldExtendValue('SelectRelated', '');
                form.setFieldValue('Moneytest', '');
                form.setFieldExtendValue('Moneytest', '');
            },
            handleAddNew: function () {
                _this.setState({
                    visibleModal: true,
                });
            },
            handleAdd: function () {
                var form = _this.props.form;
                var typeName = form.getFieldValue('RadioField');
                var myColumns;
                switch (typeName) {
                    case '?????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_five',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_five },
                                    React.createElement("span", null, record.extend_five))); },
                            },
                            {
                                title: '????????????',
                                dataIndex: 't1',
                            },
                            {
                                title: '???????????????',
                                dataIndex: 'bond_money',
                            },
                        ];
                        break;
                    case '?????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_two',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_two },
                                    React.createElement("span", null, record.extend_two))); },
                            },
                            {
                                title: '????????????',
                                dataIndex: 'party_a',
                            },
                            {
                                title: '???????????????',
                                dataIndex: 'bond_money',
                            },
                        ];
                        break;
                    case '???????????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_five',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_five },
                                    React.createElement("span", null, record.extend_five))); },
                            },
                            {
                                title: '??????????????????',
                                dataIndex: 't1',
                            },
                            {
                                title: '????????????',
                                dataIndex: 'return_money',
                            },
                        ];
                        break;
                    case '???????????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_five',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_five },
                                    React.createElement("span", null, record.extend_five))); },
                            },
                            {
                                title: '????????????',
                                dataIndex: 't1',
                            },
                            {
                                title: '????????????',
                                dataIndex: 'return_money',
                            },
                        ];
                        break;
                    case '?????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_five',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_five },
                                    React.createElement("span", null, record.extend_five))); },
                            },
                            {
                                title: '???????????????',
                                dataIndex: 'bond_money',
                            },
                        ];
                        break;
                    case '?????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_two',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_two },
                                    React.createElement("span", null, record.extend_two))); },
                            },
                            {
                                title: '????????????',
                                dataIndex: 'party_a',
                            },
                            {
                                title: '????????????',
                                dataIndex: 'return_money',
                            },
                        ];
                        break;
                    case '???????????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_five',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_five },
                                    React.createElement("span", null, record.extend_five))); },
                            },
                            {
                                title: '??????????????????',
                                dataIndex: 'unit',
                            },
                            {
                                title: '???????????????',
                                dataIndex: 'bond_money',
                            },
                        ];
                        break;
                    case '???????????????????????????':
                        myColumns = [
                            {
                                title: '??????',
                                dataIndex: 'extend_five',
                                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.extend_five },
                                    React.createElement("span", null, record.extend_five))); },
                            },
                            {
                                title: '????????????',
                                dataIndex: 't1',
                            },
                            {
                                title: '???????????????',
                                dataIndex: 'bond_money',
                            },
                        ];
                        break;
                    default:
                        myColumns = [];
                        break;
                }
                var newData = _this.state.allData;
                newData.name = '';
                newData.type = 0;
                newData.page = 1;
                _this.setState({
                    myColumns: myColumns,
                    allData: newData,
                    isModalVisible: true,
                });
                _this.asyncSetFieldProps(newData);
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
                _this.setState({ Inputvalue: record.title });
                form.setFieldValue('SelectRelated', record.title);
                form.setFieldExtendValue('SelectRelated', record.title);
                form.setFieldValue('Moneytest', record.money);
                form.setFieldExtendValue('Moneytest', record.money);
                console.log('record', record);
                _this.setState({ isModalVisible: false });
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
        var form = _this.props.form;
        var bizAlias = 'SelectRelated';
        var projectName = form.getFieldValue('Selectbaopro');
        var bondType = form.getFieldValue('RadioField');
        var contractName = form.getFieldValue('SelectHe');
        data['project_name'] = projectName;
        data['bond_type'] = bondType;
        data['contract_name'] = contractName;
        var promise = asyncSetProps(_this, data, bizAlias, '', projectName);
        promise.then(function (res) {
            var dataArray = res.dataArray;
            if (dataArray.length === 0) {
                _this.setState({ Inputvalue: '????????????' });
                _this.props.form.setFieldValue('SelectRelated', '????????????');
                _this.props.form.setFieldExtendValue('SelectRelated', '????????????');
            }
            else {
                _this.setState({
                    listData: dataArray,
                    current_page: res.currentPage,
                    total2: res.totalCount,
                });
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
        var field = form.getFieldInstance('SelectRelated');
        var label = form.getFieldProp('SelectRelated', 'label');
        var required = form.getFieldProp('SelectRelated', 'required');
        // ?????????
        if (viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } },
                    " ",
                    value)));
        }
        return (React.createElement("div", { className: "SelectRelatedField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputvalue, onClick: this.methods().handleAdd, placeholder: "\u8BF7\u9009\u62E9", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u9009\u62E9\u5408\u540C", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().handleSearch }),
                    React.createElement(Table, { scroll: { y: '255px' }, onRow: function (record) {
                            return {
                                onClick: _this_1.methods().rowClick.bind(_this_1, record),
                            };
                        }, rowKey: function (record) { return record.id; }, columns: this.state.myColumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                    React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handlePageChange })))));
    },
};
export default FormField;
