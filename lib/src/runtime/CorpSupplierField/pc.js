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
import { Button, Modal, Tooltip, Input, Pagination, Table, notification, Layout, Form, Select, Tree, } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { asyncSetProps } from '../../utils/asyncSetProps';
var Search = Input.Search;
var Sider = Layout.Sider, Content = Layout.Content;
var Option = Select.Option;
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var mycolumns = [
    {
        title: '单位名称',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("span", null, record.name))); },
    },
    {
        title: '单位编号',
        dataIndex: 'number',
    },
    {
        title: '分管人',
        dataIndex: 'charge_person:',
    },
    {
        title: '单位类型',
        dataIndex: 'supplier_type_name',
    },
    {
        title: '单位性质',
        dataIndex: 'unit_nature',
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
                supplier_type: '0',
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
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'CorpSupplier');
        promise.then(function (res) {
            var dropDownData = __spreadArray([], res.extendArray.data, true);
            dropDownData.splice(0, 1);
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
                current_page: res.currentPage,
                total2: res.totalCount,
                treeData: __spreadArray([], res.extendArray.data, true),
                newOptine: __spreadArray([], dropDownData, true),
            });
            if (_this.state.msgdata === '1') {
                notification.open({
                    message: res.message,
                });
                _this.setState({
                    msgdata: '0',
                });
            }
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
                _this.setState({
                    Inputvalue: record.name,
                    isModalVisible: false,
                }, function () {
                    form.setFieldValue('CorpSupplier', record.name);
                    form.setFieldExtendValue('CorpSupplier', record.name);
                });
            },
            iconClick: function () {
                var form = _this.props.form;
                _this.setState({
                    Inputvalue: '',
                });
                form.setFieldValue('CorpSupplier', '');
                form.setFieldExtendValue('CorpSupplier', '');
            },
            handleAdd: function () {
                var newData = _this.state.allData;
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    isModalVisible: true,
                });
            },
            hideModal: function () {
                _this.setState({
                    visibleModal: false,
                });
            },
            showModal: function () {
                _this.setState({
                    visibleModal: true,
                });
            },
        };
    },
    handleCancel: function () {
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
        var field = form.getFieldInstance('CorpSupplier');
        var label = form.getFieldProp('CorpSupplier', 'label');
        var required = form.getFieldProp('CorpSupplier', 'required');
        var onSelect = function (keys, info) {
            console.log(info.node.key);
            var treedata = {
                supplier_type: '',
                name: '',
                number: '10',
                page: '1',
            };
            treedata = {
                supplier_type: info.node.key,
                name: '',
                number: '10',
                page: '1',
            };
            _this_1.setState({
                allData: treedata,
            });
            _this_1.asyncSetFieldProps(treedata);
        };
        form.onFieldExtendValueChange('CorpSupplier', function (value) {
            if (_this_1.state.Inputvalue !== value) {
                _this_1.setState({
                    Inputvalue: value,
                });
            }
        });
        var onExpand = function () {
            console.log('Trigger Expand');
        };
        var Options = this.state.newOptine.map(function (station) { return (React.createElement(Option, { key: station.key, value: station.title }, station.title)); });
        var onFinish = function (values) {
            _this_1.setState({
                msgdata: '1',
            });
            console.log('Success:', values);
            //   const [form] = Form.useForm();
            var newdate = _this_1.state.allData;
            newdate.supplier_add = values;
            _this_1.asyncSetFieldProps(newdate);
            _this_1.setState({
                visibleModal: false,
            });
            newdate.supplier_add = '';
            //   form.resetFields();
        };
        var onFinishFailed = function (errorInfo) {
            console.log('Failed:', errorInfo);
        };
        // 详情页
        if (viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } },
                    " ",
                    value)));
        }
        return (React.createElement("div", { className: "CorpSupplier_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputvalue, onClick: this.methods().handleAdd, placeholder: "\u8BF7\u9009\u62E9", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaizkgl", title: "\u9009\u62E9\u4F9B\u5E94\u5546", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { type: "primary", loading: this.state.loading, onClick: this.handleOk, key: "ok" }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Layout, null,
                        React.createElement(Sider, { className: "newside_new" },
                            React.createElement(Tree, { blockNode: true, defaultExpandAll: true, onSelect: onSelect, onExpand: onExpand, treeData: this.state.treeData })),
                        React.createElement(Content, null,
                            React.createElement("div", { className: "header_tab_class" },
                                React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().onSearch }),
                                React.createElement(Button, { onClick: this.methods().showModal, size: "large", type: "primary" }, "\u65B0\u589E")),
                            React.createElement(Table, { scroll: { y: '255px' }, onRow: function (record) {
                                    return {
                                        onClick: _this_1.methods().rowClick.bind(_this_1, record),
                                    };
                                }, rowKey: function (record) { return record.id; }, columns: mycolumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().onChangePage })))),
                React.createElement(Modal, { className: "isvzhukuaizkgl", onCancel: this.methods().hideModal, visible: this.state.visibleModal, width: 1000, title: "\u65B0\u589E", footer: null },
                    React.createElement(Form, { initialValues: { remember: true }, layout: "vertical", onFinish: onFinish, onFinishFailed: onFinishFailed },
                        React.createElement(Form.Item, { label: "\u5355\u4F4D\u540D\u79F0", name: "name", rules: [{ required: true, message: '请填写单位名称' }] },
                            React.createElement(Input, { placeholder: "\u8BF7\u586B\u5199\u5355\u4F4D\u540D\u79F0" })),
                        React.createElement(Form.Item, { label: "\u5355\u4F4D\u7C7B\u578B", name: "supplier_type", rules: [{ required: true, message: '请填写单位类型' }] },
                            React.createElement(Select, { placeholder: "\u8BF7\u586B\u5199\u5355\u4F4D\u7C7B\u578B", allowClear: true }, Options)),
                        React.createElement(Form.Item, { label: "\u5355\u4F4D\u6027\u8D28", name: "unit_nature", rules: [{ required: true, message: '请填写单位性质' }] },
                            React.createElement(Select, { placeholder: "\u8BF7\u586B\u5199\u5355\u4F4D\u6027\u8D28", allowClear: true },
                                React.createElement(Option, { value: "\u4E8B\u4E1A" }, "\u4E8B\u4E1A"),
                                React.createElement(Option, { value: "\u4F01\u4E1A" }, "\u4F01\u4E1A"),
                                React.createElement(Option, { value: "\u793E\u56E2" }, "\u793E\u56E2"),
                                React.createElement(Option, { value: "\u81EA\u7136\u4EBA" }, "\u81EA\u7136\u4EBA"),
                                React.createElement(Option, { value: "\u5176\u4ED6" }, "\u5176\u4ED6"))),
                        React.createElement(Form.Item, { className: "newForm" },
                            React.createElement(Button, { type: "primary", htmlType: "submit" }, "\u786E\u8BA4"),
                            React.createElement(Button, { type: "primary", onClick: this.methods().hideModal }, "\u53D6\u6D88")))))));
    },
};
export default FormField;
