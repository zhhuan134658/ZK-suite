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
import { createPortal } from 'react-dom';
import { InputItem, Drawer, List, Switch, SearchBar } from 'antd-mobile';
//import { Tree } from 'antd';
import './mobile.less';
import { fpAdd } from '../../utils/fpOperations';
import _ from 'lodash';
/**
 * 自定义控件运行态 Mobile 视图
 */
var nowTimeStamp = Date.now();
var now = new Date(nowTimeStamp);
var FormField = {
    getInitialState: function () {
        return {
            Inputmoney1: '',
            checked: false,
            treevalue: undefined,
            deColumns: [
                {
                    title: '费用科目',
                    dataIndex: 'ke_name',
                },
                {
                    title: '金额',
                    dataIndex: 'money',
                },
                {
                    title: '备注',
                    dataIndex: 'remarks',
                },
            ],
            treeData: [],
            maxnum: '',
            date: now,
            checkindex: '',
            SearchBarvalue: '',
            showElem: 'none',
            showElem2: 'none',
            inputvalue: '',
            Numbervalue1: '',
            Numbervalue2: '',
            Numbervalue3: '',
            Numbervalue4: '',
            Numbervalue5: '',
            allData: { type: '0', number: '99999', page: '1', name: '' },
            listData: [],
            petty_sele: '否',
            materialList: [
                {
                    ke_name: '',
                    money: '',
                    remarks: '',
                },
            ],
        };
    },
    asyncSetFieldProps: function (vlauedata, type) {
        var _this_1 = this;
        var _a = this.props, form = _a.form, spi = _a.spi;
        var Pro_name = form.getFieldValue('Autopro');
        vlauedata.project_name = Pro_name;
        vlauedata.petty_sele = this.state.petty_sele;
        // vlauedata.petty_yu = this.state.Numbervalue1;
        // vlauedata.project_name = this.state.Numbervalue2;
        var TestExpeField = form.getFieldInstance('TestExpe');
        var key = TestExpeField.getProp('id');
        var value = '1';
        var bizAsyncData = [
            {
                key: key,
                bizAlias: 'TestExpe',
                extendValue: vlauedata,
                value: value,
            },
        ];
        // 入参和返回参考套件数据刷新集成接口文档
        spi
            .refreshData({
            modifiedBizAlias: ['TestExpe'],
            bizAsyncData: bizAsyncData,
        })
            .then(function (res) {
            console.log(JSON.parse(res.dataList[0].value));
            //   表格数据
            var newarr;
            //   表格数据
            try {
                newarr = JSON.parse(res.dataList[0].value).data;
            }
            catch (e) { }
            if (type === '12') {
                var menuId = [];
                var len = newarr.length;
                for (var i = 0; i < len; i++) {
                    var item = newarr[i];
                    if (item.children && item.children.length !== 0) {
                        var children = item.children;
                        for (var j = 0; j < children.length; j++) {
                            newarr[len + j] = children[j];
                        }
                        len = newarr.length;
                    }
                    menuId.push(item);
                }
                var add = menuId.filter(function (item) {
                    if (!item.children) {
                        return item;
                    }
                });
                _this_1.setState({
                    listData: add,
                });
                console.log('2222222', add);
            }
            else if (type === '11') {
                _this_1.setState({
                    Numbervalue1: Number(newarr.sy),
                    Numbervalue3: Number(newarr.fybx_dk_spz),
                    Numbervalue4: Number(newarr.re_money_spz),
                    maxnum: Number(newarr.sy) -
                        Number(newarr.fybx_dk_spz) -
                        Number(newarr.re_money_spz),
                });
            }
            //   树状图数据
            // const newtarr = JSON.parse(res.dataList[0].extendValue);
            // const newtarr1 = [
            //   {
            //     title: '物资类型',
            //     key: '0',
            //     children: newtarr,
            //   },
            // ];
            // this.setState({
            //   treeData: [...newtarr1],
            // });
        });
    },
    onOpenChange: function (index) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log('sss');
        console.log(args);
        var newdate = this.state.allData;
        newdate.rk_id = ['b'];
        this.asyncSetFieldProps(newdate, '12');
        this.setState({ showElem: 'inherit', checkindex: index });
    },
    onOpenChange2: function (index) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log('sss');
        console.log(args);
        var newdate = this.state.allData;
        this.asyncSetFieldProps(newdate);
        this.setState({ showElem2: 'inherit', checkindex: index });
    },
    habdlClick: function (item) {
        var form = this.props.form;
        console.log(item);
        var arr = this.state.materialList;
        var arrindex = this.state.checkindex;
        var itemValue = item.split('/');
        console.log('99999999999', itemValue);
        arr[arrindex].ke_name = itemValue;
        this.setState({ inputvalue: item.value, showElem: 'none', materialList: arr }, function () {
            form.setFieldValue('TestExpe', item.value);
            form.setFieldExtendValue('TestExpe', item.value);
        });
    },
    onChangeDeduction: function (e) {
        console.log('CHANGE DEDUCTION');
        var _this = this;
        var calcDeduction = function (_this, e) {
            console.log('CALC DEDUCTION');
            var number1 = _this.state.maxnum;
            var number2 = _this.state.Inputmoney1;
            var val = Number(e.target.value);
            if (val <= 0.01) {
                _this.setState({
                    Numbervalue2: '',
                });
                return 0;
            }
            if (number1 > number2) {
                if (val > _this.state.Inputmoney1) {
                    var aa = _this.state.Inputmoney1;
                    var bb = Number(aa) - Number(_this.state.maxnum);
                    _this.setState({
                        Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                    });
                }
                else {
                    var aa = _this.state.Inputmoney1;
                    var bb = aa - val;
                    _this.setState({
                        Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                    });
                }
            }
            else {
                if (val > _this.state.maxnum) {
                    var aa = _this.state.Inputmoney1;
                    var bb = aa - _this.state.maxnum;
                    _this.setState({
                        Numbervalue2: _this.state.maxnum.toFixed(2),
                        Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                    });
                }
                else {
                    var aa = _this.state.Inputmoney1;
                    var bb = aa - val;
                    _this.setState({
                        Numbervalue5: Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
                    });
                }
            }
        };
        console.log(e.target.value);
        calcDeduction(_this, e);
    },
    onCancel: function () {
        this.setState({ showElem: 'none' });
    },
    onSubmit: function (value) {
        var newdate = this.state.allData;
        newdate.name = value;
        this.asyncSetFieldProps(newdate);
    },
    onSearchBarChange: function (value) {
        if (!value) {
            var newData = this.state.allData;
            newData.name = value;
            this.asyncSetFieldProps(newData);
        }
        this.setState({ SearchBarvalue: value });
    },
    //增加明细
    addSon: function () {
        var sonData = {
            ke_name: '',
            money: '',
            remarks: '',
        };
        this.setState({
            materialList: __spreadArray(__spreadArray([], this.state.materialList, true), [sonData], false),
        });
    },
    //删除明细
    deleteItem: function (index) {
        var list = this.state.materialList;
        list.splice(index, 1);
        this.setState({
            materialList: list,
        });
    },
    //更新数据
    onInputchange: function (types, index, e) {
        console.log(types, index, e, this);
        var arr = this.state.materialList;
        console.log(this.state.materialList);
        // let arrindex = e.target.value;
        var arrindex = e ? e : '';
        var newindex = index;
        var newtype = types;
        // arr[newindex] = {};
        arr[newindex][newtype] = arrindex;
        var newarr2 = [];
        newarr2 = __spreadArray([], arr.filter(function (item) {
            if (item.money) {
                return item;
            }
        }), true);
        newarr2 = __spreadArray([], newarr2.map(function (item) {
            return item.money;
        }), true);
        var totalMoney = newarr2.reduce(fpAdd, 0);
        this.setState({
            materialList: __spreadArray([], arr, true),
            Inputmoney1: totalMoney.toFixed(2) <= 0.005 ? '' : totalMoney.toFixed(2),
        });
        console.log(arr);
    },
    onDatechange: function () {
        // let arr = this.state.materialList;
        // let purchase_riqi = 'purchase_riqi';
        // arr[index][purchase_riqi] = dateString;
        // this.setState({ materialList: [...arr] });
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
            editData.detailedData = this.state.materialList;
            editData.petty_sele = this.state.petty_sele;
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
            var newlistdata = this.state.materialList;
            var str2 = '';
            var str0 = '\n' + '费用科目 金额 备注';
            var str1 = '\n' +
                '报销合计:' +
                this.state.Inputmoney1 +
                '\n' +
                '备用金余额:' +
                this.state.Numbervalue1 +
                '\n' +
                '审批中的费用报销抵扣:' +
                this.state.Numbervalue3 +
                '\n' +
                '审批中的归还:' +
                this.state.Numbervalue4 +
                '\n' +
                '本次抵扣金额:' +
                this.state.Numbervalue4 +
                '\n' +
                '财务应支付金额:' +
                this.state.Numbervalue5;
            for (var i = 0; i < newlistdata.length; i++) {
                str0 +=
                    '\n' +
                        newlistdata[i].ke_name +
                        ' ' +
                        newlistdata[i].money +
                        ' ' +
                        newlistdata[i].remarks;
            }
            var str = str2 + str0 + str1;
            console.log(str);
            var form = this.props.form;
            form.setFieldValue('TestExpe', str);
            form.setFieldExtendValue('TestExpe', editData);
        }
        // this.state.dataSource;
        // this.state.Inputmoney1;
        // this.state.Inputmoney2;
    },
    fieldRender: function () {
        var _this_1 = this;
        // fix in codepen
        var form = this.props.form;
        var field = form.getFieldInstance('TestExpe');
        var label = form.getFieldProp('TestExpe', 'label');
        var onSelect = function (selectedKeys, info) {
            var arr = _this_1.state.materialList;
            var newindex = _this_1.state.checkindex;
            arr[newindex].ke_name = info.node.title;
            _this_1.setState({ showElem2: 'none', materialList: __spreadArray([], arr, true) });
            var treedata = { type: selectedKeys[0], number: '10', page: '1' };
            _this_1.setState({
                allData: treedata,
            });
            _this_1.asyncSetFieldProps(treedata);
            console.log('selected', selectedKeys, info.node.title);
        };
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.onSubmit, onChange: this.onSearchBarChange, showCancelButton: true, onCancel: function () { return _this_1.setState({ showElem: 'none' }); } }),
            React.createElement(List, null, this.state.listData.map(function (item, index) {
                return (React.createElement(List.Item, { onClick: _this_1.habdlClick.bind(_this_1, item), key: index, multipleLine: true }, item));
            }))));
        var treesidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.onSubmit, onChange: this.onSearchBarChange, onCancel: function () { return _this_1.setState({ showElem2: 'none' }); }, showCancelButton: true })));
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue();
            // if (!value.detailedData) {
            //   value = field.getValue();
            // }
            var _a = value ? value : {}, _b = _a.detailedData, detailedData = _b === void 0 ? [] : _b, _c = _a.petty_sele, petty_sele = _c === void 0 ? '' : _c, _d = _a.Numbervalue1, Numbervalue1 = _d === void 0 ? '' : _d, _e = _a.Numbervalue2, Numbervalue2 = _e === void 0 ? '' : _e, _f = _a.Numbervalue3, Numbervalue3 = _f === void 0 ? '' : _f, _g = _a.Numbervalue4, Numbervalue4 = _g === void 0 ? '' : _g, _h = _a.hanmoney, hanmoney = _h === void 0 ? '' : _h;
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
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, "\u62A5\u9500\u5408\u8BA1"),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        hanmoney)),
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, "\u5907\u7528\u91D1\u62B5\u6263"),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        petty_sele)),
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, "\u5907\u7528\u91D1\u4F59\u989D"),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        Numbervalue1)),
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, "\u672C\u6B21\u62B5\u6263\u91D1\u989D"),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        Numbervalue2)),
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, "\u5BA1\u6279\u4E2D\u7684\u8D39\u7528\u62A5\u9500\u62B5\u6263"),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        Numbervalue3)),
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, "\u5BA1\u6279\u4E2D\u7684\u5F52\u8FD8"),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        Numbervalue4))));
        }
        return (React.createElement("div", { className: "CorpHouse_class_m" },
            React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "tablefield-mobile" },
                    React.createElement("div", { className: "table-body  tbody  " },
                        this.state.materialList.map(function (item, index) {
                            return (React.createElement("div", { key: index },
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
                                            _this_1.state.materialList.length > 0 ? (React.createElement("div", { className: "dele_item", onClick: _this_1.deleteItem.bind(_this_1, index) }, "\u5220\u9664")) : (React.createElement("div", null))),
                                        React.createElement("div", { className: "row" },
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u8D39\u7528\u79D1\u76EE"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { editable: false, type: "text", className: "ant-input m-mobile-inner-input", value: item.ke_name, placeholder: "\u8BF7\u9009\u62E9", onClick: _this_1.onOpenChange.bind(_this_1, index), onChange: function (e) {
                                                                                    return _this_1.onInputchange('ke_name', index, e);
                                                                                } }))))))))),
                                            React.createElement("div", null,
                                                React.createElement("div", { className: "field-wrapper" },
                                                    React.createElement("div", { className: "m-group m-group-mobile" },
                                                        React.createElement("div", { className: "m-field-wrapper" },
                                                            React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                                                React.createElement("div", { className: "m-field-head" },
                                                                    React.createElement("div", { className: "m-field-label" },
                                                                        React.createElement("span", null, "\u91D1\u989D"))),
                                                                React.createElement("div", { className: "m-field-box" },
                                                                    React.createElement("div", { className: "m-field-content left" },
                                                                        React.createElement("div", { className: "input-wrapper" },
                                                                            React.createElement(InputItem, { type: "text", className: "ant-input m-mobile-inner-input", value: item.money, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.onInputchange('money', index, e);
                                                                                } }))))))))),
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
                                                                            React.createElement(InputItem, { type: "text", className: "ant-input m-mobile-inner-input", value: item.remarks, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                                    return _this_1.onInputchange('remarks', index, e);
                                                                                } }))))))))))))));
                        }),
                        React.createElement("div", { className: "table-actions" },
                            React.createElement("div", { className: "tbody-add-button tTap", onClick: this.addSon },
                                React.createElement("img", { style: { width: '20px' }, src: "https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Em46p8naW61629791119284.png", alt: "" }),
                                "\u00A0",
                                React.createElement("span", { className: "add-button-text" }, "\u589E\u52A01\u660E\u7EC6"))),
                        React.createElement("div", { className: "field-wrapper" },
                            React.createElement("div", { className: "m-group m-group-mobile" },
                                React.createElement("div", { className: "m-field-wrapper" },
                                    React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                        React.createElement("div", { className: "m-field-head" },
                                            React.createElement("div", { className: "m-field-label" },
                                                React.createElement("span", null, "\u62A5\u9500\u5408\u8BA1"))),
                                        React.createElement("div", { className: "m-field-box" },
                                            React.createElement("div", { className: "m-field-content left" },
                                                React.createElement("div", { className: "input-wrapper" },
                                                    React.createElement(InputItem, { type: "text", className: "ant-input m-mobile-inner-input", value: this.state.Inputmoney1, placeholder: "\u81EA\u52A8\u83B7\u53D6", editable: false })))))))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "field-wrapper" },
                                React.createElement("div", { className: "m-group m-group-mobile" },
                                    React.createElement("div", { className: "m-field-wrapper" },
                                        React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                            React.createElement("div", { className: "m-field-head" },
                                                React.createElement("div", { className: "m-field-label" },
                                                    React.createElement("span", null, "\u5907\u7528\u91D1\u62B5\u6263"))),
                                            React.createElement("div", { className: "m-field-box" },
                                                React.createElement("div", { className: "m-field-content left" },
                                                    React.createElement("div", { className: "input-wrapper" },
                                                        React.createElement(Switch, { checked: this.state.checked, onChange: function (checked) {
                                                                console.log(checked);
                                                                if (checked === false) {
                                                                    _this_1.setState({
                                                                        petty_sele: '否',
                                                                    });
                                                                }
                                                                else {
                                                                    _this_1.setState({
                                                                        petty_sele: '是',
                                                                    });
                                                                    var newdate = _this_1.state.allData;
                                                                    newdate.rk_id = ['是'];
                                                                    _this_1.asyncSetFieldProps(newdate, '11');
                                                                }
                                                                _this_1.setState({
                                                                    checked: !_this_1.state.checked,
                                                                });
                                                            } }))))))))),
                        React.createElement("div", null, this.state.checked ? (React.createElement("div", null,
                            React.createElement("div", { className: "field-wrapper" },
                                React.createElement("div", { className: "m-group m-group-mobile" },
                                    React.createElement("div", { className: "m-field-wrapper" },
                                        React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                            React.createElement("div", { className: "m-field-head" },
                                                React.createElement("div", { className: "m-field-label" },
                                                    React.createElement("span", null, "\u5907\u7528\u91D1\u4F59\u989D"))),
                                            React.createElement("div", { className: "m-field-box" },
                                                React.createElement("div", { className: "m-field-content left" },
                                                    React.createElement("div", { className: "input-wrapper" },
                                                        React.createElement(InputItem, { type: "text", className: "ant-input m-mobile-inner-input", value: this.state.Numbervalue1, placeholder: "\u81EA\u52A8\u83B7\u53D6", readOnly: true, editable: false })))))))),
                            React.createElement("div", { className: "field-wrapper" },
                                React.createElement("div", { className: "m-group m-group-mobile" },
                                    React.createElement("div", { className: "m-field-wrapper" },
                                        React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                            React.createElement("div", { className: "m-field-head" },
                                                React.createElement("div", { className: "m-field-label" },
                                                    React.createElement("span", null, "\u5BA1\u6279\u4E2D\u7684\u8D39\u7528\u62A5\u9500\u62B5\u6263"))),
                                            React.createElement("div", { className: "m-field-box" },
                                                React.createElement("div", { className: "m-field-content left" },
                                                    React.createElement("div", { className: "input-wrapper" },
                                                        React.createElement(InputItem, { type: "text", className: "ant-input m-mobile-inner-input", value: this.state.Numbervalue3, placeholder: "\u81EA\u52A8\u83B7\u53D6", readOnly: true, editable: false })))))))),
                            React.createElement("div", { className: "field-wrapper" },
                                React.createElement("div", { className: "m-group m-group-mobile" },
                                    React.createElement("div", { className: "m-field-wrapper" },
                                        React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                            React.createElement("div", { className: "m-field-head" },
                                                React.createElement("div", { className: "m-field-label" },
                                                    React.createElement("span", null, "\u5BA1\u6279\u4E2D\u7684\u5F52\u8FD8"))),
                                            React.createElement("div", { className: "m-field-box" },
                                                React.createElement("div", { className: "m-field-content left" },
                                                    React.createElement("div", { className: "input-wrapper" },
                                                        React.createElement(InputItem, { type: "text", className: "ant-input m-mobile-inner-input", value: this.state.Numbervalue4, placeholder: "\u81EA\u52A8\u83B7\u53D6", readOnly: true, editable: false })))))))),
                            React.createElement("div", { className: "field-wrapper" },
                                React.createElement("div", { className: "m-group m-group-mobile" },
                                    React.createElement("div", { className: "m-field-wrapper" },
                                        React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                            React.createElement("div", { className: "m-field-head" },
                                                React.createElement("div", { className: "m-field-label" },
                                                    React.createElement("span", null, "\u672C\u6B21\u62B5\u6263\u91D1\u989D"))),
                                            React.createElement("div", { className: "m-field-box" },
                                                React.createElement("div", { className: "m-field-content left" },
                                                    React.createElement("div", { className: "input-wrapper" },
                                                        React.createElement("input", { type: "number", max: this.state.maxnum, className: "ant-input m-mobile-inner-input", value: this.state.Numbervalue2, placeholder: "\u8BF7\u8F93\u5165", onChange: function (e) {
                                                                _this_1.setState({
                                                                    Numbervalue2: e.target.value,
                                                                });
                                                                e.persist();
                                                                var debouncedCalc = _.debounce(_this_1.onChangeDeduction, 1000);
                                                                debouncedCalc(e);
                                                            } })))))))),
                            React.createElement("div", { className: "field-wrapper" },
                                React.createElement("div", { className: "m-group m-group-mobile" },
                                    React.createElement("div", { className: "m-field-wrapper" },
                                        React.createElement("div", { className: "m-field m-field-mobile m-select-field" },
                                            React.createElement("div", { className: "m-field-head" },
                                                React.createElement("div", { className: "m-field-label" },
                                                    React.createElement("span", null, "\u8D22\u52A1\u5E94\u652F\u4ED8\u91D1\u989D"))),
                                            React.createElement("div", { className: "m-field-box" },
                                                React.createElement("div", { className: "m-field-content left" },
                                                    React.createElement("div", { className: "input-wrapper" },
                                                        React.createElement(InputItem, { editable: false, type: "number", className: "ant-input m-mobile-inner-input", value: this.state.Numbervalue5, placeholder: "\u8BF7\u8F93\u5165" })))))))))) : null))),
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
                    }, sidebar: sidebar, onOpenChange: this.onOpenChange }), document.getElementById('MF_APP')),
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
                    }, sidebar: treesidebar, onOpenChange: this.onOpenChange2 }), document.getElementById('MF_APP')))));
    },
};
export default FormField;
