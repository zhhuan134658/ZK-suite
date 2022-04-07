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
import { Button, Modal, Tooltip, Input, Pagination, Table } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { asyncSetProps } from '../../utils/asyncSetProps';
var Search = Input.Search;
import { StorageDesktopDialog } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var mycolumns = [
    {
        title: '仓库名称',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("span", null, record.name))); },
    },
    {
        title: '编号',
        dataIndex: 'number',
    },
    {
        title: '地址',
        dataIndex: 'address',
    },
    {
        title: '备注',
        dataIndex: 'remarks',
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
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'CorpHouse');
        promise.then(function (res) {
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
                current_page: res.currentPage,
                total2: res.totalCount,
            });
        });
    },
    methods: function () {
        var _this = this;
        return {
            onSearch: function (value) {
                var newData = _this.state.allData;
                newData.name = value;
                newData.type = 0;
                newData.page = 1;
                _this.setState({
                    allData: newData,
                });
                _this.asyncSetFieldProps(newData);
            },
            onChangePage: function (page) {
                var newPage = _this.state.allData;
                newPage.page = page;
                _this.setState({
                    allData: newPage,
                });
                _this.asyncSetFieldProps(newPage);
            },
            handleChange: function (row) {
                _this.setState({
                    currentEditId: row.key,
                });
            },
            handleSave: function (row) {
                var newData = __spreadArray([], _this.state.dataSource, true);
                var index = newData.findIndex(function (item) { return row.id === item.id; });
                var item = newData[index];
                newData.splice(index, 1, __assign(__assign({}, item), row));
                if (row.num2) {
                    newData[index].num3 = row.num1 * row.num2;
                }
                this.setState({ dataSource: __spreadArray([], newData, true) });
            },
            rowClick: function (record) {
                var form = _this.props.form;
                console.log('rowClick');
                _this.setState({
                    Inputvalue: record.name,
                    isModalVisible: false,
                }, function () {
                    form.setFieldValue('CorpHouse', record.name);
                    form.setFieldExtendValue('CorpHouse', record.name);
                });
            },
            iconClick: function () {
                var form = _this.props.form;
                _this.setState({
                    Inputvalue: '',
                });
                form.setFieldValue('CorpHouse', '');
                form.setFieldExtendValue('CorpHouse', '');
            },
            handleAdd: function () {
                var newData = _this.state.allData;
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    isModalVisible: true,
                });
            },
        };
    },
    handleCancel: function () {
        console.log('handleCancel');
        this.setState({
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    handleOk: function () {
        var newData = __spreadArray([], this.state.dataSource, true);
        var selectData = __spreadArray([], this.state.currentSelectData, true);
        if (selectData.length > 0) {
            selectData.forEach(function (e) {
                newData.push(e);
            });
        }
        console.log('handleOK');
        var uniqueData = __spreadArray([], uniqueArrayByKey(newData, ['id']), true);
        this.setState({
            dataSource: uniqueData,
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    fieldRender: function () {
        var _this_1 = this;
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
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
        // 详情页
        if (viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } }, value)));
        }
        return (React.createElement("div", { className: "CorpHouse_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputvalue, onClick: this.methods().handleAdd, placeholder: "\u8BF7\u9009\u62E9\u5E93\u623F", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u9009\u62E9\u5E93\u623F", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement("div", { className: "header_tab_class" },
                        React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().onSearch }),
                        React.createElement(StorageDesktopDialog, { onFinish: onFinish, onFinishFailed: onFinishFailed })),
                    React.createElement(Table, { scroll: { y: '255px' }, onRow: function (record) {
                            return {
                                onClick: _this_1.methods().rowClick.bind(_this_1, record),
                            };
                        }, rowSelection: {
                            type: 'radio',
                        }, rowKey: function (record) { return record.id; }, columns: mycolumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                    React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().onChangepage })))));
    },
};
export default FormField;
