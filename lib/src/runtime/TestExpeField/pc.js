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
import { notification, Table, Tooltip, Button, Popconfirm, Select, InputNumber, Cascader, } from 'antd';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { fpAdd } from '../../utils/fpOperations';
import _ from 'lodash';
import { parsePrintString } from '../../utils/printStringParser';
import { expeColumns } from '../../printColumns/TestExpeField';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var throttled = _.throttle(notification.open, 5000);
var FormField = {
    getInitialState: function () {
        return {
            newopin: [],
            maxnum: 0,
            Optionlist: [],
            petty_sele: '否',
            Numbervalue1: 0,
            Numbervalue2: 0,
            Numbervalue3: 0,
            Numbervalue4: 0,
            Numbervalue5: 0,
            isShow: false,
            value: undefined,
            msgdata: '',
            newOptine: [],
            visibleModal: false,
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
            dataSource: [],
            count: 0,
            currentEditId: 0,
            currentSelectData: [],
            selectedRowKeys: [],
        };
    },
    methods: function () {
        var _this = this;
        return {
            SelectChange: function (value, record) {
                console.log('select value', value);
                // const values = value.split(',');
                // record.ke_name = values[values.length - 1] || '';
                record.ke_name = value;
                var newData = __spreadArray([], _this.state.dataSource, true);
                var index = newData.findIndex(function (item) { return record.key === item.key; });
                var item = newData[index];
                newData.splice(index, 1, __assign(__assign({}, item), record));
                _this.setState({
                    dataSource: newData,
                });
                console.log(value, record);
            },
            onMouseEnter: function () {
                var form = _this.props.form;
                var Pro_name = form.getFieldValue('Autopro');
                if (!Pro_name) {
                    return notification.open({
                        duration: 2,
                        message: '请先选择项目',
                    });
                }
                var newopin = [
                    { name: '是', id: '1' },
                    { name: '否', id: '2' },
                ];
                _this.setState({
                    newopin: newopin,
                });
            },
            handleChange: function (value) {
                console.log("selected ".concat(value));
                if (value === '1') {
                    _this.setState({
                        isShow: true,
                        petty_sele: '是',
                    });
                    var newdate = _this.state.allData;
                    newdate.rk_id = ['是'];
                    _this.asyncSetFieldProps(newdate, '11');
                }
                else {
                    _this.setState({
                        isShow: false,
                        petty_sele: '否',
                    });
                }
            },
            handleDelete: function (row) {
                var dataSource = __spreadArray([], _this.state.dataSource, true);
                console.log(row);
                _this.setState({
                    dataSource: dataSource.filter(function (item) { return item.key !== row.key; }),
                });
                if (row.money) {
                    var newvalue = _this.state.Inputmoney1;
                    _this.setState({
                        Inputmoney1: (newvalue - row.money).toFixed(2),
                    });
                }
            },
            handleAdd: function () {
                var newdate = _this.state.allData;
                newdate.rk_id = ['a'];
                _this.asyncSetFieldProps(newdate, '12');
                var _a = _this.state, count = _a.count, dataSource = _a.dataSource;
                var newData = {
                    key: count,
                    ke_name: '',
                    money: '',
                    remarks: '',
                };
                _this.setState({
                    dataSource: __spreadArray(__spreadArray([], dataSource, true), [newData], false),
                    count: count + 1,
                });
            },
            handleSave: function (row) {
                console.log('表格数据：', row);
                var newData = __spreadArray([], _this.state.dataSource, true);
                var index = newData.findIndex(function (item) { return row.key === item.key; });
                var item = newData[index];
                newData.splice(index, 1, __assign(__assign({}, item), row));
                _this.setState({
                    dataSource: newData,
                });
                console.log(newData);
                var newarr1 = __spreadArray([], _this.state.dataSource, true);
                var newarr2 = [];
                newarr2 = newarr1.filter(function (item) {
                    if (item.money) {
                        return item;
                    }
                });
                newarr2 = newarr2.map(function (item) {
                    return item.money;
                });
                var joindata = newarr2.reduce(fpAdd, 0).toFixed(2);
                _this.setState({
                    Inputmoney1: joindata,
                });
            },
            ResetClick: function () {
                _this.setState({
                    dataSource: [],
                });
            },
            onNumbervalue2Change: function (val) {
                console.log(val);
                var number1 = _this.state.maxnum;
                var number2 = _this.state.Inputmoney1; // 报销费用合计
                if (number2 <= 0) {
                    _this.setState({
                        Numbervalue2: 0,
                        Numbervalue5: 0,
                    });
                    return 0;
                }
                if (number1 > number2) {
                    if (val > _this.state.Inputmoney1) {
                        var aa = _this.state.Inputmoney1;
                        var bb = Number(aa) - Number(_this.state.maxnum);
                        _this.setState({
                            Numbervalue2: _this.state.Inputmoney1,
                            Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                        });
                    }
                    else {
                        var aa = _this.state.Inputmoney1;
                        var bb = aa - val;
                        _this.setState({
                            Numbervalue2: val.toFixed(2),
                            Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                        });
                    }
                }
                else {
                    if (val > _this.state.maxnum) {
                        var aa = _this.state.Inputmoney1;
                        var bb = Number(aa) - Number(_this.state.maxnum);
                        throttled({
                            duration: 2,
                            message: '超过最大抵扣限额！',
                        });
                        _this.setState({
                            Numbervalue2: _this.state.maxnum.toFixed(2),
                            Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                        });
                    }
                    else {
                        var aa = _this.state.Inputmoney1;
                        var bb = Number(aa) - Number(val);
                        _this.setState({
                            Numbervalue2: val.toFixed(2),
                            Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                        });
                    }
                }
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
        lData = __spreadArray([], uniqueArrayByKey(newData, ['id']), true);
        console.log('pp+' + JSON.stringify(lData));
        this.setState({ dataSource: lData });
        this.setState({ isModalVisible: false });
        this.setState({ selectedRowKeys: [] });
    },
    handleCancel: function () {
        this.setState({ isModalVisible: false, selectedRowKeys: [] });
    },
    asyncSetFieldProps: function (data, type) {
        var _this = this;
        var bizAlias = 'TestExpe';
        var promise = asyncSetProps(_this, data, bizAlias);
        promise
            .then(function (res) {
            switch (type) {
                case '11':
                    _this.setState({
                        Numbervalue1: Number(res.dataArray.sy),
                        Numbervalue3: Number(res.dataArray.fybx_dk_spz),
                        Numbervalue4: Number(res.dataArray.re_money_spz),
                        maxnum: Number(res.dataArray.sy) -
                            Number(res.dataArray.fybx_dk_spz) -
                            Number(res.dataArray.re_money_spz),
                    });
                    break;
                case '12':
                    _this.setState({
                        Optionlist: res.dataArray,
                    });
                    break;
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
                detailedData: [],
                petty_sele: '',
                Numbervalue1: '',
                Numbervalue2: '',
                Numbervalue3: '',
                Numbervalue4: '',
                Numbervalue5: '', //财务应支付金额
            };
            if (this.state.Inputmoney1) {
                editData.hanmoney = Number(this.state.Inputmoney1 ? this.state.Inputmoney1 : 0);
            }
            if (this.state.Inputmoney2) {
                editData.nomoney = Number(this.state.Inputmoney2 ? this.state.Inputmoney2 : 0);
            }
            editData.detailedData = this.state.dataSource;
            editData.petty_sele = this.state.petty_sele;
            console.log('12122121212', editData);
            if (editData.petty_sele === '是') {
                editData.Numbervalue1 = this.state.Numbervalue1
                    ? this.state.Numbervalue1
                    : 0;
                editData.Numbervalue2 = this.state.Numbervalue2
                    ? this.state.Numbervalue2
                    : 0;
                editData.Numbervalue3 = this.state.Numbervalue3
                    ? this.state.Numbervalue3
                    : 0;
                editData.Numbervalue4 = this.state.Numbervalue4
                    ? this.state.Numbervalue4
                    : 0;
                editData.Numbervalue5 = this.state.Numbervalue5
                    ? this.state.Numbervalue5
                    : 0;
            }
            else {
                editData.Numbervalue1 = '';
                editData.Numbervalue2 = '';
                editData.Numbervalue3 = '';
                editData.Numbervalue4 = '';
                editData.Numbervalue5 = '';
            }
            // 打印数据
            var newlistdata = this.state.dataSource;
            var str1 = "\u62A5\u9500\u5408\u8BA1\uFF1A".concat(editData.hanmoney, " \n \u5907\u7528\u91D1\u4F59\u989D\uFF1A").concat(editData.Numbervalue1, " \n \u5BA1\u6279\u4E2D\u7684\u8D39\u7528\u62A5\u9500\u62B5\u6263\uFF1A").concat(editData.Numbervalue3, " \n \u5BA1\u6279\u4E2D\u7684\u5F52\u8FD8\uFF1A").concat(editData.Numbervalue4, " \n \u672C\u6B21\u62B5\u6263\u91D1\u989D\uFF1A").concat(editData.Numbervalue4, " \n \u8D22\u52A1\u5E94\u652F\u4ED8\u91D1\u989D\uFF1A").concat(editData.Numbervalue5, " \n");
            var str = parsePrintString(newlistdata, expeColumns, str1);
            console.log(str);
            var form = this.props.form;
            form.setFieldValue('TestExpe', str);
            form.setFieldExtendValue('TestExpe', editData);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestExpe');
        var label = form.getFieldProp('TestExpe', 'label');
        var required = form.getFieldProp('TestExpe', 'required');
        var dataSource = this.state.dataSource;
        var deColumns = [
            {
                title: '费用科目',
                dataIndex: 'ke_name',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.ke_name },
                    React.createElement("span", null, record.ke_name))); },
            },
            {
                title: '金额',
                dataIndex: 'money',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.money },
                    React.createElement("span", null, record.money))); },
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.remarks },
                    React.createElement("span", null, record.remarks))); },
            },
        ];
        var etColumns = [
            {
                title: '费用科目',
                dataIndex: 'ke_name',
                render: function (text, record) { return (React.createElement(Cascader, { options: _this_1.state.Optionlist, onChange: function (value) { return _this_1.methods().SelectChange(value, record); }, placeholder: "\u8BF7\u9009\u62E9", className: "fullLength" })); },
            },
            {
                title: '金额',
                dataIndex: 'money',
                editable: true,
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.money },
                    React.createElement("span", null, record.money))); },
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                editable: true,
                isNumber: false,
                render: function (remark, record) {
                    return (
                    // <Input
                    //   value={record.remarks}
                    //   placeholder="请输入"
                    //   onChange={e => {
                    //     console.log('INPUT VALUE', e.target.value);
                    //     const startTime = performance.now();
                    //     record.remarks = e.target.value;
                    //     const endTime = performance.now();
                    //     console.log('TIME TO SET STATE', endTime - startTime);
                    //   }}
                    // />
                    React.createElement(Tooltip, { placement: "topLeft", title: record.remarks },
                        React.createElement("span", null, record.remarks)));
                },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: function (_, record) {
                    return _this_1.state.dataSource.length >= 1 ? (React.createElement(Popconfirm, { title: "\u786E\u5B9A\u5220\u9664?", cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", onConfirm: function () { return _this_1.methods().handleDelete(record); } },
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
                    isNumber: col.isNumber,
                    title: col.title,
                    handleSave: _this_1.methods().handleSave,
                    handleChange: _this_1.methods().handleChange,
                }); } });
        });
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue();
            // if (!value.detailedData) {
            //   value = field.getValue();
            // }
            var _a = value ? value : {}, _b = _a.hanmoney, hanmoney = _b === void 0 ? 0 : _b, _c = _a.detailedData, detailedData = _c === void 0 ? [] : _c, _d = _a.petty_sele, petty_sele = _d === void 0 ? '' : _d, _e = _a.Numbervalue1, Numbervalue1 = _e === void 0 ? '' : _e, _f = _a.Numbervalue2, Numbervalue2 = _f === void 0 ? '' : _f, _g = _a.Numbervalue3, Numbervalue3 = _g === void 0 ? '' : _g, _h = _a.Numbervalue4, Numbervalue4 = _h === void 0 ? '' : _h, _j = _a.Numbervalue5, Numbervalue5 = _j === void 0 ? '' : _j;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u62A5\u9500\u5408\u8BA1"),
                React.createElement("div", { style: { marginTop: '10px' } }, hanmoney ? Number(hanmoney).toFixed(2) : 0),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u62A5\u9500\u660E\u7EC6"),
                React.createElement("div", null,
                    React.createElement(Table, { scroll: { x: '1000px' }, components: components, rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: value instanceof Array ? value : detailedData, columns: deColumns, pagination: false })),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5907\u7528\u91D1\u62B5\u6263"),
                React.createElement("div", { style: { marginTop: '10px' } }, petty_sele),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5907\u7528\u91D1\u4F59\u989D"),
                React.createElement("div", { style: { marginTop: '10px' } }, Numbervalue1),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u672C\u6B21\u62B5\u6263\u91D1\u989D"),
                React.createElement("div", { style: { marginTop: '10px' } }, Numbervalue2),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5BA1\u6279\u4E2D\u7684\u8D39\u7528\u62A5\u9500\u62B5\u6263"),
                React.createElement("div", { style: { marginTop: '10px' } }, Numbervalue3),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5BA1\u6279\u4E2D\u7684\u5F52\u8FD8"),
                React.createElement("div", { style: { marginTop: '10px' } }, Numbervalue4),
                React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u8D22\u52A1\u5E94\u652F\u4ED8\u91D1\u989D"),
                React.createElement("div", { style: { marginTop: '10px' } }, Numbervalue5)));
        }
        return (React.createElement("div", { className: "TestExpeField_class" },
            React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { display: 'flex', justifyContent: 'space-between' } },
                    React.createElement("div", null,
                        required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                        label),
                    React.createElement("div", { style: { color: '#409EFF', cursor: 'pointer' } },
                        React.createElement(Popconfirm, { title: "\u662F\u5426\u91CD\u7F6E\uFF1F\u91CD\u7F6E\u540E\u660E\u7EC6\u8868\u683C\u5C06\u6E05\u7A7A\u3002", onConfirm: this.ResetClick, okText: "\u662F", cancelText: "\u5426" },
                            React.createElement("span", null, "\u91CD\u7F6E\u660E\u7EC6")))),
                React.createElement("div", null,
                    React.createElement(Table, { scroll: { x: '1000px' }, components: components, rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: dataSource, columns: columns, pagination: false }),
                    React.createElement(Button, { onClick: this.methods().handleAdd, type: "primary", style: { marginBottom: 16, marginTop: 16 } }, "\u6DFB\u52A0\u660E\u7EC6"),
                    React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u62A5\u9500\u5408\u8BA1"),
                    React.createElement("div", null,
                        React.createElement(InputNumber, { readOnly: true, value: this.state.Inputmoney1, placeholder: "\u62A5\u9500\u5408\u8BA1" })),
                    React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u5907\u7528\u91D1\u62B5\u6263"),
                            React.createElement(Select, { defaultValue: "\u5426", style: { width: 200 }, onFocus: this.methods().onMouseEnter, onChange: this.methods().handleChange }, this.state.newopin.map(function (item) { return (React.createElement(Select.Option, { key: item.id, value: item.id }, item.name)); })))),
                    React.createElement("div", null, this.state.isShow ? (React.createElement("div", null,
                        React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5907\u7528\u91D1\u4F59\u989D"),
                        React.createElement(InputNumber, { readOnly: true, style: { width: 200 }, min: 0, value: this.state.Numbervalue1 }),
                        React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5BA1\u6279\u4E2D\u7684\u8D39\u7528\u62A5\u9500\u62B5\u6263"),
                        React.createElement(InputNumber, { readOnly: true, style: { width: 200 }, min: 0, value: this.state.Numbervalue3 }),
                        React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u5BA1\u6279\u4E2D\u7684\u5F52\u8FD8"),
                        React.createElement(InputNumber, { readOnly: true, style: { width: 200 }, min: 0, value: this.state.Numbervalue4 }),
                        React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u672C\u6B21\u62B5\u6263\u91D1\u989D"),
                        React.createElement(InputNumber
                        //   max={this.state.maxnum}
                        , { 
                            //   max={this.state.maxnum}
                            placeholder: "\u8BF7\u8F93\u5165", style: { width: 200 }, value: this.state.Numbervalue2, onChange: this.methods().onNumbervalue2Change }),
                        React.createElement("div", { style: {
                                fontSize: '12px',
                                color: 'rgb(193,193,193)',
                                marginTop: '5px',
                            } }, "\u672C\u6B21\u62B5\u6263\u91D1\u989D\uFF0C\u4E0D\u5927\u4E8E\u62A5\u9500\u5408\u8BA1\uFF0C\u4E14\u4E0D\u5927\u4E8E\u5907\u7528\u91D1\u4F59\u989D-\u5BA1\u6279\u4E2D\u7684\u8D39\u7528\u62A5\u9500\u62B5\u6263-\u5BA1\u6279\u4E2D\u7684\u5F52\u8FD8"),
                        React.createElement("div", { style: { marginTop: '10px' }, className: "label" }, "\u8D22\u52A1\u5E94\u652F\u4ED8\u91D1\u989D"),
                        React.createElement(InputNumber, { readOnly: true, placeholder: "\u81EA\u52A8\u8BA1\u7B97", style: { width: 200 }, value: this.state.Numbervalue5 }))) : null)))));
    },
};
export default FormField;
