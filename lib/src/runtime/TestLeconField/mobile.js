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
import { Drawer, InputItem, SearchBar, DatePicker, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { handleTaxTableStatistics } from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
// import { Button } from 'antd-mobile';
import { HandledDetailDialogMobile } from '../../components/addDetail';
import { parseListData, traverseAndParseTreeData, uniqueArrayByKey, } from '../../utils/normalizeUtils';
import { DetailList } from '../../components/listDetail';
import { fpAdd } from '../../utils/fpOperations';
import { FancyList } from '../../components/fancyLists';
var now = new Date();
var FormField = {
    getInitialState: function () {
        return {
            updateTreeDate: '1',
            activeKey: '',
            datadate: '',
            leftTreeDate: [],
            stateData: [],
            stateKey: [],
            datenum: 0,
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
                    title: '结算周期（始）',
                    dataIndex: 'plan_in_riqi',
                },
                {
                    title: '结算周期（终）',
                    dataIndex: 'plan_out_riqi',
                },
                {
                    title: '数量',
                    dataIndex: 'zl_number',
                },
                {
                    title: '单价(元)',
                    dataIndex: 'price',
                },
                {
                    title: '小计(元)',
                    dataIndex: 'subtotal',
                },
            ],
            Inputmoney1: '',
            checkData: [],
            chenkdata: '',
            treevalue: undefined,
            treeData: [],
            cascadeValue: [],
            cascadeData: [],
            showTypes: true,
            popUpVisible: false,
            popUpCascadeVisible: false,
            detdate: 'a1',
            date: now,
            checkindex: '',
            SearchBarvalue: '',
            showElem: 'none',
            showElem2: 'none',
            showElem3: 'none',
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
                    zl_number: '',
                    purchase_unit: '',
                    purchase_riqi: '',
                    purchase_address: '',
                    candidate_list: '',
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
            onExtraClick: function (index, typename) {
                var arr = _this.state.materialList;
                arr[index][typename] = '';
                _this.setState({ materialList: __spreadArray([], arr, true) });
            },
            checkClick: function (item) {
                console.log('0000005');
                var cDataid = [item.id];
                var newdate = _this.state.allData;
                newdate.ck_name = item.name;
                newdate.type = 0;
                newdate.page = 1;
                newdate.isHouse = '2';
                var dtar = item.name;
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
                });
            },
            ResetClick: function () {
                _this.setState({
                    Inputmoney1: 0,
                    materialList: [
                        {
                            id: '',
                            typename: '',
                            name: '',
                            size: '',
                            unit: '',
                            zl_number: '',
                            purchase_unit: '',
                            purchase_riqi: '',
                            purchase_address: '',
                            candidate_list: '',
                        },
                    ],
                });
            },
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
                    updateTreeDate: '1',
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
            upperLevel: function () {
                var stateData = _this.state.stateData;
                var stateKey = _this.state.stateKey;
                if (stateData.length > 1) {
                    stateData.pop();
                    _this.setState({
                        leftTreeDate: stateData[stateData.length - 1],
                        activeKey: stateKey[stateKey.length - 1],
                        stateData: stateData,
                    }, function () {
                        var treedata = {
                            type: stateKey[stateKey.length - 1],
                            number: '999',
                            page: '1',
                            rk_id: ['-1'],
                        };
                        _this.asyncSetFieldProps(treedata);
                        stateKey.pop();
                        _this.setState({
                            stateKey: stateKey,
                        });
                    });
                }
                console.log(stateData);
            },
            sideChange: function (key) {
                _this.setState({
                    updateTreeDate: '2',
                });
                var treedata = {
                    type: key,
                    number: '999',
                    page: '1',
                    rk_id: ['-1'],
                };
                _this.asyncSetFieldProps(treedata, 0, false);
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
                    id: '',
                    typename: '',
                    name: '',
                    size: '',
                    unit: '',
                    zl_number: '',
                    purchase_unit: '',
                    purchase_riqi: '',
                    purchase_address: '',
                    candidate_list: '',
                };
                _this.setState({
                    materialList: __spreadArray(__spreadArray([], _this.state.materialList, true), [detailRow], false),
                });
            },
            deleteItem: function (index) {
                var list = _this.state.materialList;
                if (list.length === 1) {
                    return _this.setState({
                        Inputmoney1: 0,
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
                    });
                }
                list.splice(index, 1);
                _this.setState({
                    materialList: list,
                });
                console.log('list', list);
                if (list.length > 0) {
                    var newarr2 = [];
                    newarr2 = list.filter(function (item) {
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
            onInputchange: function (types, index, e) {
                var datenum = _this.state.datenum;
                console.log(types, index, e, _this);
                var arr = _this.state.materialList;
                console.log('120', _this.state.materialList);
                var arrindex = e;
                var newindex = index;
                var newtype = types;
                if (types === 'zl_number' || types === 'price') {
                    arr[newindex][newtype] = Number(arrindex);
                }
                else {
                    arr[newindex][newtype] = arrindex;
                }
                if (arr[newindex].zl_number && arr[newindex].price) {
                    arr[newindex].subtotal = (arr[newindex].zl_number *
                        arr[newindex].price *
                        Number(datenum)).toFixed(2);
                }
                else {
                    arr[newindex].subtotal = 0;
                }
                //   合计
                var newarr2 = [];
                newarr2 = arr.filter(function (item) {
                    if (item.subtotal) {
                        return item;
                    }
                });
                newarr2 = newarr2.map(function (item) {
                    return item.subtotal;
                });
                var total = newarr2.reduce(fpAdd, 0);
                if (total) {
                    total = total.toFixed(2);
                }
                _this.setState({
                    materialList: __spreadArray([], arr, true),
                    Inputmoney1: total,
                });
                console.log('12', arr);
            },
            //   计算日期的时间差（含当天）
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
            onChangedata1: function (data, index, typename) {
                var newdata = new Date(data);
                var newindex = index;
                var datetime = newdata.getFullYear() +
                    '-' +
                    (newdata.getMonth() + 1) +
                    '-' +
                    newdata.getDate();
                var arr = _this.state.materialList;
                arr[index][typename] = datetime;
                if (arr[index].plan_in_riqi && arr[index].plan_out_riqi) {
                    var timenum = _this
                        .methods()
                        .getDaysBetween(arr[index].plan_in_riqi, arr[index].plan_out_riqi);
                    if (timenum === 0) {
                        return Toast.info('请先选择正确的日期', 1);
                        _this.setState({ datenum: timenum });
                    }
                    else {
                        if (arr[newindex].zl_number && arr[newindex].price) {
                            arr[newindex].subtotal = (arr[newindex].zl_number *
                                arr[newindex].price *
                                Number(timenum)).toFixed(2);
                        }
                        else {
                            arr[newindex].subtotal = 0;
                        }
                        _this.setState({ datenum: timenum, materialList: __spreadArray([], arr, true) });
                    }
                }
                _this.setState({ materialList: __spreadArray([], arr, true) });
                console.log(datetime, index);
            },
            //   onChangedata2(data, index) {
            //     const newdata = new Date(data);
            //     const datetime =
            //       newdata.getFullYear() +
            //       '-' +
            //       (newdata.getMonth() + 1) +
            //       '-' +
            //       newdata.getDate();
            //     const arr = _this.state.materialList;
            //     arr[index].typename = datetime;
            //     _this.setState({ materialList: [...arr] });
            //     console.log(datetime, index);
            //   },
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
    asyncSetFieldProps: function (data, type, updateCascade) {
        if (type === void 0) { type = 0; }
        if (updateCascade === void 0) { updateCascade = true; }
        var _this = this;
        var promise = asyncSetProps(_this, data, 'TestLecon');
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
            if (updateCascade && res.extendArray.length > 0) {
                var cascadeArray = [traverseAndParseTreeData(treeArray[0])];
                _this.setState({
                    cascadeData: cascadeArray,
                });
            }
            if (_this.state.updateTreeDate === '1') {
                _this.setState({
                    leftTreeDate: __spreadArray([], treeArray, true),
                    treeData: __spreadArray([], treeArray, true),
                    stateData: [__spreadArray([], treeArray, true)],
                });
            }
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
            if (res.message) {
                Toast.info(res.message, 1);
            }
        });
    },
    fieldDidUpdate: function () {
        if (!this.props.runtimeProps.viewMode) {
            console.log('发起页：fieldDidUpdate');
            var form = this.props.form;
            var editData = {
                hanmoney: 0,
                detailedData: [], //物资明细
            };
            if (this.state.Inputmoney1) {
                editData.hanmoney = Number(this.state.Inputmoney1);
                console.log('Inputmoney2', this.state.Inputmoney1);
                form.setFieldValue('ZucMoney', Number(this.state.Inputmoney1));
                form.setFieldExtendValue('ZucMoney', Number(this.state.Inputmoney1));
                form.setFieldValue('ZuJieMoney', Number(this.state.Inputmoney1));
                form.setFieldExtendValue('ZuJieMoney', Number(this.state.Inputmoney1));
            }
            editData.detailedData = this.state.materialList;
            // 打印数据
            var newlistdata = this.state.materialList;
            var str2 = '';
            var str0 = '\n' +
                '设备名称 单位 规格型号 结算周期（始） 结算周期（终） 数量 单价 小计';
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
            form.setFieldValue('TestLecon', str);
            form.setFieldExtendValue('TestLecon', editData);
        }
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('TestLecon');
        var label = form.getFieldProp('TestLecon', 'label');
        var parsers = {
            materialParser: [
                {
                    key: 'name',
                    label: '物资名称',
                    index: 1,
                    title: true,
                },
                {
                    key: 'unit',
                    label: '单位',
                    index: 2,
                },
                {
                    key: 'size',
                    label: '规格型号',
                    index: 3,
                },
            ],
            contractParser: [
                {
                    key: 'name',
                    label: '合同名称',
                    index: 1,
                    title: true,
                },
                {
                    key: 'supplier',
                    label: '供应商',
                    index: 2,
                },
                {
                    key: 'contract_money',
                    label: '合同金额',
                    index: 3,
                },
            ],
        };
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
            React.createElement(DetailList, { cascadeData: this.state.cascadeData, rightListData: this.state.listData, showTypes: this.state.showTypes, sideChange: this.methods().sideChange, itemClick: this.methods().handleClick.bind(this) })));
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
                React.createElement(FancyList, { data: parseListData(this.state.checkData, parsers.contractParser), itemClick: this.methods().checkClick }))));
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
            var _a = value ? value : {}, _b = _a.hanmoney, hanmoney = _b === void 0 ? 0 : _b, _c = _a.detailedData, detailedData = _c === void 0 ? [] : _c;
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
                            React.createElement("label", { className: "m-field-view-label" }, "\u5408\u8BA1(\u5143)"),
                            React.createElement("div", { className: "m-field-view-value" },
                                React.createElement("span", null, hanmoney ? Number(hanmoney).toFixed(2) : '')))))));
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
                    React.createElement("div", { className: "custom-list-title", style: {
                            width: '100%',
                            paddingLeft: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                        } },
                        React.createElement("div", null, label),
                        React.createElement("div", { onClick: this.methods().ResetClick, style: { color: '#409EFF' } }, "\u91CD\u7F6E\u660E\u7EC6")),
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
                                                                            React.createElement(InputItem, { editable: false, type: "text", className: "ant-input m-mobile-inner-input", value: item.size, placeholder: "\u81EA\u52A8\u83B7\u53D6", readOnly: true }))))))))),
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
                                                                            React.createElement(InputItem, { editable: false, type: "text", readOnly: true, className: "ant-input m-mobile-inner-input", value: item.unit, placeholder: "\u81EA\u52A8\u83B7\u53D6" }))))))))),
                                            React.createElement("div", null,
                                                React.createElement(DatePicker, { mode: "date", title: "\u9009\u62E9\u65F6\u95F4", extra: "Optional", value: _this_1.state.datadate1, onChange: function (date) {
                                                        return _this_1.methods().onChangedata1(date, index, 'plan_in_riqi');
                                                    } },
                                                    React.createElement("div", { className: "field-wrapper" },
                                                        React.createElement("div", { className: "m-group m-group-mobile" },
                                                            React.createElement("div", { className: "m-field-wrapper" },
                                                                React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                    React.createElement("div", { className: "m-field-head" },
                                                                        React.createElement("div", { className: "m-field-label" },
                                                                            React.createElement("span", null, "\u7ED3\u7B97\u5468\u671F\uFF08\u59CB\uFF09"))),
                                                                    React.createElement("div", { className: "m-field-box" },
                                                                        React.createElement("div", { className: "m-field-content left" },
                                                                            React.createElement("div", { className: "input-wrapper" },
                                                                                React.createElement(InputItem, { editable: false, extra: "x", onExtraClick: _this_1.methods().onExtraClick.bind(_this_1, index, 'plan_in_riqi'), value: item.plan_in_riqi, placeholder: "\u8BF7\u9009\u62E9" })))))))))),
                                            React.createElement("div", null,
                                                React.createElement(DatePicker, { mode: "date", title: "\u9009\u62E9\u65F6\u95F4", extra: "Optional", value: _this_1.state.datadate2, onChange: function (date) {
                                                        return _this_1.methods().onChangedata1(date, index, 'plan_out_riqi');
                                                    } },
                                                    React.createElement("div", { className: "field-wrapper" },
                                                        React.createElement("div", { className: "m-group m-group-mobile" },
                                                            React.createElement("div", { className: "m-field-wrapper" },
                                                                React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                    React.createElement("div", { className: "m-field-head" },
                                                                        React.createElement("div", { className: "m-field-label" },
                                                                            React.createElement("span", null, "\u7ED3\u7B97\u5468\u671F\uFF08\u7EC8\uFF09"))),
                                                                    React.createElement("div", { className: "m-field-box" },
                                                                        React.createElement("div", { className: "m-field-content left" },
                                                                            React.createElement("div", { className: "input-wrapper" },
                                                                                React.createElement(InputItem, { editable: false, extra: "x", onExtraClick: _this_1.methods().onExtraClick.bind(_this_1, index, 'plan_out_riqi'), value: item.plan_out_riqi, placeholder: "\u8BF7\u9009\u62E9" })))))))))),
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
                                                                            React.createElement(InputItem, { className: "ant-input m-mobile-inner-input", value: item.zl_number, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('zl_number', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u5355\u4EF7(\u5143)"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { className: "ant-input m-mobile-inner-input", value: item.price, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('price', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u5C0F\u8BA1"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, clear: true, value: item.subtotal, placeholder: "\u81EA\u52A8\u8BA1\u7B97" }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u5907\u6CE8"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { clear: true, value: item.remarks, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.methods().onInputchange('remarks', index, e);
                                                                                } }))))))))))))));
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
                                        React.createElement("span", null, "\u5408\u8BA1(\u5143)"))),
                                React.createElement("div", { className: "m-field-box" },
                                    React.createElement("div", { className: "m-field-content left" },
                                        React.createElement("div", { className: "input-wrapper" },
                                            React.createElement(InputItem, { value: this.state.Inputmoney1, placeholder: "\u81EA\u52A8\u8BA1\u7B97\u53EF\u4FEE\u6539" })))))))),
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
};
export default FormField;
