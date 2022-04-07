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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Upload, Button, Table, Tooltip, Input } from 'antd';
import React from 'react';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { UploadOutlined } from '@ant-design/icons';
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { parsePrintString } from '../../utils/printStringParser';
import { UploadColumns } from '../../printColumns/AntdUpload';
var FormField = {
    getInitialState: function () {
        return {
            imgBase64: '',
            fileList: [],
            OSSData: {},
            value: '',
            options: [],
            current_page: '',
            total2: '',
            allData: { type: '0', number: '10', page: '1', name: '' },
            isModalVisible: false,
            listData: [],
            detailData: [],
            invoice_number: '',
            totalData: {
                taxFree: '',
                tax: '',
                total: '',
            },
        };
    },
    fieldDidMount: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.methods().init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    fieldDidUpdate: function () {
        if (!this.props.runtimeProps.viewMode) {
            console.log('发起页：fieldDidUpdate');
            var editData = {
                hanmoney: 0,
                nomoney: 0,
                tax: 0,
                invoice_number: '',
                detailedData: [], //物资明细
            };
            if (this.state.totalData.total) {
                editData.hanmoney = Number(this.state.totalData.total);
            }
            if (this.state.totalData.taxFree) {
                editData.nomoney = Number(this.state.totalData.taxFree);
            }
            if (this.state.totalData.tax) {
                editData.tax = Number(this.state.totalData.tax);
            }
            editData.invoice_number = this.state.invoice_number;
            editData.detailedData = this.state.detailData;
            var form = this.props.form;
            form.setFieldExtendValue('AntdUpload', editData);
        }
    },
    asyncSetFieldProps: function (data, type) {
        var _this_1 = this;
        var _this = this;
        var form = this.props.form;
        var promise = asyncSetProps(_this, data, 'AntdUpload');
        promise.then(function (res) {
            console.log('上传接口', res);
            if (type === 'jsapi') {
                _this.setState({
                    OSSData: res.dataArray,
                });
            }
            else if (type === 'upload') {
                console.log('发票详情', res);
                console.log(res.dataArray.invoice_details);
                _this.setState({
                    detailData: res.dataArray.invoice_details,
                    totalData: {
                        taxFree: res.dataArray.no_shui_money,
                        tax: res.dataArray.invoice_shuier,
                        total: res.dataArray.invoice_money,
                    },
                    invoice_number: res.dataArray.invoice_number,
                });
                var d = res.dataArray.invoice_details;
                try {
                    var str2 = _this_1.state.invoice_number;
                    var str1 = "\u4E0D\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)\uFF1A".concat(_this_1.state.totalData.taxFree, "\n \u7A0E\u989D\u5408\u8BA1(\u5143)\uFF1A").concat(_this_1.state.totalData.tax, "\n \u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)\uFF1A").concat(_this_1.state.totalData.total);
                    var str = str2 + parsePrintString(d, UploadColumns, str1);
                    console.log('e', str);
                    form.setFieldValue('AntdUpload', str);
                }
                catch (e) {
                    console.log('error', e);
                }
                form.setFieldValue('SelectType', res.dataArray.invoice_type);
                form.setFieldExtendValue('SelectType', res.dataArray.invoice_type);
                form.setFieldValue('TextfaNumber', res.dataArray.invoice_number);
                form.setFieldExtendValue('TextfaNumber', res.dataArray.invoice_number);
                form.setFieldValue('CorpSupplier', res.dataArray.xiao_unit);
                form.setFieldExtendValue('CorpSupplier', res.dataArray.xiao_unit);
                form.setFieldValue('Textshou', res.dataArray.shou_shuihao);
                form.setFieldExtendValue('Textshou', res.dataArray.shou_shuihao);
                form.setFieldValue('CorpSupplieryi', res.dataArray.shou_unit);
                form.setFieldExtendValue('CorpSupplieryi', res.dataArray.shou_unit);
                form.setFieldValue('Textkai', res.dataArray.shou_bank_cert);
                form.setFieldExtendValue('Textkai', res.dataArray.shou_bank_cert);
                form.setFieldValue('Textcard', res.dataArray.shou_bank_cert);
                form.setFieldExtendValue('Textcard', res.dataArray.shou_bank_cert);
                form.setFieldValue('Textaddress', res.dataArray.xiao_address);
                form.setFieldExtendValue('Textaddress', res.dataArray.xiao_address);
            }
        });
    },
    methods: function () {
        var _this = this;
        return {
            //   文件上传
            init: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var newData;
                    return __generator(this, function (_a) {
                        try {
                            newData = _this.state.allData;
                            newData.rk_id = ['jsapi'];
                            _this.asyncSetFieldProps(newData, 'jsapi');
                        }
                        catch (error) {
                            console.log('error:', error);
                        }
                        return [2 /*return*/];
                    });
                });
            },
            uploadonChange: function (fileList) {
                var OSSData = _this.state.OSSData;
                console.log('Aliyun OSS:', fileList);
                if (fileList.file.status === 'done') {
                    var fileurl = OSSData.host + '/' + fileList.file.url;
                    var newData = _this.state.allData;
                    newData.rk_id = ['upload'];
                    newData.img_url = fileurl;
                    _this.asyncSetFieldProps(newData, 'upload');
                    console.log('fileurl', fileurl);
                    _this.setState({ fileList: fileList.fileList });
                }
                else if (fileList.file.status === 'uploading') {
                }
            },
            getExtraData: function (file) {
                var OSSData = _this.state.OSSData;
                console.log('oss', OSSData);
                return {
                    key: file.url,
                    OSSAccessKeyId: OSSData.accessid,
                    success_action_status: '200',
                    policy: OSSData.policy,
                    Signature: OSSData.signature,
                    callback: OSSData.callback,
                };
            },
            beforeUpload: function (file) {
                return __awaiter(this, void 0, void 0, function () {
                    var OSSData, expire, suffix, filename;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('file', file);
                                OSSData = _this.state.OSSData;
                                console.log('beforeUpload', OSSData);
                                expire = OSSData.expire * 1000;
                                if (!(expire < Date.now())) return [3 /*break*/, 2];
                                return [4 /*yield*/, _this.init()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                suffix = file.name.slice(file.name.lastIndexOf('.'));
                                filename = Date.now() + suffix;
                                file.url = OSSData.dir + filename;
                                console.log('fileurl', file);
                                return [2 /*return*/, file];
                        }
                    });
                });
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
        return true;
    },
    fieldRender: function () {
        var _this_1 = this;
        var _a = this.props, form = _a.form, runtimeProps = _a.runtimeProps;
        var viewMode = runtimeProps.viewMode;
        var components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        var columns = [
            {
                title: '货物或应税劳务、服务名称',
                dataIndex: 'huowu',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.huowu },
                    React.createElement("span", null, record.huowu))); },
            },
            {
                title: '规格型号',
                dataIndex: 'size',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.size },
                    React.createElement("span", null, record.size))); },
            },
            {
                title: '单位',
                dataIndex: 'unit ',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.size },
                    React.createElement("span", null, record.size))); },
            },
            {
                title: '数量',
                dataIndex: 'number',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.number },
                    React.createElement("span", null, record.number))); },
            },
            {
                title: '单价',
                dataIndex: 'price',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.price },
                    React.createElement("span", null, record.price))); },
            },
            {
                title: '金额',
                dataIndex: 'money',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.money },
                    React.createElement("span", null, record.money))); },
            },
            {
                title: '税率',
                dataIndex: 'shuilv',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.shuilv },
                    React.createElement("span", null, record.shuilv))); },
            },
            {
                title: '税额',
                dataIndex: 'shuier',
                render: function (_, record) { return (React.createElement(Tooltip, { placement: "topLeft", title: record.shuier },
                    React.createElement("span", null, record.shuier))); },
            },
        ];
        var field = form.getFieldInstance('AntdUpload');
        var label = form.getFieldProp('AntdUpload', 'label');
        var required = form.getFieldProp('AntdUpload', 'required');
        var detailData = this.state.detailData;
        //   文件上传
        var value = this.props.value;
        var uploadprops = {
            name: 'file',
            fileList: value,
            action: this.state.OSSData.host,
            onChange: this.methods().uploadonChange,
            data: this.methods().getExtraData,
            beforeUpload: this.methods().beforeUpload,
        };
        // 详情页
        if (viewMode) {
            var value_1 = field.getExtendValue();
            var _b = value_1 ? value_1 : {}, _c = _b.detailname, detailname = _c === void 0 ? '' : _c, _d = _b.nomoney, nomoney = _d === void 0 ? 0 : _d, _e = _b.hanmoney, hanmoney = _e === void 0 ? 0 : _e, _f = _b.tax, tax = _f === void 0 ? 0 : _f, _g = _b.detailedData, detailedData = _g === void 0 ? [] : _g;
            return (React.createElement("div", { className: "field-wrapper" },
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", null, detailname),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, label),
                React.createElement("div", null,
                    React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: value_1 instanceof Array ? value_1 : detailedData, columns: columns, pagination: false })),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u4E0D\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"),
                React.createElement("div", null, nomoney ? Number(nomoney).toFixed(2) : ''),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u7A0E\u989D\u5408\u8BA1(\u5143)"),
                React.createElement("div", null, tax ? Number(tax).toFixed(2) : ''),
                React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"),
                React.createElement("div", null, hanmoney ? Number(hanmoney).toFixed(2) : '')));
        }
        return (React.createElement("div", { className: "pc-custom-field-wrap" },
            React.createElement("div", { className: "label", style: { marginTop: '10px' } },
                required ? (React.createElement("span", { style: { color: '#ea6d5c' } }, "*")) : (React.createElement("span", { style: { color: '#fff' } }, "*")),
                label),
            React.createElement("div", null,
                React.createElement(Upload, __assign({ showUploadList: { showRemoveIcon: false }, onPreview: function (file) {
                        var OSSData = _this_1.state.OSSData;
                        var fileurl = OSSData.host + '/' + file.url;
                        window.open(fileurl);
                    }, maxCount: 1 }, uploadprops),
                    React.createElement(Button, { icon: React.createElement(UploadOutlined, null) }, "\u4E0A\u4F20\u6587\u4EF6\uFF08\u4EC5\u652F\u6301\u56FE\u7247\uFF09"))),
            React.createElement("div", { style: { marginTop: '10px' } },
                React.createElement(Table, { scroll: { x: '1500px' }, components: components, className: "full-size-editable", rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: detailData, columns: columns, pagination: false })),
            React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u4E0D\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"),
            React.createElement("div", null,
                React.createElement(Input, { readOnly: true, value: this.state.totalData.taxFree, placeholder: "\u81EA\u52A8\u8BA1\u7B97" })),
            React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u7A0E\u989D\u5408\u8BA1(\u5143)"),
            React.createElement("div", null,
                React.createElement(Input, { readOnly: true, value: this.state.totalData.tax, placeholder: "\u81EA\u52A8\u8BA1\u7B97" })),
            React.createElement("div", { className: "label", style: { marginTop: '10px' } }, "\u542B\u7A0E\u91D1\u989D\u5408\u8BA1(\u5143)"),
            React.createElement("div", null,
                React.createElement(Input, { readOnly: true, value: this.state.totalData.total, placeholder: "\u81EA\u52A8\u8BA1\u7B97" }))));
    },
};
export default FormField;
