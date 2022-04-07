var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { notification, Cascader } from 'antd';
import React from 'react';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
var FormField = {
    getInitialState: function () {
        return {
            options: [],
            current_page: '',
            total2: '',
            allData: { type: '0', number: '10', page: '1', name: '' },
            isModalVisible: false,
            listData: [],
        };
    },
    fieldDidMount: function () {
        var newData = this.state.allData;
        this.asyncSetFieldProps(newData);
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'PositionDes');
        promise.then(function (res) {
            _this.setState({
                options: __spreadArray([], res.dataArray, true),
                current_page: res.currentPage,
                total2: res.totalCount,
            });
            if (_this.state.msgdata === '1') {
                notification.open({
                    message: res.message,
                });
                _this.setState({
                    msgdata: '0',
                });
            }
        });
    },
    methods: function () {
        var _this = this;
        return {
            onChangeValue: function (_value, selectedOptions) {
                var form = _this.props.form;
                var desData = { Optionsid: '', Optionsname: '' };
                desData.Optionsid =
                    selectedOptions[0].value +
                        '/' +
                        selectedOptions[1].value +
                        '/' +
                        selectedOptions[2].value;
                desData.Optionsname =
                    selectedOptions[0].label +
                        '/' +
                        selectedOptions[1].label +
                        '/' +
                        selectedOptions[2].label;
                form.setFieldValue('PositionDes', desData);
                form.setFieldExtendValue('PositionDes', desData);
            },
        };
    },
    handleCancel: function () {
        this.setState({
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    handleOk: function () {
        var newData = __spreadArray([], this.state.dataSource, true);
        var selectData = __spreadArray([], this.state.currentSelectData, true);
        if (selectData.length > 0) {
            selectData.forEach(function (e) {
                newData.push(e);
            });
        }
        var uniqueData = __spreadArray([], uniqueArrayByKey(newData, ['id']), true);
        this.setState({
            dataSource: uniqueData,
            isModalVisible: false,
            selectedRowKeys: [],
        });
    },
    fieldRender: function () {
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        var field = form.getFieldInstance('PositionDes');
        var label = form.getFieldProp('PositionDes', 'label');
        var required = form.getFieldProp('PositionDes', 'required');
        // 详情页
        if (viewMode) {
            var value = field.getExtendValue() ? field.getExtendValue() : '';
            var _b = value.Optionsname, Optionsname = _b === void 0 ? '' : _b;
            return (React.createElement("div", null,
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", { style: { marginTop: '10px' } }, Optionsname)));
        }
        return (React.createElement("div", { className: "pc-custom-field-wrap" },
            React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                label),
            React.createElement("div", null,
                React.createElement(Cascader, { options: this.state.options, onChange: this.methods().onChangeValue, placeholder: "\u8BF7\u9009\u62E9" }))));
    },
};
export default FormField;
