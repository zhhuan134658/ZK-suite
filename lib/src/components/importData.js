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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { CheckCircleTwoTone, DownloadOutlined, EyeOutlined, FileFilled, LoadingOutlined, UploadOutlined, } from '@ant-design/icons';
import { Button, Modal, Steps, Upload, Table, notification, Pagination, } from 'antd';
import React, { useEffect } from 'react';
import { parseTableAsync, uploadAsyncSetProps } from '../utils/asyncSetProps';
var ImportDialog = function (props) {
    var _a = React.useState(false), modalVisible = _a[0], setModalVisible = _a[1];
    var _b = React.useState(0), currentStep = _b[0], setCurrentStep = _b[1];
    var _c = React.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = React.useState(false), showReset = _d[0], setShowReset = _d[1];
    var _e = React.useState({
        type: '0',
        number: '10',
        page: '1',
        name: '',
        rk_id: [],
        url: '',
    }), paginationData = _e[0], setPaginationData = _e[1];
    var _f = React.useState(undefined), fileList = _f[0], setFileList = _f[1];
    var _g = React.useState({
        expire: 0,
        host: '',
        policy: '',
        signature: '',
        callback: null,
        dir: '',
        accessid: '',
    }), OSSData = _g[0], setOSSData = _g[1];
    var _h = React.useState([]), uploadData = _h[0], setUploadData = _h[1];
    var _j = React.useState(''), uploadAction = _j[0], setUploadAction = _j[1];
    var _k = React.useState('https://www.baidu.com'), modelURL = _k[0], setModelURL = _k[1];
    var _l = React.useState(''), fileName = _l[0], setFileName = _l[1];
    var _m = React.useState([]), errArray = _m[0], setErrArray = _m[1];
    var _o = React.useState([]), processedColumns = _o[0], setProcessedColumns = _o[1];
    var _p = React.useState([]), tableData = _p[0], setTableData = _p[1];
    var _q = React.useState([]), pagedData = _q[0], setPagedData = _q[1];
    var _r = React.useState([]), validData = _r[0], setValidData = _r[1];
    var resetState = function () {
        setCurrentStep(0);
        setLoading(false);
        setPaginationData({
            type: '0',
            number: '10',
            page: '1',
            name: '',
            rk_id: [],
            url: '',
        });
        setFileList(undefined);
        setUploadData([]);
        setUploadAction('');
        setShowReset(false);
        setFileName('');
        setProcessedColumns([]);
        setTableData([]);
        setPagedData([]);
        setValidData([]);
        setErrArray([]);
    };
    var initUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, APIPromise, errorColumn, columns, modelPromise;
        return __generator(this, function (_a) {
            resetState();
            data = paginationData;
            data.rk_id = ['jsapi'];
            data.url = '';
            data['ModelType'] = '';
            data['ImportType'] = '';
            APIPromise = uploadAsyncSetProps(props.binding, data, 'jsapi', props.bizAlias);
            errorColumn = {
                title: '错误',
                dataIndex: 'errInfo',
                ellipsis: true,
            };
            columns = __spreadArray([], props.columns, true);
            columns.forEach(function (item, index) {
                if (item.dataIndex === 'operation') {
                    columns.splice(index, 1);
                }
                if (item.editable) {
                    item.editable = false;
                }
            });
            columns.push(errorColumn);
            console.log('上传的columns', columns);
            setProcessedColumns(columns);
            APIPromise.then(function (res) {
                console.info('APIReturn', res, 'APIRequest', data, 'BizAlias', props.bizAlias);
                if (res.OSSData) {
                    setOSSData(res.OSSData);
                    setUploadAction(res.OSSData.host);
                }
            }).catch(function (err) {
                console.log('出错了', err);
                notification.open({
                    message: "\u9519\u8BEF".concat(err),
                    type: 'error',
                });
            });
            setPaginationData(data);
            data['ModelType'] = props.bizAlias;
            modelPromise = uploadAsyncSetProps(props.binding, data, 'ModelType', props.bizAlias);
            modelPromise.then(function (res) {
                if (res.modelUrl) {
                    setModelURL(res.modelUrl);
                }
            });
            return [2 /*return*/];
        });
    }); };
    var getDuplicateIDs = function (uploadData) {
        var duplicatedArrays = [];
        uploadData.forEach(function (item, index) {
            var duplicate = {
                origin: index + 1,
                duplicate: [],
            };
            var id = item.id;
            uploadData.forEach(function (e, i) {
                if (i !== index && e.id === id) {
                    duplicate.duplicate.push(i + 1);
                }
            });
            if (duplicate.duplicate.length > 0) {
                duplicatedArrays.push(duplicate);
            }
        });
        return duplicatedArrays;
    };
    var beforeUpload = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var expire, suffix, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (file.type !== 'application/vnd.ms-excel' &&
                        file.type !==
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        notification.open({
                            message: "\u6587\u4EF6\u7C7B\u578B\u9519\u8BEF,\u8BF7\u4E0A\u4F20excel\u6587\u4EF6",
                            type: 'error',
                        });
                        return [2 /*return*/, Upload.LIST_IGNORE];
                    }
                    if (!!OSSData.accessid) return [3 /*break*/, 2];
                    return [4 /*yield*/, initUpload()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    expire = OSSData.expire * 1000;
                    if (!(expire < Date.now())) return [3 /*break*/, 4];
                    return [4 /*yield*/, initUpload()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    suffix = file.name.slice(file.name.lastIndexOf('.'));
                    filename = Date.now() + suffix;
                    file['url'] = OSSData.dir + filename;
                    return [2 /*return*/, file];
            }
        });
    }); };
    var handleCancel = function () {
        resetState();
        initUpload();
        setModalVisible(false);
    };
    var onChange = function (info) {
        console.log('UPLOAD INFO', info);
        if (info.file.status === 'done') {
            var fileurl = "".concat(OSSData.host, "/").concat(info.file.url);
            var data = paginationData;
            data.rk_id = ['upload'];
            data['ModelType'] = props.bizAlias;
            data['ImportType'] = props.bizAlias;
            data.url = fileurl;
            var UploadPromise = parseTableAsync(props.binding, data, props.bizAlias);
            setLoading(true);
            UploadPromise.then(function (res) {
                var start = performance.now();
                if (res.uploadData) {
                    var uploadData_1 = res.uploadData;
                    var duplicateIds_1 = getDuplicateIDs(uploadData_1);
                    if (duplicateIds_1 && duplicateIds_1.length > 0) {
                        uploadData_1.forEach(function (item, index) {
                            var duplicateArrs = duplicateIds_1.map(function (e) { return e.origin; });
                            if (duplicateArrs.includes(index + 1)) {
                                uploadData_1[index]['integrity'] = false;
                                uploadData_1[index]['errInfo'] = "\u6570\u636E\u548C".concat(duplicateIds_1
                                    .find(function (e) { return e.origin === index + 1; })
                                    .duplicate.join("\u3001"), "\u884C\u91CD\u590D");
                            }
                        });
                    }
                    var errorArray_1 = errArray;
                    uploadData_1.forEach(function (item, index) {
                        if (item.id === 0) {
                            item['errInfo'] = '数据不正确';
                            uploadData_1[index] = item;
                            errorArray_1.push(index);
                        }
                    });
                    var pagedData_1 = [];
                    for (var i = 0; i < uploadData_1.length; i += 10) {
                        pagedData_1.push(uploadData_1.slice(i, i + 10));
                    }
                    var valid = uploadData_1.filter(function (item) { return item.id !== 0; });
                    setValidData(valid);
                    setPagedData(pagedData_1);
                    setTableData(pagedData_1[0]);
                    setErrArray(errorArray_1);
                    setUploadData(uploadData_1);
                    setLoading(false);
                    setFileName(info.file.name);
                    //   setCurrentStep(1);
                    setShowReset(true);
                    var end = performance.now();
                    console.log("Call to resolve response took ".concat(end - start, " milliseconds."));
                }
            }).catch(function (err) {
                console.log('ERROR', err);
                notification.open({
                    message: "\u9519\u8BEF".concat(err),
                    type: 'error',
                });
                initUpload();
            });
            setFileList(info.fileList);
            setPaginationData(data);
        }
    };
    var loadExtraData = function (file) {
        var extra = {
            key: file.url,
            OSSAccessKeyId: OSSData.accessid,
            success_action_status: '200',
            policy: OSSData.policy,
            Signature: OSSData.signature,
            callback: OSSData.callback,
        };
        console.log('EXTRA DATA', extra);
        return extra;
    };
    var asyncSetData = function (data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                props.setTableData(data);
                resolve(null);
            }, 10);
        });
    };
    var next = function () { return __awaiter(void 0, void 0, void 0, function () {
        var start, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = performance.now();
                    //避免阻塞进程
                    return [4 /*yield*/, asyncSetData(validData)];
                case 1:
                    //避免阻塞进程
                    _a.sent();
                    setCurrentStep(currentStep + 1);
                    end = performance.now();
                    console.log("Call to setTableData took ".concat(end - start, " milliseconds."));
                    return [2 /*return*/];
            }
        });
    }); };
    var prev = function () {
        setCurrentStep(currentStep - 1);
    };
    useEffect(function () {
        initUpload();
        // this is intentionally ignored as initUpload in useEffect is supposed to be called only when the component is mounted
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var opLabelStyle = {
        display: 'block',
        marginBottom: '24px',
        marginTop: '16px',
        color: '#666',
        fontSize: '12px',
    };
    var controlledContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '51%',
        height: '250px',
        alignItems: 'center',
        justifyContent: 'center',
    };
    var steps = [
        {
            title: '选择Excel文件上传',
            content: (React.createElement("div", null,
                React.createElement("div", { style: {
                        display: 'flex',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        alignItems: 'center',
                        padding: '32px, 16px',
                    } },
                    React.createElement("div", { className: "download-container controlled-container", style: controlledContainerStyle },
                        React.createElement("span", { style: { display: 'block', marginBottom: '16px' } }, "1\u3001\u4E0B\u8F7D\u6A21\u7248\uFF0C\u586B\u5199\u4FE1\u606F"),
                        React.createElement(FileFilled, { style: { fontSize: '64px', color: '#c1c8ce' } }),
                        React.createElement("span", { className: "op-label", style: opLabelStyle }, '为保证数据导入顺利，建议下载使用模板填写信息'),
                        React.createElement(Button, { icon: React.createElement(DownloadOutlined, null), href: modelURL, target: '_blank', download: true }, "\u4E0B\u8F7D\u6A21\u677F")),
                    React.createElement("div", { style: {
                            border: '1px dashed #d9d9d9',
                            height: '130px',
                            width: '1px',
                        } }),
                    React.createElement("div", { className: "upload-container controlled-container", style: controlledContainerStyle },
                        React.createElement("span", { style: {
                                display: 'block',
                                marginBottom: '16px',
                            } }, "2\u3001\u4E0A\u4F20\u586B\u5199\u5B8C\u6210\u7684\u6587\u4EF6"),
                        !showReset && !loading && (React.createElement(FileFilled, { style: { fontSize: '64px', color: '#c1c8ce' } })),
                        loading && (React.createElement(LoadingOutlined, { style: { fontSize: '64px', color: '#c1c8ce' } })),
                        showReset && (React.createElement(FileFilled, { style: { fontSize: '64px', color: '#26c36a' } })),
                        !showReset && (React.createElement("span", { className: "op-label", style: opLabelStyle }, "\u4EC5\u652F\u6301\u4E0A\u4F20excel\u6587\u4EF6,\u5EFA\u8BAE\u4F7F\u7528\u6A21\u677F\u586B\u5199\u4FE1\u606F")),
                        showReset && (React.createElement("span", { className: "op-label", style: opLabelStyle }, fileName)),
                        !showReset && (React.createElement(Upload, { maxCount: 1, name: 'file', action: uploadAction, fileList: fileList, beforeUpload: beforeUpload, onChange: onChange, data: loadExtraData, showUploadList: false, onDownload: function () {
                                return false;
                            }, onPreview: function (file) {
                                window.open("".concat(OSSData.host, "/").concat(file.url), '_blank');
                            }, progress: {
                                strokeColor: {
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                },
                                strokeWidth: 3,
                                format: function (percent) { return "".concat(parseFloat(percent.toFixed(2)), "%"); },
                            }, accept: ".xlsx,.xls" },
                            React.createElement(Button, { icon: React.createElement(UploadOutlined, null), type: "primary", ghost: true }, "\u4E0A\u4F20\u6587\u4EF6"))),
                        showReset && (React.createElement("div", null,
                            React.createElement(Button, { onClick: function () {
                                    initUpload();
                                }, type: "primary", ghost: true, style: {
                                    marginRight: '8px',
                                } }, "\u91CD\u65B0\u4E0A\u4F20"),
                            React.createElement(Button, { type: "primary", onClick: function () {
                                    setCurrentStep(1);
                                } }, "\u5BFC\u5165\u6587\u4EF6"))))))),
            index: 0,
        },
        {
            title: '预览上传数据',
            icon: loading ? React.createElement(LoadingOutlined, null) : React.createElement(EyeOutlined, null),
            content: (React.createElement("div", { style: {
                    textAlign: 'center',
                } },
                React.createElement(Table, { className: "full-size-editable", scroll: { x: 1750 }, columns: processedColumns, dataSource: tableData, rowClassName: function (record) {
                        if (!record.integrity) {
                            return 'squeeze-row integrity-false';
                        }
                        else {
                            return 'squeeze-row';
                        }
                    }, pagination: false }),
                React.createElement(Pagination, { hideOnSinglePage: true, pageSize: 10, total: uploadData.length, showSizeChanger: false, onChange: function (page) {
                        console.log('PAGED DATA', pagedData);
                        setTableData(pagedData[page - 1]);
                        console.log('TABLE DATA', tableData);
                    }, style: {
                        marginTop: '16px',
                    } }))),
            index: 1,
        },
        {
            title: '确认上传',
            content: (React.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                } },
                React.createElement(CheckCircleTwoTone, { twoToneColor: "#52c41a", style: { fontSize: '64px', marginBottom: '24px' } }),
                React.createElement("div", { style: {
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '16px',
                    } },
                    React.createElement("p", null, "\u5171".concat(uploadData.length, "\u6761\u6570\u636E")),
                    React.createElement("p", null, "\u5BFC\u5165".concat(uploadData.filter(function (item) { return item.id !== 0; }).length, "\u6761\u6570\u636E\u6210\u529F")),
                    errArray.length > 0 && (React.createElement("p", { className: "integrity-false" }, "\u5BFC\u5165".concat(errArray.length, "\u6761\u6570\u636E\u5931\u8D25")))))),
            index: 2,
        },
    ];
    return (React.createElement("div", null,
        React.createElement(Button, { type: "primary", ghost: true, onClick: function () { return setModalVisible(true); } }, "\u5BFC\u5165\u6570\u636E"),
        React.createElement("style", null, "\n        .integrity-false {\n            color: red;\n        }\n        .squeeze-row .ant-table-cell {\n            padding-top: 8px;\n            padding-bottom: 8px;\n        }\n      "),
        React.createElement(Modal, { className: "isvzhukuaizkgl", visible: modalVisible, onCancel: handleCancel, width: 750, title: '导入数据', footer: React.createElement("span", { className: "steps-action" },
                currentStep === 0 && (React.createElement("div", { style: { textAlign: 'left' } },
                    React.createElement("span", { style: {
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '12px',
                        } }, "\u5F53\u524D\u6700\u591A\u53EA\u5141\u8BB8\u5BFC\u51651000\u6761\u6570\u636E\uFF0C\u4E14\u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC720MB"),
                    React.createElement("span", { style: {
                            display: 'block',
                            marginBottom: '8px',
                            textAlign: 'left',
                            color: '#ccc',
                            fontSize: '12px',
                        } },
                        "\u4EC5\u652F\u6301",
                        React.createElement("span", { style: { color: '#666' } }, "(*.xls\u548C*.xlsx)"),
                        "\u6587\u4EF6"))),
                currentStep > 0 && currentStep !== steps.length - 1 && !loading && (React.createElement(Button, { style: { margin: '0 8px' }, onClick: function () { return prev(); } }, "\u4E0A\u4E00\u6B65")),
                currentStep < steps.length - 1 && currentStep !== 0 && !loading && (React.createElement(Button, { type: "primary", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    setLoading(true);
                                    return [4 /*yield*/, next()];
                                case 1:
                                    _a.sent();
                                    setLoading(false);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, "\u4E0B\u4E00\u6B65")),
                currentStep > 0 && currentStep !== steps.length - 1 && loading && (React.createElement(Button, { style: { margin: '0 8px' }, disabled: true }, "\u4E0A\u4E00\u6B65")),
                currentStep < steps.length - 1 && currentStep !== 0 && loading && (React.createElement(Button, { type: "primary", disabled: true, icon: React.createElement(LoadingOutlined, null) }, "\u5BFC\u5165\u4E2D...")),
                currentStep === steps.length - 1 && (React.createElement("span", null,
                    React.createElement(Button, { type: "primary", onClick: function () {
                            notification.open({
                                message: "\u5BFC\u5165\u6210\u529F",
                                type: 'success',
                            });
                            initUpload();
                            setModalVisible(false);
                        } }, "\u5B8C\u6210"),
                    React.createElement(Button, { type: "primary", onClick: function () {
                            initUpload();
                        } }, "\u518D\u6B21\u5BFC\u5165")))) },
            React.createElement(Steps, { current: currentStep }, steps.map(function (item) { return (React.createElement(Steps.Step, { key: item.index, title: item.title })); })),
            React.createElement("div", { className: "steps-content", style: {
                    marginTop: '24px',
                    marginBottom: '24px',
                } }, steps[currentStep].content))));
};
export { ImportDialog };
