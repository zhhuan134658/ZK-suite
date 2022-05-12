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
import { Table, Tooltip, Modal, Input, Button, Pagination, notification, Tabs, } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { fpAdd } from '../../utils/fpOperations';
var TabPane = Tabs.TabPane;
var Search = Input.Search;
var handleDview = function (key) {
    console.log(key);
    window.open(key.url);
};
var myColumns = [
    {
        title: '合同名称',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("a", { onClick: function () { return handleDview(record); } }, record.name))); },
    },
    {
        title: '甲方',
        dataIndex: 'party_a',
    },
    {
        title: '合同金额',
        dataIndex: 'money',
    },
];
var myColumns2 = [
    {
        title: '结算名称',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("a", { onClick: function () { return handleDview(record); } }, record.name))); },
    },
    {
        title: '甲方',
        dataIndex: 'extend_first',
    },
    {
        title: '结算金额',
        dataIndex: 'reply_money',
    },
];
var FormField = {
    getInitialState: function () {
        return {
            detailPage: 1,
            defaultActiveKey: 'a',
            detdate: 'a1',
            dstatus: '1',
            detailname: '',
            Inputmoney2: '',
            Inputmoney1: '',
            current_page: '',
            total2: '',
            allData: {
                rk_id: ['a'],
                number: '10',
                page: '1',
                name: '',
            },
            isModalVisible: false,
            isModalVisibletree: false,
            listData: [],
            treeData: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            loading: false,
            leaveLongVal: '',
            //   dataSource: [],
            dataSource: [],
            count: 1,
            currentEditId: 0,
            currentSelectData: [],
            currentSelectDataid: [],
            selectedRowKeys: [],
        };
    },
    methods: function () {
        var _this = this;
        return {
            handleSearch: function (value) {
                var newData = _this.state.allData;
                var defaultActiveKey = _this.state.defaultActiveKey;
                newData.name = value;
                newData.page = 1;
                newData.rk_id = [defaultActiveKey];
                _this.setState({ allData: newData });
                _this.asyncSetFieldProps(newData);
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
                if (row.tax_money) {
                    var newvalue = _this.state.Inputmoney1;
                    _this.setState({
                        Inputmoney1: (newvalue - row.tax_money).toFixed(2),
                    });
                }
                if (row.notax_money) {
                    var newvalue2 = _this.state.Inputmoney2;
                    _this.setState({
                        Inputmoney2: (newvalue2 - row.notax_money).toFixed(2),
                    });
                }
                _this.setState({
                    dataSource: dataSource.filter(function (item) { return item.id !== row.id; }),
                });
            },
            iconClick: function () {
                var form = _this.props.form;
                _this.setState({ Inputvalue: '' });
                form.setFieldValue('Selectjia', '');
                form.setFieldExtendValue('Selectjia', '');
                form.setFieldValue('Conmoney', '');
                form.setFieldExtendValue('Conmoney', '');
                form.setFieldValue('SelectHeshou', '');
                form.setFieldExtendValue('SelectHeshou', '');
            },
            handleAddNew: function () {
                var form = _this.props.form;
                var value = form.getFieldValue('Autopro');
                if (value) {
                    var defaultKey = _this.state.defaultActiveKey;
                    _this.setState({ dstatus: '1' });
                    var newPage = {
                        rk_id: [defaultKey],
                        number: '10',
                        page: '1',
                        name: '',
                        project_name: value,
                    };
                    _this.setState({ allData: newPage, isModalVisible: true });
                    _this.asyncSetFieldProps(newPage);
                }
                else {
                    notification.open({
                        duration: 2,
                        message: '请先选择项目',
                    });
                }
            },
            handleAdd: function () {
                _this.setState({ dstatus: '2' });
                var newpage = {
                    rk_id: ['-1'],
                    number: '10',
                    page: _this.state.detailPage,
                    name: '',
                };
                _this.asyncSetFieldProps(newpage);
                _this.setState({
                    isModalVisibletree: true,
                });
            },
            handleSave: function (row) {
                var newData = _this.state.dataSource;
                var index = newData.findIndex(function (item) { return item.id === row.id; });
                var item = newData[index];
                newData.splice(index, 1, __assign(__assign({}, item), row));
                if (row.rk_number) {
                    newData[index].tax_money = row.rk_number * row.tax_price;
                }
                if (row.tax_rate) {
                    newData[index].notax_price = (row.tax_money *
                        row.tax_rate *
                        0.01).toFixed(2);
                    newData[index].notax_money = (row.tax_money *
                        (100 - row.tax_rate) *
                        0.01).toFixed(2);
                }
                _this.setState({ dataSource: newData });
                var newarr1 = __spreadArray([], _this.state.dataSource, true);
                var newarr2 = [];
                newarr2 = newarr1.filter(function (item) {
                    if (item.tax_money) {
                        return item;
                    }
                });
                newarr2 = newarr2.map(function (item) {
                    return item.tax_money;
                });
                _this.setState({
                    Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                });
                // 不含税金额合计;
                var newarr3 = __spreadArray([], _this.state.dataSource, true);
                var newarr4 = [];
                newarr4 = newarr3.filter(function (item) {
                    if (item.notax_money) {
                        return item;
                    }
                });
                newarr4 = newarr4.map(function (item) {
                    return item.notax_money;
                });
                _this.setState({
                    Inputmoney2: newarr4.reduce(fpAdd, 0).toFixed(2),
                });
            },
            rowClick: function (record) {
                var form = _this.props.form;
                var newData = __spreadArray([], _this.state.dataSource, true);
                var index = newData.findIndex(function (item) { return _this.state.currentEditId === item.id; });
                var currentKey = newData[index].key;
                newData[index] = record;
                newData[index].key = currentKey;
                _this.setState({ dataSource: newData, isModalVisible: false }, function () {
                    form.setFieldValue('SelectHeshou', record);
                    form.setFieldExtendValue('SelectHeshou', record);
                });
            },
        };
    },
    handleOk: function () {
        this.setState({
            dstatus: '3',
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    handleCancel: function () {
        this.setState({ isModalVisible: false, selectedRowKeys: [] });
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var bizAlias = 'SelectHeshou';
        var promise = asyncSetProps(_this, data, bizAlias);
        promise.then(function (res) {
            var dataArray = res.dataArray;
            console.log('dataArray', dataArray);
            if (dataArray.length === 0) {
                _this.setState({ Inputvalue: '暂无合同' });
                _this.props.form.setFieldValue('SelectHeshou', '暂无合同');
                _this.setState({
                    listData: [],
                    current_page: 1,
                    total2: 0,
                });
            }
            else {
                _this.setState({
                    listData: __spreadArray([], dataArray, true),
                    current_page: res.currentPage,
                    total2: res.totalCount,
                });
                // const treeArray = [
                //   {
                //     title: '物资类型',
                //     key: '0',
                //     children: [...res.extendArray],
                //   },
                // ];
                // _this.setState({
                //   treeData: [...treeArray],
                //   current_page: res.currentPage,
                //   total3: res.totalCount,
                // });
                // const dStatus = _this.state.dstatus;
                // if (dStatus === '2') {
                //   _this.setState({ treelistData: [...dataArray] });
                //   let newarr2 = [];
                //   newarr2 = dataArray.filter(item => {
                //     if (item.tax_money) {
                //       return item;
                //     }
                //   });
                //   newarr2 = newarr2.map(item => {
                //     return item.tax_money;
                //   });
                //   _this.setState({
                //     Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                //   });
                //   // 不含税金额合计;
                //   let newarr4 = [];
                //   newarr4 = dataArray.filter(item => {
                //     if (item.notax_money) {
                //       return item;
                //     }
                //   });
                //   newarr4 = newarr4.map(item => {
                //     return item.notax_money;
                //   });
                //   _this.setState({
                //     Inputmoney2: newarr4.reduce(fpAdd, 0).toFixed(2),
                //   });
                // } else if (dStatus === '1') {
                //   _this.setState({
                //     listData: [...dataArray],
                //     current_page: res.currentPage,
                //     total2: res.totalCount,
                //   });
                // } else if (dStatus === '3') {
                //   _this.setState({ dataSource: [...dataArray] });
                // }
            }
        });
    },
    fieldDidUpdate: function () {
        if (!this.props.runtimeProps.viewMode) {
            console.log('发起页：fieldDidUpdate');
            var detailname = this.state.detailname;
            var form = this.props.form;
            form.setFieldValue('SelectHeshou', detailname);
            form.setFieldExtendValue('SelectHeshou', detailname);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        var field = form.getFieldInstance('SelectHeshou');
        var label = form.getFieldProp('SelectHeshou', 'label');
        var required = form.getFieldProp('SelectHeshou', 'required');
        var selectedRowKeys = this.state.selectedRowKeys;
        var Tabschange = function (key) {
            console.log(key);
            var newpage = {
                rk_id: [key],
                number: '10',
                page: 1,
                name: '',
            };
            _this_1.setState({
                defaultActiveKey: key,
                allData: newpage,
                detdate: key + '1',
            });
            _this_1.asyncSetFieldProps(newpage);
        };
        var rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: function (selectedRowKeys, selectedRows) {
                // console.log(
                //   `selectedRowKeys: ${selectedRowKeys}`,
                //   'selectedRows: ',
                //   selectedRows,
                // );
                var dtar = '';
                var newData = __spreadArray([], selectedRows, true);
                var newDataid = [];
                if (newData.length > 0) {
                    newData = newData.map(function (item) {
                        return Object.assign(item, {
                            num: 1,
                        });
                    });
                    newDataid = newData.map(function (item) {
                        return item.id;
                    });
                }
                console.log('======' + JSON.stringify(newDataid));
                if (_this_1.state.detdate === 'a1') {
                    dtar = '收入合同-' + newData[0].name;
                }
                else if (_this_1.state.detdate === 'b1') {
                    dtar = '收入进度款结算-' + newData[0].name;
                }
                else if (_this_1.state.detdate === 'c1') {
                    dtar = '收入完工结算-' + newData[0].name;
                }
                else if (_this_1.state.detdate === 'd1') {
                    dtar = '收入质保金结算-' + newData[0].name;
                }
                var form = _this_1.props.form;
                if (newData[0].party_a) {
                    form.setFieldValue('Selectjia', newData[0].party_a);
                    form.setFieldExtendValue('Selectjia', newData[0].party_a);
                }
                _this_1.setState({
                    currentSelectData: newData,
                    currentSelectDataid: newDataid,
                    detailname: dtar,
                    Inputvalue: dtar,
                });
                _this_1.setState({ selectedRowKeys: selectedRowKeys });
            },
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
        return (React.createElement("div", { className: "SelectHeshouField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputvalue, onClick: this.methods().handleAddNew, placeholder: "\u8BF7\u9009\u62E9\u5408\u540C", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u5173\u8054", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Tabs, { className: "Tabs_class", defaultActiveKey: "a", centered: true, onChange: Tabschange },
                        React.createElement(TabPane, { tab: "\u6536\u5165\u5408\u540C", key: "a" },
                            React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().handleSearch }),
                            React.createElement(Table, { scroll: { y: '255px' }, rowSelection: __assign({ type: 'radio' }, rowSelection), rowKey: function (record) { return record.id; }, columns: myColumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleChangePage })),
                        React.createElement(TabPane, { tab: "\u6536\u5165\u8FDB\u5EA6\u6B3E\u7ED3\u7B97", key: "b" },
                            React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().handleSearch }),
                            React.createElement(Table, { scroll: { y: '255px' }, rowSelection: __assign({ type: 'radio' }, rowSelection), rowKey: function (record) { return record.id; }, columns: myColumns2, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleChangePage })),
                        React.createElement(TabPane, { tab: "\u6536\u5165\u5B8C\u5DE5\u7ED3\u7B97 ", key: "c" },
                            React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().handleSearch }),
                            React.createElement(Table, { scroll: { y: '255px' }, rowSelection: __assign({ type: 'radio' }, rowSelection), rowKey: function (record) { return record.id; }, columns: myColumns2, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleChangePage })),
                        React.createElement(TabPane, { tab: "\u6536\u5165\u8D28\u4FDD\u91D1\u7ED3\u7B97", key: "d" },
                            React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.methods().handleSearch }),
                            React.createElement(Table, { scroll: { y: '255px' }, rowSelection: __assign({ type: 'radio' }, rowSelection), rowKey: function (record) { return record.id; }, columns: myColumns2, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleChangePage })))))));
    },
};
export default FormField;
