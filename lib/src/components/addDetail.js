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
import { Button, InputItem, List, Picker, Modal, Toast } from 'antd-mobile';
import { Modal as PCModal, Form as PCForm, Button as PCButton, Input as PCInput, TreeSelect as PCTreeSelect, } from 'antd';
import { AddOutline } from 'antd-mobile-icons';
var wrapperStyle = {
    justifyContent: 'center',
    display: 'flex',
    WebkitJustifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    position: 'sticky',
    top: 0,
    zIndex: 1500,
    width: '100vw',
};
var mbuttomStyle = {
    height: 35,
    fontSize: 15,
    lineHeight: 2.5,
    width: '98%',
};
import { createPortal } from 'react-dom';
var HandledDetailDialogMobile = function (props) {
    var cascadeData = props.cascadeData, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed, showElem = props.showElem;
    var _a = React.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = React.useState(false), cascadeVisible = _b[0], setCascadeVisible = _b[1];
    var _c = React.useState([]), cascadeValue = _c[0], setCascadeValue = _c[1];
    var _d = React.useState({
        name: '',
        unit: '',
        size: '',
        type: '',
    }), formData = _d[0], setFormData = _d[1];
    var renderData = function (cascadePickerData) {
        var string = '请选择';
        if (cascadePickerData.length === 0) {
            return React.createElement("span", null, string);
        }
        string = cascadePickerData
            .map(function (item) {
            if (item) {
                var parsedItem = JSON.parse(item.value);
                var title = parsedItem.title;
                return title;
            }
        })
            .join('-');
        return React.createElement("span", null, string);
    };
    var wrappedFinish = function (values) {
        var parsedValues = {
            name: values['name'],
            size: values['size'],
            unit: values['unit'],
            type: '',
        };
        if (values['type']) {
            for (var i = values['type'].length; i > 0; i--) {
                if (values['type'][i - 1]) {
                    parsedValues['type'] = JSON.parse(values['type'][i - 1])['key'];
                    break;
                }
            }
        }
        console.log('88888', parsedValues);
        if (parsedValues.name === '' ||
            parsedValues.unit === '' ||
            parsedValues.size === '' ||
            parsedValues.type === '') {
            Toast.info('存在未填写', 1);
        }
        else {
            setVisible(false);
            onFinish(parsedValues);
        }
    };
    var wrappedFinishFailed = function (errorInfo) {
        // setVisible(false);
        onFinishFailed(errorInfo);
    };
    var setButtonStyle = function () {
        var style = {
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            lineHeight: '72px',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            zIndex: 1600,
            boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
        };
        if (showElem && !visible) {
            style.display = showElem;
        }
        else {
            style.display = 'none';
        }
        return style;
    };
    return (React.createElement("div", { style: wrapperStyle },
        createPortal(React.createElement(Button, { onClick: function () {
                setVisible(true);
            }, type: "primary", style: setButtonStyle() },
            React.createElement(AddOutline, { fontSize: 32 })), document.getElementById('MF_APP')),
        React.createElement(Modal, { className: "isvzhukuaizkgl", visible: visible, bodyStyle: {
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                paddingTop: '16px',
                paddingLeft: '8px',
                paddingRight: '8px',
                minHeight: '60vh',
            } },
            React.createElement("div", { style: { height: '60vh', overflowY: 'scroll' } },
                React.createElement(List
                // onFinish={wrappedFinish}
                // onFinishFailed={wrappedFinishFailed}
                , { 
                    // onFinish={wrappedFinish}
                    // onFinishFailed={wrappedFinishFailed}
                    renderFooter: React.createElement("div", { style: { display: 'flex', justifyContent: 'space-around' } },
                        React.createElement(Button, { style: { width: '40%' }, type: "primary", onClick: function () {
                                wrappedFinish(formData);
                            } }, "\u63D0\u4EA4"),
                        React.createElement(Button, { style: { width: '40%' }, type: "primary", onClick: function () {
                                setVisible(false);
                            } }, "\u53D6\u6D88")) },
                    React.createElement(InputItem, { placeholder: "\u8BF7\u586B\u5199\u7269\u54C1\u540D\u79F0", onChange: function (val) {
                            return setFormData({
                                name: val,
                                unit: formData.unit,
                                size: formData.size,
                                type: formData.type,
                            });
                        } }, "\u7269\u54C1\u540D\u79F0"),
                    React.createElement(InputItem, { placeholder: "\u8BF7\u586B\u5199\u5355\u4F4D", onChange: function (val) {
                            return setFormData({
                                name: formData.name,
                                unit: val,
                                size: formData.size,
                                type: formData.type,
                            });
                        } }, "\u5355\u4F4D"),
                    React.createElement(InputItem, { placeholder: "\u8BF7\u586B\u5199\u89C4\u683C\u578B\u53F7", onChange: function (val) {
                            return setFormData({
                                name: formData.name,
                                unit: formData.unit,
                                size: val,
                                type: formData.type,
                            });
                        } }, "\u89C4\u683C\u578B\u53F7"),
                    React.createElement(Picker, { data: cascadeData, extra: "\u8BF7\u9009\u62E9 ", visible: cascadeVisible, onDismiss: function () {
                            setCascadeVisible(false);
                        }, value: cascadeValue, onOk: function (value) {
                            setCascadeValue(value);
                            setFormData({
                                name: formData.name,
                                unit: formData.unit,
                                size: formData.size,
                                type: value,
                            });
                            setCascadeVisible(false);
                        } },
                        React.createElement(List.Item, { arrow: "horizontal", onClick: function () {
                                setCascadeVisible(true);
                                console.log(cascadeData);
                            } }, "\u7269\u8D44\u7C7B\u578B")))))));
};
var DetailDialogDesktop = function (props) {
    var treeData = props.treeData, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = React.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = React.useState([]), treeValue = _b[0], setTreeValue = _b[1];
    var wrappedFinish = function (values) {
        onFinish(values);
        setVisible(false);
    };
    return (React.createElement("div", null,
        React.createElement(PCButton, { size: "large", type: "primary", onClick: function () {
                setVisible(true);
            } }, "\u65B0\u589E"),
        React.createElement(PCModal, { onCancel: function () {
                setVisible(false);
            }, visible: visible, width: 750, title: "\u65B0\u589E\u7269\u8D44", footer: null },
            React.createElement(PCForm, { initialValues: { remember: true }, layout: "vertical", onFinish: wrappedFinish, onFinishFailed: onFinishFailed },
                React.createElement(PCForm.Item, { label: "\u7269\u54C1\u540D\u79F0", name: "name", rules: [{ required: true, message: '请填写物品名称' }] },
                    React.createElement(PCInput, { placeholder: "\u586B\u5199\u7269\u54C1\u540D\u79F0" })),
                React.createElement(PCForm.Item, { label: "\u5355\u4F4D", name: "unit", rules: [{ required: true, message: '请填写单位' }] },
                    React.createElement(PCInput, { placeholder: "\u586B\u5199\u5355\u4F4D" })),
                React.createElement(PCForm.Item, { label: "\u89C4\u683C\u578B\u53F7", name: "size", rules: [{ required: true, message: '请填写规格型号' }] },
                    React.createElement(PCInput, { placeholder: "\u586B\u5199\u89C4\u683C\u578B\u53F7" })),
                React.createElement(PCForm.Item, { label: "\u7269\u54C1\u7C7B\u578B", name: "type", rules: [{ required: true, message: '请填写物品类型' }] },
                    React.createElement(PCTreeSelect, { style: { width: '100%' }, value: treeValue, dropdownStyle: { maxHeight: 400, overflow: 'auto' }, treeData: treeData, placeholder: "\u8BF7\u9009\u62E9", treeDefaultExpandAll: true, onChange: setTreeValue })),
                React.createElement(PCForm.Item, { className: "newForm" },
                    React.createElement(PCButton, { type: "primary", htmlType: "submit", style: {
                            marginRight: '16px',
                        } }, "\u786E\u8BA4"),
                    React.createElement(PCButton, { type: "ghost", onClick: function () {
                            setVisible(false);
                        } }, "\u53D6\u6D88"))))));
};
var SupplierMobileDialog = function (props) {
    var onFinish = props.onFinish, onFinishFailed = props.onFinishFailed, supplierTypes = props.supplierTypes;
    var _a = React.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = React.useState(false), pickerVisible = _b[0], setPickerVisible = _b[1];
    var _c = React.useState(false), naturePickerVisible = _c[0], setNaturePickerVisible = _c[1];
    var _d = React.useState([]), pickerValue = _d[0], setPickerValue = _d[1];
    var _e = React.useState([]), naturePickerValue = _e[0], setNaturePickerValue = _e[1];
    var _f = React.useState({
        name: '',
        supplier_type: '',
        unit_nature: '',
    }), formData = _f[0], setFormData = _f[1];
    var pickerDataRender = function (pickerData) {
        if (pickerData.length === 0) {
            return React.createElement("span", null, "\u8BF7\u9009\u62E9");
        }
        return React.createElement("span", null, "".concat(pickerData[0].label));
    };
    var Options = [
        __spreadArray([], supplierTypes.map(function (item) {
            return {
                label: item.title,
                value: item.title,
            };
        }), true),
    ];
    var wrappedFinish = function (values) {
        var parsedValues = {
            name: '',
            supplier_type: '',
            unit_nature: '',
        };
        if (values['supplier_type'].length > 0) {
            parsedValues.supplier_type = values['supplier_type'][0];
        }
        if (values['unit_nature'].length > 0) {
            parsedValues.unit_nature = values['unit_nature'][0];
        }
        parsedValues.name = values.name;
        console.log('WRAPPED FINISH', values);
        onFinish(parsedValues);
        setVisible(false);
    };
    var wrappedFinishFailed = function (error) {
        onFinishFailed(error);
    };
    var natures = [
        [
            { label: '事业', value: '事业' },
            { label: '企业', value: '企业' },
            { label: '社团', value: '社团' },
            { label: '自然人', value: '自然人' },
            { label: '其他', value: '其他' },
        ],
    ];
    return (React.createElement("div", { style: wrapperStyle },
        React.createElement(Button, { onClick: function () {
                setVisible(true);
            }, type: "primary", style: mbuttomStyle }, "\u65B0\u589E\u4F9B\u5E94\u5546"),
        React.createElement(Modal, { className: "isvzhukuaizkgl", visible: visible, bodyStyle: {
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                paddingTop: '16px',
                paddingLeft: '8px',
                paddingRight: '8px',
                minHeight: '60vh',
            } },
            React.createElement("div", { style: { height: '60vh', overflowY: 'scroll' } },
                React.createElement(List
                // onFinish={wrappedFinish}
                // onFinishFailed={wrappedFinishFailed}
                , { 
                    // onFinish={wrappedFinish}
                    // onFinishFailed={wrappedFinishFailed}
                    renderFooter: React.createElement("div", { style: { display: 'flex', justifyContent: 'space-around' } },
                        React.createElement(Button, { style: { width: '40%' }, type: "primary", onClick: function () {
                                wrappedFinish(formData);
                            } }, "\u63D0\u4EA4"),
                        React.createElement(Button, { style: { width: '40%' }, type: "primary", onClick: function () {
                                setVisible(false);
                            } }, "\u53D6\u6D88")) },
                    React.createElement(InputItem, { placeholder: "\u8BF7\u586B\u5199\u5355\u4F4D\u540D\u79F0", onChange: function (val) {
                            return setFormData({
                                name: val,
                                supplier_type: formData.supplier_type,
                                unit_nature: formData.unit_nature,
                            });
                        } }, "\u5355\u4F4D\u540D\u79F0"),
                    React.createElement(Picker, { data: Options, cascade: false, extra: "\u8BF7\u9009\u62E9 ", visible: pickerVisible, onDismiss: function () {
                            console.log('onDismiss');
                            setPickerVisible(false);
                        }, value: pickerValue, onChange: function (v) { return console.log('onchang', v); }, onOk: function (value) {
                            setPickerValue(value);
                            setFormData({
                                name: formData.name,
                                supplier_type: value,
                                unit_nature: formData.unit_nature,
                            });
                            setPickerVisible(false);
                            console.log('onOk', value);
                        } },
                        React.createElement(List.Item, { onClick: function () {
                                setPickerVisible(true);
                                console.log(Options);
                            } },
                            React.createElement("span", null, "\u5355\u4F4D\u7C7B\u578B"))),
                    React.createElement(Picker, { data: natures, cascade: false, extra: "\u8BF7\u9009\u62E9 ", visible: naturePickerVisible, onDismiss: function () {
                            console.log('onDismiss');
                            setNaturePickerVisible(false);
                        }, value: naturePickerValue, onChange: function (v) { return console.log('onchang', v); }, onOk: function (value) {
                            setNaturePickerValue(value);
                            setFormData({
                                name: formData.name,
                                unit_nature: value,
                                supplier_type: formData.supplier_type,
                            });
                            setNaturePickerVisible(false);
                            console.log('onOk', value);
                        } },
                        React.createElement(List.Item, { onClick: function () {
                                setNaturePickerVisible(true);
                                console.log(natures);
                            } },
                            React.createElement("span", null, "\u5355\u4F4D\u6027\u8D28"))))))));
};
SupplierMobileDialog.displayName = 'SupplierMobileDialog';
var StorageMobileDialog = function (props) {
    var onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = React.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = React.useState({
        name: '',
        number: 0,
        address: '',
        remarks: '',
    }), formData = _b[0], setFormData = _b[1];
    var wrappedFinish = function (values) {
        console.log('WRAPPED FINISH', values);
        onFinish(values);
        setVisible(false);
    };
    var wrappedFinishFailed = function (error) {
        onFinishFailed(error);
    };
    return (React.createElement("div", { style: wrapperStyle },
        React.createElement(Button, { onClick: function () {
                setVisible(true);
            }, type: "primary", style: mbuttomStyle }, "\u65B0\u589E\u4ED3\u5E93"),
        React.createElement(Modal, { className: "isvzhukuaizkgl", visible: visible, bodyStyle: {
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                paddingTop: '16px',
                paddingLeft: '8px',
                paddingRight: '8px',
                minHeight: '60vh',
            } },
            React.createElement("div", { style: { height: '60vh', overflowY: 'scroll' } },
                React.createElement(List
                // onFinish={wrappedFinish}
                // onFinishFailed={wrappedFinishFailed}
                , { 
                    // onFinish={wrappedFinish}
                    // onFinishFailed={wrappedFinishFailed}
                    renderFooter: React.createElement(Button, { type: "primary", onClick: function () {
                            wrappedFinish(formData);
                        } }, "\u63D0\u4EA4") },
                    React.createElement(List.Item, null,
                        React.createElement("span", null, "\u4ED3\u5E93\u540D\u79F0"),
                        React.createElement(InputItem, { placeholder: "\u4ED3\u5E93\u540D\u79F0", onChange: function (val) {
                                return setFormData({
                                    name: val,
                                    number: formData.number,
                                    address: formData.address,
                                    remarks: formData.remarks,
                                });
                            } })),
                    React.createElement(List.Item, null,
                        React.createElement("span", null, "\u4ED3\u5E93\u7F16\u53F7"),
                        React.createElement(InputItem, { type: "number", placeholder: "\u4ED3\u5E93\u7F16\u53F7", onChange: function (val) {
                                return setFormData({
                                    name: formData.name,
                                    number: Number(val),
                                    address: formData.address,
                                    remarks: formData.remarks,
                                });
                            } })),
                    React.createElement(List.Item, null,
                        React.createElement("span", null, "\u4ED3\u5E93\u5730\u5740"),
                        React.createElement(InputItem, { placeholder: "\u4ED3\u5E93\u5730\u5740", onChange: function (val) {
                                return setFormData({
                                    name: formData.name,
                                    number: formData.number,
                                    address: val,
                                    remarks: formData.remarks,
                                });
                            } })),
                    React.createElement(List.Item, null,
                        React.createElement("span", null, "\u5907\u6CE8"),
                        React.createElement(InputItem, { placeholder: "\u5907\u6CE8", onChange: function (val) {
                                return setFormData({
                                    name: formData.name,
                                    number: formData.number,
                                    remarks: val,
                                    address: formData.remarks,
                                });
                            } })))))));
};
var StorageDesktopDialog = function (props) {
    var onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = React.useState(false), visible = _a[0], setVisible = _a[1];
    var wrappedFinish = function (values) {
        console.log('WRAPPED FINISH', values);
        onFinish(values);
        setVisible(false);
    };
    var wrappedFinishFailed = function (error) {
        onFinishFailed(error);
    };
    return (React.createElement("div", null,
        React.createElement(PCButton, { onClick: function () {
                setVisible(true);
            }, size: "large", type: "primary", style: {
                marginLeft: '8px',
            } }, "\u65B0\u589E"),
        React.createElement(PCModal, { onCancel: function () {
                setVisible(false);
            }, visible: visible, width: 750, title: "\u65B0\u589E\u4ED3\u5E93", footer: null },
            React.createElement(PCForm, { initialValues: { remember: true }, layout: "vertical", onFinish: wrappedFinish, onFinishFailed: wrappedFinishFailed },
                React.createElement(PCForm.Item, { label: "\u4ED3\u5E93\u540D\u79F0", name: "name", rules: [{ required: true, message: '请填写仓库名称' }] },
                    React.createElement(PCInput, { placeholder: "\u4ED3\u5E93\u540D\u79F0" })),
                React.createElement(PCForm.Item, { label: "\u4ED3\u5E93\u7F16\u53F7", name: "number", rules: [{ required: true, message: '请填写仓库编号' }] },
                    React.createElement(PCInput, { type: "number", placeholder: "\u4ED3\u5E93\u7F16\u53F7" })),
                React.createElement(PCForm.Item, { label: "\u4ED3\u5E93\u5730\u5740", name: "address", rules: [{ required: true, message: '请填写仓库地址' }] },
                    React.createElement(PCInput, { placeholder: "\u4ED3\u5E93\u5730\u5740" })),
                React.createElement(PCForm.Item, { label: "\u5907\u6CE8", name: "remarks" },
                    React.createElement(PCInput.TextArea, { placeholder: "\u5907\u6CE8" })),
                React.createElement(PCForm.Item, { className: "newForm" },
                    React.createElement(PCButton, { type: "primary", htmlType: "submit", style: {
                            marginRight: '16px',
                        } }, "\u786E\u8BA4"),
                    React.createElement(PCButton, { type: "ghost", onClick: function () {
                            setVisible(false);
                        } }, "\u53D6\u6D88"))))));
};
export { DetailDialogDesktop, HandledDetailDialogMobile, SupplierMobileDialog, StorageMobileDialog, StorageDesktopDialog, };
