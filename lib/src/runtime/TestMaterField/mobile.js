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
import React from 'react';
import { createPortal } from 'react-dom';
import { InputItem, Drawer, Tabs, SearchBar } from 'antd-mobile';
import './mobile.less';
import { FancyList } from '../../components/fancyLists';
import { parseListData } from '../../utils/normalizeUtils';
/**
 * 自定义控件运行态 Mobile 视图
 */
var FormField = {
    getInitialState: function () {
        return {
            detdate: 'a1',
            SearchBarvalue: '',
            showElem: 'none',
            inputvalue: '',
            allData: { type: '0', number: '99999', page: '1', name: '' },
            listData: [],
        };
    },
    asyncSetFieldProps: function (vlauedata) {
        var _this = this;
        var _a = this.props, form = _a.form, spi = _a.spi;
        var Pro_name = form.getFieldValue('Autopro');
        vlauedata.project_name = Pro_name;
        vlauedata.biao_name = 'material_payment';
        var TestMaterField = form.getFieldInstance('TestMater');
        var key = TestMaterField.getProp('id');
        var value = '1';
        var bizAsyncData = [
            {
                key: key,
                bizAlias: 'TestMater',
                extendValue: vlauedata,
                value: value,
            },
        ];
        // 入参和返回参考套件数据刷新集成接口文档
        spi
            .refreshData({
            modifiedBizAlias: ['TestMater'],
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
            _this.setState({
                listData: newarr,
            });
        });
    },
    onExtraClick: function () {
        this.setState({ inputvalue: '' });
        console.log('测试点击');
    },
    onOpenChange: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('sss');
        console.log(args);
        var newvalue = this.state.allData;
        newvalue.name = '';
        newvalue.type = 0;
        newvalue.page = 1;
        newvalue.rk_id = ['a'];
        newvalue.project_name = '';
        // this.setState({
        //   allData: newvalue,
        // });
        this.asyncSetFieldProps(newvalue);
        this.setState({ showElem: 'inherit' });
    },
    habdlClick: function (item) {
        var form = this.props.form;
        var dtar = '';
        if (this.state.detdate === 'a1') {
            dtar = '材料结算-' + item.name;
        }
        else if (this.state.detdate === 'b1') {
            dtar = '采购合同-' + item.name;
        }
        else if (this.state.detdate === 'c1') {
            dtar = '采购订单-' + item.name;
        }
        else if (this.state.detdate === 'd1') {
            dtar = '材料入库-' + item.name;
        }
        console.log(dtar);
        form.setFieldValue('Conname', item.contract_name);
        form.setFieldExtendValue('Conname', item.contract_name);
        this.setState({ inputvalue: dtar, showElem: 'none' });
        form.setFieldValue('TestMater', dtar);
        form.setFieldExtendValue('TestMater', dtar);
        form.setFieldValue('Selectjia', item.supplier);
        form.setFieldExtendValue('Selectjia', item.supplier);
    },
    onCancel: function () {
        this.setState({ showElem: 'none' });
    },
    onSubmit: function (value) {
        var newdate = this.state.allData;
        newdate.name = value;
        this.asyncSetFieldProps(newdate);
    },
    //搜索框
    onSearchBarChange: function (value) {
        if (!value) {
            var newData = this.state.allData;
            newData.name = value;
            this.asyncSetFieldProps(newData);
        }
        this.setState({ SearchBarvalue: value });
    },
    fieldRender: function () {
        var _this = this;
        // fix in codepen
        var form = this.props.form;
        var field = form.getFieldInstance('TestMater');
        var label = form.getFieldProp('TestMater', 'label');
        var required = form.getFieldProp('TestMater', 'required');
        var tabs = [
            { title: '材料结算' },
            { title: '采购合同' },
            { title: '采购订单' },
            { title: '材料入库' },
        ];
        var parsers = {
            materialTotal: [
                {
                    key: 'name',
                    label: '结算主题',
                    index: 1,
                    title: true,
                },
                {
                    key: 'supplier',
                    label: '供应商',
                    index: 2,
                },
                {
                    key: 'settle_money',
                    label: '结算金额',
                    index: 3,
                },
            ],
            purchaseContract: [
                {
                    key: 'name',
                    label: '合同名称',
                    index: 1,
                    title: true,
                },
                {
                    key: 'supplier',
                    label: '租赁单位',
                    index: 2,
                },
                {
                    key: 'contract_money',
                    label: '合同金额',
                    index: 3,
                },
            ],
            purchaseOrder: [
                {
                    key: 'name',
                    label: '采购名称',
                    index: 1,
                    title: true,
                },
                {
                    key: 'supplier',
                    label: '供应商',
                    index: 2,
                },
                {
                    key: 'tax_total_money',
                    label: '结算金额',
                    index: 3,
                },
            ],
            materialIn: [
                {
                    key: 'name',
                    label: '入库主题',
                    index: 1,
                    title: true,
                },
                {
                    key: 'supplier',
                    label: '供应商',
                    index: 2,
                },
                {
                    key: 'extend_four',
                    label: '库房',
                    index: 3,
                },
            ],
        };
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.onSubmit, onChange: this.onSearchBarChange, onCancel: this.onCancel, showCancelButton: true }),
            React.createElement(Tabs, { tabs: tabs, initialPage: 0, renderTabBar: function (props) { return React.createElement(Tabs.DefaultTabBar, __assign({}, props, { page: 3 })); }, onChange: function (tab, index) {
                    console.log('onChange', index, tab);
                    _this.setState({ detdate: 'a1' });
                    var newpage = {
                        detailPage: 1,
                        defaultActiveKey: 'a',
                        rk_id: ['a'],
                        number: '1000',
                        page: 1,
                        name: '',
                    };
                    if (index === 0) {
                        _this.setState({ detdate: 'a1' });
                        newpage.rk_id = ['a'];
                    }
                    else if (index === 1) {
                        _this.setState({ detdate: 'b1' });
                        newpage.rk_id = ['b'];
                    }
                    else if (index === 2) {
                        _this.setState({ detdate: 'c1' });
                        newpage.rk_id = ['c'];
                    }
                    else if (index === 3) {
                        _this.setState({ detdate: 'd1' });
                        newpage.rk_id = ['d'];
                    }
                    _this.setState({
                        allData: newpage,
                    });
                    _this.asyncSetFieldProps(newpage);
                } },
                React.createElement("div", null,
                    React.createElement(FancyList, { data: parseListData(this.state.listData, parsers.materialTotal), itemClick: this.habdlClick })),
                React.createElement("div", null,
                    React.createElement(FancyList, { data: parseListData(this.state.listData, parsers.purchaseContract), itemClick: this.habdlClick })),
                React.createElement("div", null,
                    React.createElement(FancyList, { data: parseListData(this.state.listData, parsers.purchaseOrder), itemClick: this.habdlClick })),
                React.createElement("div", null,
                    React.createElement(FancyList, { data: parseListData(this.state.listData, parsers.materialIn), itemClick: this.habdlClick })))));
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, label),
                    React.createElement("div", { className: "m-field-view-value" },
                        " ",
                        value))));
        }
        return (React.createElement("div", { className: "CorpHouse_class_m" },
            React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "m-group m-group-mobile" },
                    React.createElement("div", { className: "m-field-wrapper" },
                        React.createElement("div", { className: "m-field m-field-mobile m-mobile-input vertical" },
                            React.createElement("div", { className: "m-field-head", style: { marginLeft: '-7px' } },
                                React.createElement("label", { className: "m-field-label" },
                                    React.createElement("span", null,
                                        required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                                        label))),
                            React.createElement("div", { className: "m-field-box" },
                                React.createElement("div", { className: "m-field-content left" },
                                    React.createElement("div", { className: "input-wrapper" },
                                        React.createElement(InputItem, { editable: false, extra: "x", onExtraClick: this.onExtraClick, className: "ant-input m-mobile-inner-input", type: "text", placeholder: "\u8BF7\u9009\u62E9", value: this.state.inputvalue, onClick: this.onOpenChange })))))),
                    createPortal(React.createElement(Drawer, { className: "isvzhukuaizkgl", open: true, style: {
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
                        }, sidebar: sidebar, onOpenChange: this.onOpenChange }), document.getElementById('MF_APP'))))));
    },
};
export default FormField;
