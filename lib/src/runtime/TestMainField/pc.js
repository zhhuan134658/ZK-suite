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
import { notification, Table, Tooltip, Modal, Input, Button, Popconfirm, Layout, Pagination, Tree, } from 'antd';
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import { handleTaxTableStatistics } from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
var Content = Layout.Content, Sider = Layout.Sider;
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { ImportDialog } from '../../components/importData';
import { fpAdd } from '../../utils/fpOperations';
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
                    _this.methods().handleSave();
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
            handleRowDelete: function (row) {
                var dataSource = __spreadArray([], _this.state.dataSource, true);
                var arr = dataSource.filter(function (item) { return item.id !== row.id; });
                _this.setState({
                    dataSource: arr,
                });
                if (arr.length > 0) {
                    var newarr2 = [];
                    newarr2 = arr.filter(function (item) {
                        if (item.total_price) {
                            return item;
                        }
                    });
                    newarr2 = newarr2.map(function (item) {
                        return item.total_price;
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
                if (!row) {
                    var newData = __spreadArray([], _this.state.dataSource, true);
                    var newarr1 = __spreadArray([], newData, true);
                    var newarr2 = newarr1
                        .filter(function (item) {
                        if (item.total_price) {
                            return item;
                        }
                    })
                        .map(function (item) {
                        return item.total_price;
                    });
                    _this.setState({
                        Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                    });
                }
                else {
                    var newData = __spreadArray([], _this.state.dataSource, true);
                    var index = newData.findIndex(function (item) { return row.id === item.id; });
                    var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
                    var item = newData[index];
                    newData.splice(index, 1, __assign(__assign({}, item), row));
                    if (reg.test(row.material_total) && reg.test(row.person_total)) {
                        newData[index].total_price = (Number(row.material_total) + Number(row.person_total)).toFixed(2);
                    }
                    else {
                        newData[index].total_price = '自动计算';
                    }
                    _this.setState({
                        dataSource: __spreadArray([], newData, true),
                    });
                    var newarr1 = __spreadArray([], _this.state.dataSource, true);
                    var newarr2 = [];
                    newarr2 = newarr1.filter(function (item) {
                        if (item.total_price) {
                            return item;
                        }
                    });
                    newarr2 = newarr2.map(function (item) {
                        return item.total_price;
                    });
                    _this.setState({
                        Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
                    });
                }
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
            timeChange: function (record, index, name, date, dateString) {
                var newData = __spreadArray([], _this.state.dataSource, true);
                newData[index][name] = dateString;
                console.log(record, index, name, date, dateString, newData);
                if (record.plan_in_riqi && record.plan_out_riqi) {
                    var timenum = _this.getDaysBetween(record.plan_in_riqi, record.plan_out_riqi);
                    if (timenum === 0) {
                        notification.open({
                            message: '请先选择正确的日期',
                        });
                    }
                    else {
                        _this.setState({ datenum: timenum });
                    }
                    _this.setState({
                        timenum: timenum,
                        dataSource: newData,
                    });
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
        var bizAlias = 'TestMain';
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
            console.log('发起页：fieldDidUpdate');
            var editData = {
                hanmoney: 0,
                detailedData: [], //物资明细
            };
            if (this.state.Inputmoney1) {
                editData.hanmoney = Number(this.state.Inputmoney1);
            }
            editData.detailedData = this.state.dataSource;
            // 打印数据
            var newlistdata = this.state.dataSource;
            var str0 = '设备名称  单位  规格型号  维保内容  工时数  人工合价  材料合价  小计';
            var str1 = '\n' + '合计(元):' + this.state.Inputmoney1;
            for (var i = 0; i < newlistdata.length; i++) {
                str0 +=
                    '\n' +
                        newlistdata[i].name +
                        '  ' +
                        newlistdata[i].unit +
                        '  ' +
                        newlistdata[i].size +
                        '  ' +
                        newlistdata[i].content +
                        '  ' +
                        newlistdata[i].hours +
                        '  ' +
                        newlistdata[i].person_total +
                        '  ' +
                        newlistdata[i].material_total +
                        '  ' +
                        newlistdata[i].total_price;
            }
            var str = str0 + str1;
            var form = this.props.form;
            form.setFieldValue('TestMain', str);
            form.setFieldExtendValue('TestMain', editData);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestMain');
        var label = form.getFieldProp('TestMain', 'label');
        var required = form.getFieldProp('TestMain', 'required');
        var _a = this.state, dataSource = _a.dataSource, selectedRowKeys = _a.selectedRowKeys;
        var deColumns = [
            {
                title: '设备名称',
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
                title: '维保内容',
                dataIndex: 'content',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.content },
                    React.createElement("span", null, record.content))); },
            },
            {
                title: '工时数',
                dataIndex: 'hours',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.hours },
                    React.createElement("span", null, record.hours))); },
            },
            {
                title: '人工合价(元)',
                dataIndex: 'person_total',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.person_total },
                    React.createElement("span", null, record.person_total))); },
            },
            {
                title: '材料合价(元)',
                dataIndex: 'material_total',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.material_total },
                    React.createElement("span", null, record.material_total))); },
            },
            {
                title: '小计(元)',
                dataIndex: 'total_price',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.total_price },
                    React.createElement("span", null, record.total_price))); },
            },
        ];
        var etColumns = [
            {
                title: '设备名称',
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
                title: '维保内容',
                dataIndex: 'content',
                render: function (_, record) {
                    return (React.createElement(Input, { value: record.content, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                            record.content = e.target.value;
                        } }));
                },
            },
            {
                title: '工时数',
                dataIndex: 'hours',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.hours },
                    React.createElement("span", null, record.hours))); },
            },
            {
                title: '人工合价(元)',
                dataIndex: 'person_total',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.person_total },
                    React.createElement("span", null, record.person_total))); },
            },
            {
                title: '材料合价(元)',
                dataIndex: 'material_total',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.material_total },
                    React.createElement("span", null, record.material_total))); },
            },
            {
                title: '小计(元)',
                dataIndex: 'total_price',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.total_price },
                    React.createElement("span", null, record.total_price))); },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: function (_, record) {
                    return _this_1.state.dataSource.length >= 1 ? (React.createElement(Popconfirm, { title: "\u786E\u5B9A\u5220\u9664?", cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", onConfirm: function () { return _this_1.methods().handleRowDelete(record); } },
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
            var _b = value ? value : {}, _c = _b.hanmoney, hanmoney = _c === void 0 ? 0 : _c, _d = _b.detailedData, detailedData = _d === void 0 ? [] : _d;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", null,
                    React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: value instanceof Array ? value : detailedData, columns: deColumns, pagination: false })),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u5408\u8BA1(\u5143)"),
                React.createElement("div", null, hanmoney ? Number(hanmoney).toFixed(2) : '')));
        }
        return (React.createElement("div", { className: "TestMainField_class" },
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
                    React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: dataSource, columns: columns, pagination: false }),
                    React.createElement("div", { style: {
                            display: 'flex',
                            marginTop: '16px',
                            marginBottom: '16px',
                        } },
                        React.createElement(Button, { style: { marginRight: '16px' }, onClick: this.methods().handleDetailAdd, type: "primary" }, "\u6DFB\u52A0\u660E\u7EC6"),
                        React.createElement(ImportDialog, { columns: columns, binding: this, setTableData: this.methods().handleSetTableData, bizAlias: "TestMain" })),
                    React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u5408\u8BA1(\u5143)"),
                    React.createElement("div", null,
                        React.createElement(Input, { readOnly: true, value: this.state.Inputmoney1, placeholder: "\u81EA\u52A8\u8BA1\u7B97" }))),
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
};
export default FormField;
