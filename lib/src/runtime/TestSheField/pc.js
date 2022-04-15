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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
// export default Fo,rmField;
import { Pagination } from 'antd';
import { Tree } from 'antd';
import { Layout } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
var Sider = Layout.Sider, Content = Layout.Content;
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Tooltip, Modal, Input, InputNumber, Button, Popconfirm, Form, } from 'antd';
var Search = Input.Search;
import './pc.less';
import { fpAdd } from '../../utils/fpOperations';
var mycolumns = [
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
var EditableContext = React.createContext(null);
var EditableRow = function (_a) {
    var index = _a.index, props = __rest(_a, ["index"]);
    var form = Form.useForm()[0];
    return (React.createElement(Form, { form: form, component: false },
        React.createElement(EditableContext.Provider, { value: form },
            React.createElement("tr", __assign({}, props)))));
};
var EditableCell = function (_a) {
    var title = _a.title, editable = _a.editable, children = _a.children, dataIndex = _a.dataIndex, record = _a.record, handleSave = _a.handleSave, handleChange = _a.handleChange, restProps = __rest(_a, ["title", "editable", "children", "dataIndex", "record", "handleSave", "handleChange"]);
    var _b = useState(false), editing = _b[0], setEditing = _b[1];
    // const inputRef = useRef(null);
    var inputRef = useRef(null);
    var form = useContext(EditableContext);
    useEffect(function () {
        if (editing) {
            //   inputRef.current!.change();
            inputRef.current.focus();
        }
    }, [editing]);
    var toggleEdit = function () {
        var _a;
        setEditing(!editing);
        form.setFieldsValue((_a = {}, _a[dataIndex] = record[dataIndex], _a));
    };
    var save = function () { return __awaiter(void 0, void 0, void 0, function () {
        var values, errInfo_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, form.validateFields()];
                case 1:
                    values = _a.sent();
                    toggleEdit(); //onchange事件 输入一次失去焦点
                    handleSave(__assign(__assign({}, record), values));
                    return [3 /*break*/, 3];
                case 2:
                    errInfo_1 = _a.sent();
                    console.log('11Save failed:', errInfo_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //   const focusSave = () => {
    //     handleChange({ ...record });
    //   };
    var childNode = children;
    if (editable) {
        childNode = editing ? (React.createElement(Form.Item, { style: { margin: 0 }, name: dataIndex },
            React.createElement(InputNumber, { className: "editable-cell-value-input", ref: inputRef, onPressEnter: save, onBlur: save, min: 0, step: "0.01", placeholder: "\u8BF7\u8F93\u5165" }))) : (React.createElement("div", { className: "editable-cell-value-wrap", style: { paddingRight: 24 }, onClick: toggleEdit }, children));
        // childNode = (
        //   <Form.Item
        //     style={{ margin: 0 }}
        //     name={dataIndex}
        //     rules={[
        //       {
        //         required: true,
        //         message: `${title} 不能为空`,
        //       },
        //     ]}
        //   >
        //     <InputNumber
        //       ref={inputRef}
        //       onChange={save}
        //       onBlur={save}
        //       placeholder="请输入"
        //     />
        //   </Form.Item>
        // );
    }
    return React.createElement("td", __assign({}, restProps), childNode);
};
/**
 * 自定义控件运行态 PC 视图
 */
var FormField = {
    getInitialState: function () {
        return {
            Inputmoney2: '',
            Inputmoney1: '',
            current_page: '',
            total2: '',
            allData: {
                type: '0',
                number: '10',
                page: '1',
                name: '',
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
            //   dataSource: [],
            dataSource: [],
            count: 1,
            currentEditId: 0,
            currentSelectData: [],
            selectedRowKeys: [],
        };
    },
    /** 控件首次渲染完成之后 */
    fieldDidMount: function () {
        // const newdate = this.state.allData;
        // this.asyncSetFieldProps(newdate);
    },
    onSearch: function (value) {
        console.log(value);
        var newvalue = this.state.allData;
        newvalue.name = value;
        newvalue.type = 0;
        newvalue.page = 1;
        this.setState({
            allData: newvalue,
        });
        this.asyncSetFieldProps(newvalue);
    },
    onChangepage: function (page) {
        var newpage = this.state.allData;
        newpage.page = page;
        console.log(newpage);
        this.setState({
            allData: newpage,
        });
        this.asyncSetFieldProps(newpage);
        // this.getData(page);
        // this.setState({
        //   loading: true,
        // });
    },
    handleChange: function (row) {
        // const inputRef = useRef<HTMLInputElement>(null);
        // const { form } = this.props;
        // form.setFieldValue('TestShe', e.target.value);
        // document.getElementsByClassName('ptID').blur();
        // inputRef.current!.focus();
        this.setState({ currentEditId: row.key });
        // this.setState({ isModalVisible: true });
    },
    handleCancel: function () {
        this.setState({ isModalVisible: false });
        this.setState({ selectedRowKeys: [] });
    },
    handleDelete: function (row) {
        var dataSource = __spreadArray([], this.state.dataSource, true);
        console.log(row);
        if (row.tax_money) {
            var newvalue = this.state.Inputmoney1;
            this.setState({
                Inputmoney1: (newvalue - row.tax_money).toFixed(2),
            });
            console.log('ssks');
        }
        if (row.notax_money) {
            var newvalue2 = this.state.Inputmoney2;
            this.setState({
                Inputmoney2: (newvalue2 - row.notax_money).toFixed(2),
            });
            console.log('ssks');
        }
        this.setState({
            dataSource: dataSource.filter(function (item) { return item.id !== row.id; }),
        });
    },
    iconClick: function () {
        this.setState({ Inputmoney1: '' });
        console.log('测试点击');
    },
    handleAdd: function () {
        // const { count, dataSource } = this.state;
        // const newData: DataType = {
        //   key: count,
        //   name: '请选择物资',
        //   age: '',
        //   address: '',
        // };
        // this.setState({
        //   dataSource: [...dataSource, newData],
        //   count: count + 1,
        // });
        // const { form } = this.props;
        // const Pro_name = form.getFieldValue('Autopro');
        // if (!Pro_name) {
        //   return notification.open({
        //     message: '请先选择项目',
        //   });
        // }
        var newdate = this.state.allData;
        this.asyncSetFieldProps(newdate);
        this.setState({
            isModalVisible: true,
        });
    },
    handleSave: function (row) {
        var form = this.props.form;
        var newData = __spreadArray([], this.state.dataSource, true);
        var index = newData.findIndex(function (item) { return row.id === item.id; });
        var item = newData[index];
        newData.splice(index, 1, __assign(__assign({}, item), row));
        if (row.pur_price) {
            newData[index].tax_money = row.pur_quantity * row.pur_price;
        }
        this.setState({
            dataSource: newData,
        });
        // console.log('sss', newarr2);
        console.log(newData);
        // 含税金额合计;
        var newarr1 = __spreadArray([], this.state.dataSource, true);
        var newarr2 = [];
        newarr2 = newarr1.filter(function (item) {
            if (item.tax_money) {
                return item;
            }
        });
        newarr2 = newarr2.map(function (item) {
            return item.tax_money;
        });
        this.setState({
            Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
        });
        // 不含税金额合计;
        var newarr3 = __spreadArray([], this.state.dataSource, true);
        var newarr4 = [];
        newarr4 = newarr3.filter(function (item) {
            if (item.notax_money) {
                return item;
            }
        });
        newarr4 = newarr4.map(function (item) {
            return item.notax_money;
        });
        this.setState({
            Inputmoney2: newarr4.reduce(fpAdd, 0).toFixed(2),
        });
        // if (this.state.Inputmoney2) {
        //   console.log('saadasdasdas', this.state.Inputmoney2);
        //   form.setFieldValue('TestShe', newData);
        //   form.setFieldExtendValue('TestShe', {
        //     data: newData,
        //   });
        // }
        // this.setState({ dataSource: newData, isModalVisible: false }, () => {
        //   form.setFieldValue('TestShe', newData);
        //   form.setFieldExtendValue('TestShe', {
        //     data: newData,
        //   });
        // });
        console.log('sss', eval(newarr3.join('+')).toFixed(2));
    },
    //   handleSave(row: DataType) {
    //     const newData = [...this.state.dataSource];
    //     const index = newData.findIndex(item => row.id === item.id);
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //       ...item,
    //       ...row,
    //     });
    //     console.log(newData);
    //     console.log(index);
    //     console.log(item);
    //     if (row.num2) {
    //       newData[index].num3 = row.num1 * row.num2;
    //     }
    //     this.setState({ dataSource: newData });
    //     },
    asyncSetFieldProps: function (vlauedata) {
        var _this = this;
        var _a = this.props, form = _a.form, spi = _a.spi;
        var TestSheField = form.getFieldInstance('TestShe');
        // const leaveReasonField = form.getFieldInstance('leaveReason');
        var key = TestSheField.getProp('id');
        // const value = TestShefield.getExtendValue();
        var value = '1';
        // const extendValue = TestSheField.getExtendValue();
        var bizAsyncData = [
            {
                key: key,
                bizAlias: 'TestShe',
                extendValue: vlauedata,
                value: value,
            },
        ];
        // 入参和返回参考套件数据刷新集成接口文档
        spi
            .refreshData({
            modifiedBizAlias: ['TestShe'],
            bizAsyncData: bizAsyncData,
        })
            .then(function (res) {
            var newarr;
            //   表格数据
            try {
                newarr = JSON.parse(res.dataList[0].value).data;
            }
            catch (e) { }
            _this.setState({
                listData: __spreadArray([], newarr, true),
                current_page: JSON.parse(res.dataList[0].value).page,
                total2: JSON.parse(res.dataList[0].value).count,
            });
            //   树状图数据
            var newtarr = JSON.parse(res.dataList[0].extendValue);
            var newtarr1 = [
                {
                    title: '物资类型',
                    key: '0',
                    children: newtarr,
                },
            ];
            _this.setState({
                treeData: __spreadArray([], newtarr1, true),
            });
            // console.log(JSON.parse(newarr));
            // console.log(this.state.listData);
        });
    },
    rowClick: function (record, rowkey) {
        var _this = this;
        var form = this.props.form;
        var newData = __spreadArray([], this.state.dataSource, true);
        var index = newData.findIndex(function (item) { return _this.state.currentEditId === item.key; });
        var currentKey = newData[index].key;
        newData[index] = record;
        newData[index].key = currentKey;
        // this.setState({ dataSource: newData });
        // this.setState({ isModalVisible: false });
        this.setState({ dataSource: newData, isModalVisible: false }, function () {
            form.setFieldValue('TestShe', record);
            form.setFieldExtendValue('TestShe', record);
        });
    },
    handleOk: function () {
        // const newData = [...this.state.dataSource];
        // const cData = [...this.state.currentSelectData];
        // let lData = [];
        // if (cData.length > 0) {
        //   cData.forEach(element => {
        //     newData.push(element);
        //   });
        // }
        // lData = this.unique(newData);
        // console.log('pp+' + JSON.stringify(lData));
        // this.setState({ Inputmoney1: lData });
        this.setState({ isModalVisible: false });
        this.setState({ selectedRowKeys: [] });
    },
    dupRemoval: function (arr) {
        //arr是传入的数组
        var nn = __spreadArray([], arr, true);
        var obj = {};
        var peon = nn.reduce(function (cur, next) {
            //根据 属性scac + 属性disPlayName 判断去重
            obj[next.name + next.unit + next.size]
                ? ''
                : (obj[next.name + next.unit + next.size] = true && cur.push(next));
            return cur;
        }, []); //设置cur默认类型为数组，并且初始值为空的数组
        console.log(peon);
        return peon;
    },
    unique: function (arr) {
        var res = new Map();
        return arr.filter(function (arr) { return !res.has(arr.id) && res.set(arr.id, 1); });
    },
    fieldDidUpdate: function () {
        if (!this.props.runtimeProps.viewMode) {
            console.log('发起页：fieldDidUpdate');
            var form = this.props.form;
            form.setFieldValue('TestShe', this.state.Inputmoney1);
            form.setFieldExtendValue('TestShe', this.state.Inputmoney1);
        }
        // this.state.dataSource;
        // this.state.Inputmoney1;
        // this.state.Inputmoney2;
    },
    fieldRender: function () {
        var _this = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestShe');
        var label = form.getFieldProp('TestShe', 'label');
        var placeholder = form.getFieldProp('TestShe', 'placeholder');
        var required = form.getFieldProp('TestShe', 'required');
        var _a = this.state, dataSource = _a.dataSource, selectedRowKeys = _a.selectedRowKeys;
        // const treeData = [
        //   {
        //     title: 'parent 0',
        //     key: '0-0',
        //     children: [
        //       { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
        //       { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        //     ],
        //   },
        //   {
        //     title: 'parent 1',
        //     key: '0-1',
        //     children: [
        //       { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
        //       { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        //     ],
        //   },
        // ];
        var deColumns = [
            {
                title: '物资名称',
                dataIndex: 'name',
            },
            {
                title: '规格型号',
                dataIndex: 'size',
            },
            {
                title: '单位',
                dataIndex: 'unit',
            },
            {
                title: '采购数量',
                dataIndex: 'pur_quantity',
            },
            {
                title: '含税单价',
                dataIndex: 'pur_price',
            },
            {
                title: '税率(%)',
                dataIndex: 'tax_rate',
            },
            {
                title: '税额',
                dataIndex: 'extend_two',
            },
            {
                title: '含税金额',
                dataIndex: 'tax_money',
            },
            {
                title: '不含税金额',
                dataIndex: 'notax_money',
            },
        ];
        var etColumns = [
            {
                title: '物资名称',
                dataIndex: 'name',
            },
            {
                title: '规格型号',
                dataIndex: 'size',
            },
            {
                title: '单位',
                dataIndex: 'unit',
            },
            {
                title: '采购数量',
                dataIndex: 'pur_quantity',
                editable: true,
            },
            {
                title: '含税单价',
                dataIndex: 'pur_price',
                editable: true,
            },
            {
                title: '税率(%)',
                dataIndex: 'tax_rate',
                editable: true,
            },
            {
                title: '税额',
                dataIndex: 'extend_two',
            },
            {
                title: '含税金额',
                dataIndex: 'tax_money',
            },
            {
                title: '不含税金额',
                dataIndex: 'notax_money',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: function (_, record) {
                    return _this.state.dataSource.length >= 1 ? (React.createElement(Popconfirm, { title: "\u786E\u5B9A\u5220\u9664?", cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", onConfirm: function () { return _this.handleDelete(record); } },
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
                    handleSave: _this.handleSave,
                    handleChange: _this.handleChange,
                }); } });
        });
        var onSelect = function (keys, info) {
            console.log('Trigger Select', keys, info);
            var treedata = { type: keys[0], number: '10', page: '1' };
            _this.setState({
                allData: treedata,
            });
            _this.asyncSetFieldProps(treedata);
        };
        var onExpand = function () {
            console.log('Trigger Expand');
        };
        var rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: function (selectedRowKeys, selectedRows) {
                console.log("selectedRowKeys: ".concat(selectedRowKeys), 'selectedRows: ', selectedRows);
                var newData = __spreadArray([], selectedRows, true);
                if (newData.length > 0) {
                    newData = newData.map(function (item) {
                        return Object.assign(item, {
                            num: 1,
                        });
                    });
                }
                console.log('======' + JSON.stringify(newData));
                _this.setState({
                    currentSelectData: newData,
                    Inputmoney1: selectedRows[0].name +
                        '/' +
                        selectedRows[0].size +
                        '/' +
                        selectedRows[0].unit,
                });
                _this.setState({ selectedRowKeys: selectedRowKeys });
            },
        };
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } },
                    " ",
                    value)));
        }
        return (React.createElement("div", { className: "TestSheField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                    required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                    label),
                React.createElement("div", null,
                    React.createElement(Input, { onClick: this.handleAdd, readOnly: true, value: this.state.Inputmoney1, placeholder: "\u8BF7\u9009\u62E9", suffix: React.createElement(CloseCircleOutlined, { onClick: this.iconClick, style: { color: 'rgba(0,0,0,.45)' } }) })),
                React.createElement(Modal, { className: "isvzhukuaizkgl", title: "\u9009\u62E9\u7269\u54C11", width: 1000, visible: this.state.isModalVisible, footer: [
                        React.createElement(Button, { key: "back", onClick: this.handleCancel }, "\u8FD4\u56DE"),
                        React.createElement(Button, { key: "submit", type: "primary", loading: this.state.loading, onClick: this.handleOk }, "\u786E\u5B9A"),
                    ], onCancel: this.handleCancel },
                    React.createElement(Layout, null,
                        React.createElement(Sider, { className: "newside_new" },
                            React.createElement(Tree, { defaultExpandedKeys: ['0'], blockNode: true, onSelect: onSelect, onExpand: onExpand, treeData: this.state.treeData })),
                        React.createElement(Content, null,
                            React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165", allowClear: true, enterButton: "\u641C\u7D22", size: "large", onSearch: this.onSearch }),
                            React.createElement(Table, { scroll: { y: '255px' }, rowSelection: __assign({ type: 'radio' }, rowSelection), rowKey: function (record) { return record.id; }, columns: mycolumns, dataSource: this.state.listData, loading: this.state.loading, pagination: false }),
                            React.createElement(Pagination, { showSizeChanger: false, defaultCurrent: 1, total: this.state.total2, hideOnSinglePage: true, className: "pagination", onChange: this.onChangepage })))))));
    },
};
export default FormField;
