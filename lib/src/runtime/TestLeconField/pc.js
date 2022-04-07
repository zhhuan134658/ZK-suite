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
//重构完成
import React from 'react';
import { notification, Table, Tooltip, Modal, Input, Button, Popconfirm, Layout, Pagination, Tree, DatePicker, } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { fpAdd } from '../../utils/fpOperations';
import { changePage } from '../../utils/pageUtils';
import { handleTaxTableStatistics, } from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
var Content = Layout.Content, Sider = Layout.Sider;
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
var Search = Input.Search;
import { ImportDialog } from '../../components/importData';
import { DetailDialogDesktop } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var myColumns = [
    {
        title: '名称',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("span", null, record.name))); },
    },
    {
        title: '所属项目',
        dataIndex: 'project_name',
    },
    {
        title: '提交时间',
        dataIndex: 'created',
    },
];
var treeDiagramColumns = [
    {
        title: '物品名称',
        dataIndex: 'name',
        render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
            React.createElement("span", null, record.name))); },
    },
    {
        title: '物品类型',
        dataIndex: 'type_name',
    },
    {
        title: '单位',
        dataIndex: 'unit',
    },
    {
        title: '规格型号',
        dataIndex: 'size',
    },
];
var FormField = {
    getInitialState: function () {
        return {
            detailPage: 1,
            defaultActiveKey: 'a',
            value: undefined,
            msgdata: '',
            newOptine: [],
            visibleModal: false,
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
            fixedColumn: '',
            currentEditId: 0,
            currentSelectData: [],
            currentSelectDataid: [],
            selectedRowKeys: [],
        };
    },
    methods: function () {
        var _this = this;
        return {
            ResetClick: function () {
                _this.setState({
                    dataSource: [],
                    Inputmoney1: 0,
                });
            },
            addNewDetail: function () {
                _this.setState({
                    visibleModal: true,
                });
            },
            handleModalCancel: function () {
                _this.setState({
                    visibleModal: false,
                });
            },
            handleSearch: function (value, rk_id) {
                searchBarSubmitRK(_this, value, rk_id);
            },
            handleChangePage: function (page) {
                changePage(_this, page);
            },
            handleTreeChangePage: function (page) {
                _this.setState({ detailPage: page });
                changePage(_this, page, '-1');
            },
            handleRowChange: function (row) {
                _this.setState({
                    currentEditId: row.key,
                });
            },
            iconClick: function () {
                _this.setState({
                    detailname: '',
                    dataSource: [],
                    Inputmoney2: 0,
                    Inputmoney1: 0,
                });
            },
            handleRowDelete: function (row, index) {
                console.log('55555', _this.state.dataSource);
                var arr = __spreadArray([], _this.state.dataSource, true);
                arr.splice(index, 1);
                console.log('11111', arr);
                _this.setState({
                    dataSource: __spreadArray([], arr, true),
                    updata: _this.state.updata + 1,
                });
                if (arr.length > 0) {
                    var newarr2 = [];
                    newarr2 = arr.filter(function (item) {
                        if (item.subtotal) {
                            return item;
                        }
                    });
                    newarr2 = newarr2.map(function (item) {
                        return item.subtotal;
                    });
                    _this.setState({
                        Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                    });
                }
                else {
                    _this.setState({
                        Inputmoney1: 0,
                    });
                }
            },
            handleProjectAdd: function () {
                var newData = _this.state.defaultActiveKey;
                _this.setState({
                    dstatus: '1',
                });
                var newPage = {
                    rk_id: [newData],
                    number: '10',
                    page: 1,
                    name: '',
                };
                _this.setState({
                    allData: newPage,
                });
                _this.asyncSetFieldProps(newPage);
                _this.setState({
                    isModalVisible: true,
                });
            },
            handleDetailAdd: function () {
                var form = _this.props.form;
                var projectName = form.getFieldValue('Autopro');
                if (!projectName) {
                    return notification.open({
                        message: '请先选择项目',
                    });
                }
                _this.setState({
                    dstatus: '2',
                });
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
                var datenum = _this
                    .methods()
                    .getDaysBetween(row.plan_in_riqi, row.plan_out_riqi);
                // const datenum = _this.state.datenum;
                var newData = __spreadArray([], _this.state.dataSource, true);
                var index = newData.findIndex(function (item) { return row.id === item.id; });
                var item = newData[index];
                newData.splice(index, 1, __assign(__assign({}, item), row));
                if (row.price && row.zl_number) {
                    newData[index].subtotal = row.zl_number * row.price * Number(datenum);
                }
                console.log('NEWDATA', newData);
                _this.setState({
                    dataSource: __spreadArray([], newData, true),
                });
                var newarr1 = __spreadArray([], newData, true);
                var newarr2 = [];
                newarr2 = newarr1.filter(function (item) {
                    if (item.subtotal) {
                        return item;
                    }
                });
                newarr2 = newarr2.map(function (item) {
                    return item.subtotal;
                });
                console.log('newarr2', newarr2);
                _this.setState({
                    Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                });
            },
            handleSetTableData: function (data) {
                console.log('DATA', data);
                var sourceData = _this.state.dataSource;
                var newData = [];
                if (sourceData && sourceData.length > 0) {
                    newData = sourceData.concat(data);
                }
                else {
                    newData = data;
                }
                _this.setState({
                    dataSource: newData,
                }, function () {
                    var newarr1 = __spreadArray([], newData, true);
                    var newarr2 = [];
                    newarr2 = newarr1.filter(function (item) {
                        if (item.subtotal) {
                            return item;
                        }
                    });
                    newarr2 = newarr2.map(function (item) {
                        return item.subtotal;
                    });
                    _this.setState({
                        Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                    });
                });
            },
            rowClick: function (record) {
                var newData = __spreadArray([], _this.state.dataSource, true);
                var index = newData.findIndex(function (item) { return item.key === _this.state.currentEditId; });
                var key = newData[index].key;
                newData[index] = record;
                newData[index].key = key;
                console.log('SET DATASOURCE 3');
                _this.setState({ dataSource: newData, isModalVisible: false });
            },
            handleMaterialOK: function () {
                var newData = __spreadArray([], _this.state.dataSource, true);
                var selectData = __spreadArray([], _this.state.currentSelectData, true);
                var lData = [];
                if (selectData.length > 0) {
                    selectData.forEach(function (element) {
                        newData.push(element);
                    });
                }
                lData = __spreadArray([], uniqueArrayByKey(newData, ['id']), true);
                console.log('Remove duplicate', lData);
                console.log('SET STATE DATASOURCE 2');
                _this.setState({
                    dataSource: lData,
                    isModalVisibletree: false,
                    selectedRowKeys: [],
                });
            },
            handleMaterialCancel: function () {
                _this.setState({ isModalVisibletree: false, selectedRowKeys: [] });
            },
            getDaysBetween: function (dateString1, dateString2) {
                var startDate = Date.parse(dateString1);
                var endDate = Date.parse(dateString2);
                if (startDate > endDate) {
                    return 0;
                }
                if (startDate === endDate) {
                    return 1;
                }
                var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
                return days + 1;
            },
            timeChange: function (record, index, name, date, dateString) {
                var newData = __spreadArray([], _this.state.dataSource, true);
                newData[index][name] = dateString;
                console.log(record, index, name, date, dateString, newData);
                if (record.plan_in_riqi && record.plan_out_riqi) {
                    var timenum = _this
                        .methods()
                        .getDaysBetween(record.plan_in_riqi, record.plan_out_riqi);
                    if (timenum === 0) {
                        notification.open({
                            message: '请先选择正确的日期',
                        });
                        // _this.setState({ datenum: timenum });
                    }
                    else {
                        _this.setState({ dataSource: __spreadArray([], newData, true) }, function () {
                            _this.methods().handleSave(record);
                        });
                    }
                    //   _this.setState({});
                    console.log(timenum);
                }
            },
        };
    },
    handleOk: function () {
        this.setState({ dstatus: '3' });
        console.log(this.state.detdate);
        var cDataid = __spreadArray([], this.state.currentSelectDataid, true);
        var newData = this.state.allData;
        newData.rk_id = __spreadArray([this.state.detdate], cDataid, true);
        console.log(newData);
        this.asyncSetFieldProps(newData);
        this.setState({
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    handleCancel: function () {
        this.setState({ isModalVisible: false, selectedRowKeys: [] });
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var bizAlias = 'TestLecon';
        var promise = asyncSetProps(_this, data, bizAlias, 'pur_order');
        promise
            .then(function (res) {
            console.log('ASYNC', res);
            var treeArray = [
                {
                    title: '物资类型',
                    key: '0',
                    children: res.extendArray,
                },
            ];
            _this.setState({
                treeData: __spreadArray([], treeArray, true),
                current_page: res.currentPage,
                total3: res.totalCount,
            });
            var dStatus = _this.state.dstatus;
            if (dStatus === '2') {
                var dataArray = __spreadArray([], res.dataArray, true);
                _this.setState({
                    treelistData: dataArray,
                });
                handleTaxTableStatistics(_this, dataArray);
            }
            else if (dStatus === '3') {
                var dataArray = __spreadArray([], res.dataArray, true);
                console.log('SET STATE DATASOURCE 1');
                _this.setState({
                    dataSource: __spreadArray([], dataArray, true),
                });
                handleTaxTableStatistics(_this, dataArray);
            }
            else if (dStatus === '1') {
                _this.setState({
                    listData: __spreadArray([], res.dataArray, true),
                    current_page: res.currentPage,
                    total2: res.totalCount,
                });
            }
            if (_this.state.msgdata === '1') {
                notification.open({
                    message: res.message,
                });
                _this.setState({
                    msgdata: '0',
                });
            }
        })
            .catch(function (e) {
            console.log('ASYNC ERROR', e);
        });
    },
    fieldDidUpdate: function () {
        if (!this.props.runtimeProps.viewMode) {
            console.log('发起页：fieldDidUpdate');
            var editData = {
                hanmoney: 0,
                nomoney: 0,
                detailname: '',
                detailedData: [], //物资明细
            };
            if (this.state.Inputmoney1) {
                editData.hanmoney = Number(this.state.Inputmoney1);
            }
            editData.detailname = this.state.detailname;
            editData.detailedData = this.state.dataSource;
            var newlistdata = this.state.dataSource;
            var str2 = this.state.detailname;
            var str0 = '\n' +
                '设备名称 单位 规格型号 结算周期(始) 结算周期(终) 数量 单价 小计';
            var str1 = '\n' + '合计：' + this.state.Inputmoney1;
            for (var i = 0; i < newlistdata.length; i++) {
                str0 +=
                    '\n' +
                        newlistdata[i].name +
                        ' ' +
                        newlistdata[i].unit +
                        ' ' +
                        newlistdata[i].size +
                        ' ' +
                        newlistdata[i].plan_in_riqi +
                        ' ' +
                        newlistdata[i].plan_out_riqi +
                        ' ' +
                        newlistdata[i].zl_number +
                        ' ' +
                        newlistdata[i].price +
                        ' ' +
                        newlistdata[i].subtotal;
            }
            var str = str2 + str0 + str1;
            console.log(str);
            var form = this.props.form;
            form.setFieldValue('TestLecon', str);
            form.setFieldExtendValue('TestLecon', editData);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestLecon');
        var label = form.getFieldProp('TestLecon', 'label');
        var required = form.getFieldProp('TestLecon', 'required');
        var _a = this.state, dataSource = _a.dataSource, selectedRowKeys = _a.selectedRowKeys;
        var deColumns = [
            {
                title: '物资名称',
                dataIndex: 'name',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
                    React.createElement("span", null, record.name))); },
            },
            {
                title: '单位',
                dataIndex: 'unit',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.unit },
                    React.createElement("span", null, record.unit))); },
            },
            {
                title: '规格型号',
                dataIndex: 'size',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.size },
                    React.createElement("span", null, record.size))); },
            },
            {
                title: '结算周期(始)',
                dataIndex: 'plan_in_riqi',
                width: 200,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.plan_in_riqi },
                    React.createElement("span", null, record.plan_in_riqi))); },
            },
            {
                title: '结算周期(终)',
                dataIndex: 'plan_out_riqi',
                width: 200,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.plan_out_riqi },
                    React.createElement("span", null, record.plan_out_riqi))); },
            },
            {
                title: '数量',
                dataIndex: 'zl_number',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.zl_number },
                    React.createElement("span", null, record.zl_number))); },
            },
            {
                title: '单价(元)',
                dataIndex: 'price',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.price },
                    React.createElement("span", null, record.price))); },
            },
            {
                title: '小计(元)',
                dataIndex: 'subtotal',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.subtotal },
                    React.createElement("span", null, record.subtotal))); },
            },
        ];
        var etColumns = [
            {
                title: '物资名称',
                dataIndex: 'name',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
                    React.createElement("span", null, record.name))); },
            },
            {
                title: '单位',
                dataIndex: 'unit',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.unit },
                    React.createElement("span", null, record.unit))); },
            },
            {
                title: '规格型号',
                dataIndex: 'size',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.size },
                    React.createElement("span", null, record.size))); },
            },
            {
                title: '结算周期(始)',
                dataIndex: 'plan_in_riqi',
                key: 'plan_in_riqi',
                width: 200,
                render: function (text, record, index) {
                    return (React.createElement(DatePicker, { format: "YYYY-MM-DD", placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F", onChange: _this_1.methods().timeChange.bind(_this_1, record, index, 'plan_in_riqi') }));
                },
            },
            {
                title: '结算周期(终)',
                dataIndex: 'plan_out_riqi',
                key: 'plan_out_riqi',
                width: 200,
                render: function (text, record, index) {
                    return (React.createElement(DatePicker, { format: "YYYY-MM-DD", placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F", onChange: _this_1.methods().timeChange.bind(_this_1, record, index, 'plan_out_riqi') }));
                },
            },
            {
                title: '数量',
                dataIndex: 'zl_number',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.zl_number },
                    React.createElement("span", null, record.zl_number))); },
            },
            {
                title: '单价(元)',
                dataIndex: 'price',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.price },
                    React.createElement("span", null, record.price))); },
            },
            {
                title: '小计(元)',
                dataIndex: 'subtotal',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.subtotal },
                    React.createElement("span", null, record.subtotal))); },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: function (_, record, index) {
                    return _this_1.state.dataSource.length >= 1 ? (React.createElement(Popconfirm, { cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", title: "\u786E\u5B9A\u5220\u9664?", onConfirm: function () { return _this_1.methods().handleRowDelete(record, index); } },
                        React.createElement("a", null, "\u5220\u9664"))) : null;
                },
            },
        ];
        var components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        var columns = etColumns.map(function (col) {
            if (!col.editable) {
                return col;
            }
            return __assign(__assign({}, col), { onCell: function (record) { return ({
                    record: record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: _this_1.methods().handleSave,
                    handleChange: _this_1.methods().handleRowChange,
                }); } });
        });
        var onSelect = function (keys, info) {
            console.log('Trigger Select', keys, info);
            var treedata = {
                type: keys[0],
                number: '10',
                page: '1',
                rk_id: ['-1'],
            };
            _this_1.setState({
                allData: treedata,
            });
            _this_1.asyncSetFieldProps(treedata);
        };
        var onExpand = function () {
            console.log('Trigger Expand');
        };
        var rowSelectionMaterial = {
            selectedRowKeys: selectedRowKeys,
            onChange: function (selectedRowKeys, selectedRows) {
                // console.log(
                //   `selectedRowKeys: ${selectedRowKeys}`,
                //   'selectedRows: ',
                //   selectedRows,
                // );
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
                _this_1.setState({
                    currentSelectData: newData,
                    currentSelectDataid: newDataid,
                });
                _this_1.setState({ selectedRowKeys: selectedRowKeys });
            },
        };
        var rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: function (selectedRowKeys, selectedRows) {
                var dtar = '';
                var newData = __spreadArray([], selectedRows, true);
                console.log('newData', newData);
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
                if (_this_1.state.detdate === 'a1') {
                    dtar = newData[0] ? newData[0]['name'] : '';
                }
                form.setFieldExtendValue('Selectjia', newData[0] ? newData[0]['supplier'] : '');
                form.setFieldValue('Selectjia', newData[0] ? newData[0]['supplier'] : '');
                _this_1.setState({
                    currentSelectData: newData,
                    currentSelectDataid: newDataid,
                    detailname: dtar,
                });
                _this_1.setState({ selectedRowKeys: selectedRowKeys });
            },
        };
        var onFinish = function (values) {
            _this_1.setState({
                msgdata: '1',
            });
            console.log('Success:', values);
            //   const [form] = Form.useForm();
            var newdate = _this_1.state.allData;
            newdate.wz_add = values;
            _this_1.asyncSetFieldProps(newdate);
            _this_1.setState({
                visibleModal: false,
            });
            //   form.resetFields();
        };
        var onFinishFailed = function (errorInfo) {
            console.log('Failed:', errorInfo);
        };
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue();
            // if (!value.detailedData) {
            //   value = field.getValue();
            // }
            var _b = value ? value : {}, _c = _b.detailname, detailname = _c === void 0 ? '' : _c, _d = _b.nomoney, nomoney = _d === void 0 ? 0 : _d, _e = _b.hanmoney, hanmoney = _e === void 0 ? 0 : _e, _f = _b.detailedData, detailedData = _f === void 0 ? [] : _f;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", null, detailname),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", null,
                    React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: value instanceof Array ? value : detailedData, columns: deColumns, pagination: false })),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u5408\u8BA1(\u5143)"),
                React.createElement("div", null, hanmoney ? Number(hanmoney).toFixed(2) : '')));
        }
        return (React.createElement("div", { className: "TestLeconField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", null,
                    React.createElement("div", { className: "label", style: { display: 'flex', justifyContent: 'space-between' } },
                        React.createElement("div", null,
                            required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                            label),
                        React.createElement("div", { style: { color: '#409EFF', cursor: 'pointer' } },
                            React.createElement(Popconfirm, { title: "\u662F\u5426\u91CD\u7F6E\uFF1F\u91CD\u7F6E\u540E\u660E\u7EC6\u8868\u683C\u5C06\u6E05\u7A7A\u3002", onConfirm: this.methods().ResetClick, okText: "\u662F", cancelText: "\u5426" },
                                React.createElement("span", null, "\u91CD\u7F6E\u660E\u7EC6")))),
                    React.createElement(Input, { onClick: this.methods().handleProjectAdd, readOnly: true, value: this.state.detailname, placeholder: "\u8BF7\u9009\u62E9", suffix: React.createElement(CloseCircleOutlined, { onClick: this.methods().iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement("div", { style: { marginTop: '10px' } },
                    React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: dataSource, columns: columns, pagination: false }),
                    React.createElement("div", { style: {
                            display: 'flex',
                            marginTop: '16px',
                            marginBottom: '16px',
                        } },
                        React.createElement(Button, { style: { marginRight: '16px' }, onClick: this.methods().handleDetailAdd, type: "primary" }, "\u6DFB\u52A0\u660E\u7EC6"),
                        React.createElement(ImportDialog, { columns: columns, binding: this, setTableData: this.methods().handleSetTableData, bizAlias: "TestLecon" }))),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u5408\u8BA1(\u5143)"),
                React.createElement("div", null,
                    React.createElement(Input, { readOnly: true, value: this.state.Inputmoney1, placeholder: "\u81EA\u52A8\u8BA1\u7B97" })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u5173\u8054", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: function (val) {
                            _this_1.methods().handleSearch(val, 'a');
                        }, onChange: function (e) {
                            if (e.target.value === '') {
                                _this_1.methods().handleSearch('', 'a');
                            }
                        } }),
                    React.createElement(Table, { scroll: { x: '1500px' }, rowSelection: __assign({ type: 'radio' }, rowSelection), className: "full-size-editable", rowKey: function (record) { return record.id; }, columns: myColumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                    React.createElement(Pagination, { defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleChangePage })),
                React.createElement(Modal, { className: "isvzhukuaiwarehousing", title: "\u9009\u62E9\u7269\u8D44", width: 1000, visible: this.state.isModalVisibletree, footer: [
                        React.createElement(Button, { key: "back", onClick: this.methods().handleMaterialCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.methods().handleMaterialOK }, "\u786E\u5B9A"),
                    ], onCancel: this.methods().handleMaterialCancel },
                    React.createElement(Layout, null,
                        React.createElement(Sider, { className: "newside_new" },
                            React.createElement(Tree, { defaultExpandedKeys: ['0'], blockNode: true, onSelect: onSelect, onExpand: onExpand, treeData: this.state.treeData })),
                        React.createElement(Content, null,
                            React.createElement("div", { className: "header_tab_class" },
                                React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: function (val) {
                                        _this_1.methods().handleSearch(val, '-1');
                                    }, onChange: function (e) {
                                        if (e.target.value === '') {
                                            _this_1.methods().handleSearch('', '-1');
                                        }
                                    } }),
                                React.createElement(DetailDialogDesktop, { treeData: this.state.treeData, onFinish: onFinish, onFinishFailed: onFinishFailed })),
                            React.createElement(Table, { scroll: { y: '255px' }, rowSelection: __assign({ type: 'checkbox' }, rowSelectionMaterial), rowKey: function (record) { return record.id; }, columns: treeDiagramColumns, dataSource: this.state.treelistData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { showSizeChanger: false, defaultCurrent: 1, total: this.state.total3, hideOnSinglePage: true, className: "pagination", onChange: this.methods().handleTreeChangePage })))))));
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
