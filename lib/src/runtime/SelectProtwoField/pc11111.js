// 选择项目
import React from 'react';
// import Pccc from './pccopy';
import './pc.less';
/**
 * 自定义控件运行态 PC 视图
 */
var FormField = {
    handleChange: function (e) {
        var form = this.props.form;
        form.setFieldValue('SelectPro', e.target.value);
    },
    fieldRender: function () {
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        console.log('sssssssssss', viewMode);
        var field = form.getFieldInstance('SelectPro');
        var label = form.getFieldProp('SelectPro', 'label');
        var placeholder = form.getFieldProp('SelectPro', 'placeholders');
        if (viewMode) {
            return (React.createElement("div", { className: "pc-custom-field-wrap" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u8BE6\u60C5\u9875\u6D4B\u8BD5\u5B57\u6BB5")));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u53D1\u8D77\u9875\u6D4B\u8BD5\u5B57\u6BB5")));
        }
    },
};
export default FormField;
