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
import { DatePicker, notification, Table, Tooltip, Modal, Input, Button, Popconfirm, Layout, Pagination, Tree, } from 'antd';
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import { deleteRowForTaxCalcTables, handleSaveTaxTable, handleTaxTableStatistics, } from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
var Content = Layout.Content, Sider = Layout.Sider;
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { ImportDialog } from '../../components/importData';
import moment from 'moment';
import { biddingColumns } from '../../printColumns/TestBiddingField';
import { parsePrintString } from '../../utils/printStringParser';
import { DetailDialogDesktop } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var Search = Input.Search;
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
        title: '含税单价（元）',
        dataIndex: 'tax_price',
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
                    handleTaxTableStatistics(_this);
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
                    dataSource: [],
                });
            },
            handleRowDelete: function (row) {
                deleteRowForTaxCalcTables(_this, row);
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
            handleSave: function (row, values) {
                var dataList = _this.state.dataSource;
                var key = Object.keys(values)[0];
                var data = handleSaveTaxTable(_this, dataList, row, key);
                _this.setState({
                    dataSource: __spreadArray([], data, true),
                }, function () {
                    handleTaxTableStatistics(_this);
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
                console.log('SET STATE DATASOURCE 2');
                _this.setState({
                    dataSource: lData,
                    isModalVisibletree: false,
                    selectedRowKeys: [],
                });
                _this.methods().updateTable(lData);
            },
            handleMaterialCancel: function () {
                _this.setState({ isModalVisibletree: false, selectedRowKeys: [] });
            },
            timeChange: function (record, index, name, date, dateString) {
                var newData = __spreadArray([], _this.state.dataSource, true);
                newData[index][name] = dateString;
                console.log(record, index, name, date, dateString, newData);
                _this.setState({ dataSource: __spreadArray([], newData, true) });
            },
            ResetClick: function () {
                _this.setState({
                    dataSource: [],
                });
            },
            updateTable: function (list) {
                var form = _this.props.form;
                var field = form.getFieldInstance('TestBidding_Table');
                form.setFieldValue('TestBidding_Table', []); //清空明细
                console.log('打印表格明细', field);
                list.map(function (item) {
                    var newlist = [
                        { key: 'TestBidding_name', value: '1' },
                        { key: 'TestBidding_size', value: '1' },
                        { key: 'TestBidding_unit', value: '1' },
                        { key: 'TestBidding_number', value: '1' },
                        { key: 'TestBidding_purchase_unit', value: '1' },
                        { key: 'TestBidding_purchase_riqi', value: '1' },
                        { key: 'TestBidding_purchase_address', value: '1' },
                        { key: 'TestBidding_candidate_list', value: '1' },
                    ];
                    newlist[0].value = item.name || '';
                    newlist[1].value = item.unit || '';
                    newlist[2].value = item.size || '';
                    newlist[3].value = item.number || '';
                    newlist[4].value = item.purchase_unit || '';
                    newlist[5].value = item.purchase_riqi || '';
                    newlist[6].value = item.purchase_address || '';
                    newlist[7].value = item.candidate_list || '';
                    field.tbody.add(newlist);
                });
                console.log('打印表格明细', field.getValue());
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
        var bizAlias = 'TestBidding';
        var promise = asyncSetProps(_this, data, bizAlias);
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
            var editData = {
                detailedData: [], //物资明细
            };
            editData.detailedData = this.state.dataSource;
            // 打印数据
            var newlistdata = this.state.dataSource;
            var str = parsePrintString(newlistdata, biddingColumns);
            console.log(str);
            var form = this.props.form;
            form.setFieldValue('TestBidding', str);
            form.setFieldExtendValue('TestBidding', editData);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestBidding');
        var label = form.getFieldProp('TestBidding', 'label');
        var required = form.getFieldProp('TestBidding', 'required');
        var _a = this.state, dataSource = _a.dataSource, selectedRowKeys = _a.selectedRowKeys;
        var deColumns = [
            {
                title: '物资名称',
                dataIndex: 'name',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.name },
                    React.createElement("span", null, record.name))); },
            },
            {
                title: '规格型号',
                dataIndex: 'size',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.size },
                    React.createElement("span", null, record.size))); },
            },
            {
                title: '单位',
                dataIndex: 'unit',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.unit },
                    React.createElement("span", null, record.unit))); },
            },
            {
                title: '估算数量',
                dataIndex: 'number',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.number },
                    React.createElement("span", null, record.number))); },
            },
            {
                title: '物资采购单位',
                dataIndex: 'purchase_unit',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.purchase_unit },
                    React.createElement("span", null, record.purchase_unit))); },
            },
            {
                title: '采购日期',
                dataIndex: 'purchase_riqi',
                width: 200,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.purchase_riqi },
                    React.createElement("span", null, record.purchase_riqi))); },
            },
            {
                title: '采购地点',
                dataIndex: 'purchase_address',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.purchase_address },
                    React.createElement("span", null, record.purchase_address))); },
            },
            {
                title: '候选供应商名单',
                dataIndex: 'candidate_list',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.candidate_list },
                    React.createElement("span", null, record.candidate_list))); },
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
                title: '规格型号',
                dataIndex: 'size',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.size },
                    React.createElement("span", null, record.size))); },
            },
            {
                title: '单位',
                dataIndex: 'unit',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.unit },
                    React.createElement("span", null, record.unit))); },
            },
            {
                title: '估算数量',
                dataIndex: 'number',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.number },
                    React.createElement("span", null, record.number))); },
            },
            {
                title: '物资采购单位',
                dataIndex: 'purchase_unit',
                render: function (_, record) { return (React.createElement(Input, { value: record.purchase_unit, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                        record.purchase_unit = e.target.value;
                    } })); },
            },
            {
                title: '采购日期',
                dataIndex: 'purchase_riqi',
                key: 'purchase_riqi',
                width: 200,
                render: function (text, record, index) {
                    return (React.createElement(DatePicker, { format: "YYYY-MM-DD", placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F", onChange: _this_1.methods().timeChange.bind(_this_1, record, index, 'purchase_riqi'), value: record.purchase_riqi ? moment(record.purchase_riqi) : null }));
                },
            },
            {
                title: '采购地点',
                dataIndex: 'purchase_address',
                render: function (_, record) { return (React.createElement(Input, { value: record.purchase_address, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                        record.purchase_address = e.target.value;
                    } })); },
            },
            {
                title: '候选供应商名单',
                dataIndex: 'candidate_list',
                render: function (_, record) { return (React.createElement(Input, { value: record.candidate_list, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                        record.candidate_list = e.target.value;
                    } })); },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: function (_, record) {
                    return _this_1.state.dataSource.length >= 1 ? (React.createElement(Popconfirm, { cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", title: "\u786E\u5B9A\u5220\u9664?", onConfirm: function () { return _this_1.methods().handleRowDelete(record); } },
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
            var _b = (value ? value : {}).detailedData, detailedData = _b === void 0 ? [] : _b;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", null,
                    React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: value instanceof Array ? value : detailedData, columns: deColumns, pagination: false }))));
        }
        return (React.createElement("div", { className: "TestBiddingField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", null,
                    React.createElement("div", { className: "label", style: { display: 'flex', justifyContent: 'space-between' } },
                        React.createElement("div", null,
                            required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                            label),
                        React.createElement("div", { style: { color: '#409EFF', cursor: 'pointer' } },
                            React.createElement(Popconfirm, { title: "\u662F\u5426\u91CD\u7F6E\uFF1F\u91CD\u7F6E\u540E\u660E\u7EC6\u8868\u683C\u5C06\u6E05\u7A7A\u3002", onConfirm: this.methods().ResetClick, okText: "\u662F", cancelText: "\u5426" },
                                React.createElement("span", null, "\u91CD\u7F6E\u660E\u7EC6"))))),
                React.createElement("div", { style: { marginTop: '10px' } },
                    React.createElement("div", { style: {
                            display: 'flex',
                            marginTop: '16px',
                        } },
                        React.createElement(Button, { style: { marginRight: '16px' }, onClick: this.methods().handleDetailAdd, type: "primary" }, "\u6DFB\u52A0\u660E\u7EC6"),
                        React.createElement(ImportDialog, { columns: columns, binding: this, setTableData: this.methods().handleSetTableData, bizAlias: "TestBidding" }))),
                React.createElement(Modal, { className: "isvzhukuaizkgl", title: "\u9009\u62E9\u7269\u8D44", width: 1000, visible: this.state.isModalVisibletree, footer: [
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
};
export default FormField;
