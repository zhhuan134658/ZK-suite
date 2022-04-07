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
//import { Tree } from 'antd';
import { Drawer, InputItem, List, SearchBar } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { handleSaveTaxTable, handleTaxTableStatistics, } from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
// import { Button } from 'antd-mobile';
import { HandledDetailDialogMobile } from '../../components/addDetail';
import { traverseAndParseTreeData, uniqueArrayByKey, } from '../../utils/normalizeUtils';
var now = new Date();
var FormField = {
    getInitialState: function () {
        return {
            deColumns: [
                {
                    title: '物资名称',
                    dataIndex: 'name',
                },
                {
                    title: '单位',
                    dataIndex: 'unit',
                },
                {
                    title: '规格型号',
                    dataIndex: 'size',
                },
                {
                    title: '需用数量',
                    dataIndex: 'det_quantity',
                },
                {
                    title: '不含税单价(元)',
                    dataIndex: 'no_unit_price',
                },
                {
                    title: '含税单价(元)',
                    dataIndex: 'unit_price',
                },
                {
                    title: '税率(%)',
                    dataIndex: 'tax_rate',
                },
                {
                    title: '税额(元)',
                    dataIndex: 'tax_amount',
                },
                {
                    title: '不含税金额(元)',
                    dataIndex: 'no_amount_tax',
                },
                {
                    title: '含税金额(元)',
                    dataIndex: 'amount_tax',
                },
            ],
            Inputmoney1: '',
            checkData: [],
            chenkdata: '',
            treevalue: undefined,
            treeData: [],
            detdate: 'a1',
            date: now,
            checkindex: '',
            SearchBarvalue: '',
            showElem: 'none',
            showElem2: 'none',
            showElem3: 'none',
            cascadeValue: [],
            cascadeData: [],
            showTypes: true,
            popUpVisible: false,
            popUpCascadeVisible: false,
            inputvalue: '',
            allData: { type: '0', number: '99999', page: '1', name: '' },
            listData: [],
            fixedColumn: '',
            materialList: [
                {
                    id: '',
                    typename: '',
                    name: '',
                    size: '',
                    unit: '',
                    det_quantity: '',
                    no_unit_price: '',
                    tax_rate: '',
                    tax_amount: '',
                    amount_tax: '',
                    no_amount_tax: '',
                },
            ],
        };
    },
    handleOk: function () {
        throw new Error('Function not implemented.');
    },
    handleCancel: function () {
        this.setState({
            showElem: 'none',
        });
    },
    methods: function () {
        var _this = this;
        return {
            getCheckData: function () {
                _this.setState({
                    dstatus: '1',
                });
                var newPage = {
                    rk_id: _this.state.detdate ? _this.state.detdate[0] : ['a'],
                    number: '10',
                    page: 1,
                    name: '',
                };
                _this.setState({
                    allData: newPage,
                });
                _this.asyncSetFieldProps(newPage, 2);
                _this.setState({
                    showElem3: 'inherit',
                });
            },
            onOpenChange: function (index) {
                console.log('0000001');
                var newData = _this.state.allData;
                newData.rk_id = ['-1'];
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    showElem: 'inherit',
                    checkindex: index,
                });
            },
            onOpenChange2: function (index) {
                console.log('0000002');
                var newData = _this.state.allData;
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    showElem2: 'inherit',
                    checkindex: index,
                });
            },
            handleClick: function (item) {
                console.log('0000003');
                var arr = _this.state.materialList;
                var arrindex = _this.state.checkindex;
                if (arr[arrindex]) {
                    arr[arrindex].name = item.name;
                    arr[arrindex].size = item.size;
                    arr[arrindex].unit = item.unit;
                }
                var lData = [];
                lData = __spreadArray([], uniqueArrayByKey(arr, ['name', 'size', 'unit']), true);
                _this.setState({
                    showElem: 'none',
                    materialList: lData,
                });
            },
            checkClick: function (item) {
                console.log('0000005');
                var cDataid = [item.id];
                var newdate = _this.state.allData;
                var dtar = '';
                if (_this.state.detdate === 'a1') {
                    dtar = '采购申请-' + item.name;
                }
                else if (_this.state.detdate === 'b1') {
                    dtar = '材料总计划-' + item.name;
                }
                console.log(cDataid);
                newdate.rk_id = __spreadArray([_this.state.detdate], cDataid, true);
                _this.asyncSetFieldProps(newdate, 1);
                _this.setState({
                    chenkdata: dtar,
                    showElem3: 'none',
                });
            },
            iconClick: function () {
                _this.setState({
                    chenkdata: '',
                    materialList: [],
                    Inputmoney1: 0,
                    Inputmoney2: 0,
                });
            },
            onSubmit: function (value) {
                console.log('0000006');
                var data = _this.state.allData;
                data.name = value;
                _this.asyncSetFieldProps(data);
            },
            onSearchBarChange: function (value) {
                console.log('0000007');
                _this.setState({
                    SearchBarvalue: value,
                });
                if (!value) {
                    var newData = _this.state.allData;
                    newData.name = value;
                    _this.asyncSetFieldProps(newData);
                }
            },
            addDetail: function () {
                var detailRow = {
                    type: '',
                    name: '',
                    size: '',
                    unit: '',
                    unit_price: 0,
                    id: '',
                    det_quantity: 0,
                    no_unit_price: 0,
                    tax_rate: 0,
                    amount_tax: 0,
                    tax_amount: 0,
                    key: '',
                    no_amount_tax: 0,
                };
                _this.setState({
                    materialList: __spreadArray(__spreadArray([], _this.state.materialList, true), [detailRow], false),
                });
            },
            deleteItem: function (index) {
                console.log('0000008');
                var list = _this.state.materialList;
                list.splice(index, 1);
                _this.setState({
                    materialList: list,
                });
                console.log('_this', list);
                handleTaxTableStatistics(_this, list);
            },
            onInputchange: function (types, index, e) {
                console.log('0000009');
                var dataArray = _this.state.materialList;
                dataArray[index][types] = e;
                var row = dataArray[index];
                var key = types;
                var data = handleSaveTaxTable(_this, dataArray, row, key);
                _this.setState({
                    materialList: __spreadArray([], data, true),
                });
                handleTaxTableStatistics(_this, data);
            },
            handleAddVisible: function (visible) {
                _this.setState({
                    popUpVisible: visible,
                });
            },
            handleCascadeVisible: function (visible) {
                _this.setState({
                    popUpCascadeVisible: visible,
                });
            },
        };
    },
    asyncSetFieldProps: function (data, type) {
        if (type === void 0) { type = 0; }
        var _this = this;
        var promise = asyncSetProps(_this, data, 'TestOrdernew');
        promise.then(function (res) {
            console.log('1234543=======', res);
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
            });
            var treeArray = [
                {
                    title: '物资类型',
                    key: '0',
                    children: __spreadArray([], res.extendArray, true),
                },
            ];
            var cascadeArray = [traverseAndParseTreeData(treeArray[0])];
            _this.setState({
                treeData: treeArray,
                cascadeData: cascadeArray,
            });
            switch (type) {
                case 1:
                    _this.setState({
                        materialList: res.dataArray,
                    });
                    handleTaxTableStatistics(_this, res.dataArray);
                    break;
                case 2:
                    _this.setState({
                        checkData: res.dataArray,
                    });
                    break;
                default:
                    break;
            }
        });
    },
    fieldDidUpdate: function () {
        if (!this.props.runtimeProps.viewMode) {
            console.log('发起页1：fieldDidUpdate');
            var editData = {
                hanmoney: 0,
                nomoney: 0,
                detailname: '',
                detailedData: [], //物资明细
            };
            if (this.state.Inputmoney1) {
                editData.hanmoney = Number(this.state.Inputmoney1);
            }
            if (this.state.Inputmoney2) {
                editData.nomoney = Number(this.state.Inputmoney2);
            }
            editData.detailname = this.state.chenkdata;
            editData.detailedData = this.state.materialList;
            var newlistdata = this.state.materialList;
            var str2 = this.state.chenkdata;
            var str0 = '\n' +
                '设备名称 单位 规格型号 数量 不含税单价 含税单价 税率 税额 不含税金额 含税金额';
            var str1 = '\n' +
                ' 不含税金额合计(元):' +
                this.state.Inputmoney2 +
                '\n' +
                '含税金额合计(元):' +
                this.state.Inputmoney1;
            for (var i = 0; i < newlistdata.length; i++) {
                str0 +=
                    '\n' +
                        newlistdata[i].name +
                        ' ' +
                        newlistdata[i].unit +
                        ' ' +
                        newlistdata[i].size +
                        ' ' +
                        newlistdata[i].det_quantity +
                        ' ' +
                        newlistdata[i].no_unit_price +
                        ' ' +
                        newlistdata[i].unit_price +
                        ' ' +
                        newlistdata[i].tax_rate +
                        ' ' +
                        newlistdata[i].tax_amount +
                        ' ' +
                        newlistdata[i].no_amount_tax +
                        ' ' +
                        newlistdata[i].amount_tax;
            }
            var str = str2 + str0 + str1;
            var form = this.props.form;
            form.setFieldValue('TestOrdernew', str);
            form.setFieldExtendValue('TestOrdernew', editData);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestOrdernew');
        var label = form.getFieldProp('TestOrdernew', 'label');
        var onSelect = function (selectedKeys, info) {
            var arr = _this_1.state.materialList;
            var newindex = _this_1.state.checkindex;
            arr[newindex].typename = info.node.title;
            _this_1.setState({ showElem2: 'none', materialList: __spreadArray([], arr, true) });
            var treedata = { type: selectedKeys[0], number: '10', page: '1' };
            _this_1.setState({
                allData: treedata,
            });
            _this_1.asyncSetFieldProps(treedata, 2);
            console.log('selected', selectedKeys, info.node.title);
        };
        var onFinish = function (values) {
            console.log('Success:', values);
            //   const [form] = Form.useForm();
            var newdate = _this_1.state.allData;
            newdate.wz_add = values;
            _this_1.asyncSetFieldProps(newdate);
            _this_1.setState({
                popUpVisible: false,
            });
        };
        var onFinishFailed = function (errorInfo) {
            console.log('Failed:', errorInfo);
        };
        // const onChangetree = value => {
        //   console.log(value);
        //   this.setState({ cascadeValue: value });
        // };
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: function (val) {
                    var _this = _this_1;
                    _this.setState({
                        showTypes: false,
                    });
                    searchBarSubmit(_this, val, 0);
                }, onChange: function (val) {
                    var _this = _this_1;
                    searchBarChange(_this, val, 0);
                    if (!val) {
                        _this.setState({
                            showTypes: true,
                        });
                    }
                }, showCancelButton: true, onCancel: function () {
                    return _this_1.setState({ showElem: 'none', SearchBarvalue: '' });
                } }),
            React.createElement(HandledDetailDialogMobile, { cascadeData: this.state.cascadeData, onFinish: onFinish, onFinishFailed: onFinishFailed, showElem: this.state.showElem }),
            React.createElement(List, null, this.state.listData.map(function (item, index) {
                return (React.createElement(List.Item, { onClick: _this_1.methods().handleClick.bind(_this_1, item), key: index, multipleLine: true },
                    item.name,
                    "/",
                    item.unit,
                    "/",
                    item.size));
            }))));
        var checkdebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: function (val) {
                    var _this = _this_1;
                    searchBarSubmit(_this, val, 2);
                }, onChange: function (val) {
                    var _this = _this_1;
                    searchBarChange(_this, val, 2);
                }, showCancelButton: true, onCancel: function () {
                    return _this_1.setState({ showElem3: 'none', SearchBarvalue: '' });
                } }),
            React.createElement("div", null,
                React.createElement(List, null, this.state.checkData.map(function (item, index) {
                    return (React.createElement(List.Item, { onClick: _this_1.methods().checkClick.bind(_this_1, item), key: index, multipleLine: true },
                        item.name,
                        "/ ",
                        item.detailed_money));
                })))));
        var treesidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.methods().onSubmit, onChange: this.methods().onSearchBarChange, onCancel: function () {
                    return _this_1.setState({ showElem2: 'none', SearchBarvalue: '' });
                }, showCancelButton: true })));
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue();
            // if (!value.detailedData) {
            //   value = field.getValue();
            // }
            var _a = value ? value : {}, _b = _a.hanmoney, hanmoney = _b === void 0 ? 0 : _b, _c = _a.nomoney, nomoney = _c === void 0 ? 0 : _c, _d = _a.detailedData, detailedData = _d === void 0 ? [] : _d;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "tablefield-mobile" },
                    React.createElement("div", { className: "tbody-row-wrap" }, detailedData.map(function (item, index) {
                        return (React.createElement("div", { key: index, className: "row" },
                            React.createElement("label", { className: "label row-label-title" },
                                label,
                                "\u660E\u7EC6(",
                                index + 1,
                                ")"),
                            _this_1.state.deColumns.map(function (itemname) {
                                if (!item[itemname.dataIndex]) {
                                    return null;
                                }
                                return (React.createElement("div", { key: itemname.dataIndex },
                                    React.createElement("div", { className: "field-wrapper" },
                                        React.createElement("div", { className: "m-field-view" },
                                            React.createElement("label", { className: "m-field-view-label" }, itemname.title),
                                            React.createElement("div", { className: "m-field-view-value" },
                                                React.createElement("span", null, item[itemname.dataIndex]))))));
                            })));
                    }))),
                React.createElement("div", null,
                    React.createElement("div", { className: "field-wrapper" },
                        React.createElement("div", { className: "m-field-view" },
                            React.createElement("label", { className: "m-field-view-label" }, "\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"),
                            React.createElement("div", { className: "m-field-view-value" },
                                React.createElement("span", null, hanmoney ? Number(hanmoney).toFixed(2) : '')))),
                    React.createElement("div", { className: "field-wrapper" },
                        React.createElement("div", { className: "m-field-view" },
                            React.createElement("label", { className: "m-field-view-label" }, "\u4E0D\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"),
                            React.createElement("div", { className: "m-field-view-value" },
                                React.createElement("span", null, nomoney ? Number(nomoney).toFixed(2) : '')))))));
        }
        return (React.createElement("div", { className: "CorpHouse_class_m" },
            React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "field-wrapper" },
                    React.createElement("div", { className: "m-group m-group-mobile" },
                        React.createElement("div", { className: "m-field-wrapper" },
                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                React.createElement("div", { className: "m-field-head" },
                                    React.createElement("div", { className: "m-field-label" },
                                        React.createElement("span", null, label))),
                                React.createElement("div", { className: "m-field-box" },
                                    React.createElement("div", { className: "m-field-content left" },
                                        React.createElement("div", { className: "input-wrapper" },
                                            React.createElement(InputItem, { editable: false, value: this.state.chenkdata, onClick: this.methods().getCheckData, placeholder: "\u8BF7\u9009\u62E9", extra: "x", onExtraClick: this.methods().iconClick })))))))),
                React.createElement("div", { className: "tablefield-mobile" },
                    React.createElement("div", { className: "table-body  tbody  " },
                        this.state.materialList.map(function (item, index) {
                            return (React.createElement("div", { key: item.id },
                                React.createElement("div", { className: "tbody-row-wrap" },
                                    React.createElement("div", { className: "tbody-row-pannel" },
                                        React.createElement("div", { className: "custom-list-title", style: {
                                                width: '100%',
                                                paddingLeft: '15px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            } },
                                            React.createElement("div", null,
                                                label,
                                                "-\u660E\u7EC6(",
                                                index + 1,
                                                ")"),
                                            _this_1.state.materialList.length > 0 ? (React.createElement("div", { className: "dele_item", onClick: _this_1.methods().deleteItem.bind(_this_1, index) }, "\u5220\u9664")) : (React.createElement("div", null))),
                                        React.createElement("div", { className: "row" },
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u7269\u8D44\u540D\u79F0"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, type: "text", className: "ant-input m-mobile-inner-input", value: item.name, placeholder: "\u8BF7\u9009\u62E9", onFocus: _this_1.methods().onOpenChange.bind(_this_1, index), onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('name', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u89C4\u683C\u578B\u53F7"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, type: "text", className: "ant-input m-mobile-inner-input", value: item.size, placeholder: "\u81EA\u52A8\u83B7\u53D6" }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u5355\u4F4D"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, type: "text", className: "ant-input m-mobile-inner-input", value: item.unit, placeholder: "\u81EA\u52A8\u83B7\u53D6" }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u6570\u91CF"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { value: item.det_quantity, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('det_quantity', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u4E0D\u542B\u7A0E\u5355\u4EF7(\u5143)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { clear: true, value: item.no_unit_price, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('no_unit_price', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u542B\u7A0E\u5355\u4EF7(\u5143)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { clear: true, value: item.unit_price, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('unit_price', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u7A0E\u7387(%)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { clear: true, value: item.tax_rate, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('tax_rate', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u7A0E\u989D(\u5143)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, clear: true, value: item.tax_amount, placeholder: "\u81EA\u52A8\u8BA1\u7B97" }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u4E0D\u542B\u7A0E\u91D1\u989D(\u5143)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, clear: true, value: item.no_amount_tax, placeholder: "\u81EA\u52A8\u8BA1\u7B97" }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u542B\u7A0E\u91D1\u989D(\u5143)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, clear: true, value: item.amount_tax, placeholder: "\u81EA\u52A8\u8BA1\u7B97" }))))))))))))));
                        }),
                        React.createElement("div", { className: "table-actions" },
                            React.createElement("div", { className: "tbody-add-button tTap", onClick: this.methods().addDetail },
                                React.createElement("img", { style: { width: '20px' }, src: "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Em46p8naW61629791119284.png", alt: "" }),
                                "\u00A0",
                                React.createElement("span", { className: "add-button-text" }, "\u589E\u52A0\u660E\u7EC6"))))),
                React.createElement("div", { className: "field-wrapper" },
                    React.createElement("div", { className: "m-group m-group-mobile" },
                        React.createElement("div", { className: "m-field-wrapper" },
                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                React.createElement("div", { className: "m-field-head" },
                                    React.createElement("div", { className: "m-field-label" },
                                        React.createElement("span", null, "\u4E0D\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"))),
                                React.createElement("div", { className: "m-field-box" },
                                    React.createElement("div", { className: "m-field-content left" },
                                        React.createElement("div", { className: "input-wrapper" },
                                            React.createElement(InputItem, { editable: false, value: this.state.Inputmoney2, placeholder: "\u81EA\u52A8\u8BA1\u7B97" })))))))),
                React.createElement("div", { className: "field-wrapper" },
                    React.createElement("div", { className: "m-group m-group-mobile" },
                        React.createElement("div", { className: "m-field-wrapper" },
                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                React.createElement("div", { className: "m-field-head" },
                                    React.createElement("div", { className: "m-field-label" },
                                        React.createElement("span", null, "\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"))),
                                React.createElement("div", { className: "m-field-box" },
                                    React.createElement("div", { className: "m-field-content left" },
                                        React.createElement("div", { className: "input-wrapper" },
                                            React.createElement(InputItem, { editable: false, value: this.state.Inputmoney1, placeholder: "\u81EA\u52A8\u8BA1\u7B97" })))))))),
                createPortal(React.createElement(Drawer, { className: "isvzhukuaiwarehousing", open: true, style: {
                        minHeight: document.documentElement.clientHeight,
                        display: this.state.showElem,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgb(255, 255, 255)',
                        position: 'fixed',
                        zIndex: 100,
                    }, enableDragHandle: true, contentStyle: {
                        color: '#A6A6A6',
                        textAlign: 'center',
                        paddingTop: 42,
                    }, sidebar: sidebar, onOpenChange: this.methods().onOpenChange }), document.getElementById('MF_APP')),
                createPortal(React.createElement(Drawer, { className: "isvzhukuaiwarehousing", open: true, style: {
                        minHeight: document.documentElement.clientHeight,
                        display: this.state.showElem2,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgb(255, 255, 255)',
                        position: 'fixed',
                        zIndex: 100,
                    }, enableDragHandle: true, contentStyle: {
                        color: '#A6A6A6',
                        textAlign: 'center',
                        paddingTop: 42,
                    }, sidebar: treesidebar, onOpenChange: this.methods().onOpenChange2 }), document.getElementById('MF_APP')),
                createPortal(React.createElement(Drawer, { className: "isvzhukuaiwarehousing", open: true, style: {
                        minHeight: document.documentElement.clientHeight,
                        display: this.state.showElem3,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgb(255, 255, 255)',
                        position: 'fixed',
                        zIndex: 100,
                    }, enableDragHandle: true, contentStyle: {
                        color: '#A6A6A6',
                        textAlign: 'center',
                        paddingTop: 42,
                    }, sidebar: checkdebar }), document.getElementById('MF_APP')))));
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
