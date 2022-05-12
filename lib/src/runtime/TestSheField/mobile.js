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
import { InputItem, Drawer, List, SearchBar, } from 'antd-mobile';
import './mobile.less';
/**
 * 自定义控件运行态 Mobile 视图
 */
var FormField = {
    getInitialState: function () {
        var form = this.props.form;
        return {
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
        var TestSheField = form.getFieldInstance('TestShe');
        var key = TestSheField.getProp('id');
        var value = '1';
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
        var newdate = this.state.allData;
        this.asyncSetFieldProps(newdate);
        this.setState({ showElem: 'inherit' });
    },
    habdlClick: function (item) {
        var form = this.props.form;
        console.log(item);
        var newdate = item.name + '/' + item.unit + '/' + item.size;
        this.setState({ inputvalue: newdate, showElem: 'none' }, function () {
            form.setFieldValue('TestShe', newdate);
            form.setFieldExtendValue('TestShe', newdate);
        });
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
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        var field = form.getFieldInstance('TestShe');
        var label = form.getFieldProp('TestShe', 'label');
        var required = form.getFieldProp('TestShe', 'required');
        var placeholder = form.getFieldProp('TestShe', 'placeholder');
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.onSubmit, onChange: this.onSearchBarChange, onCancel: this.onCancel, showCancelButton: true }),
            React.createElement(List, null, this.state.listData.map(function (item, index) {
                return (React.createElement(List.Item, { onClick: _this.habdlClick.bind(_this, item), key: index, multipleLine: true }, item.name));
            }))));
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
                                        React.createElement(InputItem, { editable: false, extra: "x", onExtraClick: this.onExtraClick, className: "ant-input m-mobile-inner-input", type: "text", placeholder: "\u8BF7\u9009\u62E9", value: this.state.inputvalue, onClick: this.onOpenChange }))))))),
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
                    }, sidebar: sidebar, onOpenChange: this.onOpenChange }), document.getElementById('MF_APP'))))
        //   </div>
        );
    },
};
export default FormField;
