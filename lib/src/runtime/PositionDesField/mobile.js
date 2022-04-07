var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import './mobile.less';
import { InputItem, Picker } from 'antd-mobile';
import React from 'react';
import { asyncSetProps } from '../../utils/asyncSetProps';
import arrayTreeFilter from 'array-tree-filter';
var FormField = {
    getInitialState: function () {
        return {
            pickerValuedata: '',
            pickerValue: [],
            visible: false,
            value: null,
            province: [],
            modal2: false,
            SearchBarvalue: '',
            showElem: 'none',
            inputvalue: '',
            allData: { type: '0', number: '99999', page: '1', name: '' },
            listData: [],
        };
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'PositionDes');
        promise.then(function (res) {
            _this.setState({
                province: __spreadArray([], res.dataArray, true),
                current_page: res.currentPage,
                total2: res.totalCount,
            });
        });
    },
    methods: function () {
        var _this = this;
        return {
            sublisk: function () {
                var newdate = _this.state.allData;
                _this.asyncSetFieldProps(newdate);
                _this.setState({ visible: true });
            },
            onPickerChange: function (value) {
                var form = _this.props.form;
                _this.setState({ pickerValue: value });
                var desData = { Optionsid: '', Optionsname: '' };
                if (!value) {
                    _this.setState({ pickerValuedata: '' }, function () {
                        form.setFieldValue('PositionDes', desData);
                        form.setFieldExtendValue('PositionDes', desData);
                    });
                }
                else {
                    var treeChildren = arrayTreeFilter(_this.state.province, function (c, level) { return c.value === value[level]; });
                    var newdata = treeChildren.map(function (v) { return v.label; }).join('/');
                    desData.Optionsid = value;
                    desData.Optionsname = newdata;
                    _this.setState({ pickerValuedata: newdata }, function () {
                        form.setFieldValue('PositionDes', desData);
                        form.setFieldExtendValue('PositionDes', {
                            data: desData,
                        });
                    });
                }
            },
        };
    },
    handleOk: function () {
        this.setState({
            visible: false,
        });
    },
    handleCancel: function () {
        this.setState({
            showElem: 'none',
        });
    },
    fieldRender: function () {
        var _this_1 = this;
        var form = this.props.form;
        var field = form.getFieldInstance('PositionDes');
        var label = form.getFieldProp('PositionDes', 'label');
        //详情
        if (this.props.runtimeProps.viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            var _a = value.Optionsname, Optionsname = _a === void 0 ? '' : _a;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "m-field-view" },
                    React.createElement("label", { className: "m-field-view-label" }, label),
                    React.createElement("div", { className: "m-field-view-value" }, Optionsname))));
        }
        return (React.createElement("div", { className: "CorpHouse_class_m" },
            React.createElement(Picker, { visible: this.state.visible, data: this.state.province, value: this.state.pickerValue, onChange: this.methods().onPickerChange, onOk: this.handleOk, onDismiss: function () { return _this_1.setState({ visible: false }); } },
                React.createElement("div", { className: "field-wrapper" },
                    React.createElement("div", { className: "m-group m-group-mobile" },
                        React.createElement("div", { className: "m-field-wrapper" },
                            React.createElement("div", { className: "m-field m-field-mobile m-mobile-input vertical" },
                                React.createElement("div", { className: "m-field-head", style: { marginLeft: '-7px' } },
                                    React.createElement("label", { className: "m-field-label" },
                                        React.createElement("span", null, label))),
                                React.createElement("div", { className: "m-field-box" },
                                    React.createElement("div", { className: "m-field-content left" },
                                        React.createElement("div", { className: "input-wrapper" },
                                            React.createElement(InputItem, { editable: false, className: "ant-input m-mobile-inner-input", type: "text", placeholder: "\u8BF7\u9009\u62E9", value: this.state.pickerValuedata, onClick: this.methods().sublisk })))))))))));
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
