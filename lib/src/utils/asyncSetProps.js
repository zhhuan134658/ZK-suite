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
var asyncSetProps = function (_this, value, bizAlias, biaoName, altProjectName, projectBiz) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, form, spi, projectBizAlias, ProjectName, biz, keyField, key, bizAsyncData, promise, res, resolveData, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _this.props, form = _a.form, spi = _a.spi;
                projectBizAlias = projectBiz ? projectBiz : 'Autopro';
                ProjectName = form.getFieldValue(projectBizAlias);
                console.log('123456', projectBizAlias, ProjectName, form);
                value.project_name = ProjectName;
                biz = bizAlias;
                if (altProjectName) {
                    value.project_name = altProjectName;
                }
                if (biaoName) {
                    value.biao_name = biaoName;
                }
                keyField = form.getFieldInstance(biz);
                key = keyField.getProp('id');
                bizAsyncData = [
                    {
                        key: key,
                        bizAlias: biz,
                        extendValue: value,
                        value: '1',
                    },
                ];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, spi.refreshData({
                        modifiedBizAlias: [biz],
                        bizAsyncData: bizAsyncData,
                    })];
            case 2:
                promise = _b.sent();
                res = promise;
                resolveData = {
                    dataArray: undefined,
                    extendArray: undefined,
                    currentPage: undefined,
                    totalCount: undefined,
                    message: undefined,
                };
                try {
                    resolveData.dataArray = JSON.parse(res.dataList[0].value).data;
                    resolveData.currentPage = JSON.parse(res.dataList[0].value).page;
                    resolveData.extendArray = JSON.parse(res.dataList[0].extendValue);
                    resolveData.totalCount = JSON.parse(res.dataList[0].value).count;
                    resolveData.message = JSON.parse(res.dataList[0].value).msg;
                    return [2 /*return*/, resolveData];
                }
                catch (e) {
                    throw new Error(e);
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                throw new Error(e_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
var uploadAsyncSetProps = function (_this, data, type, bizAlias) { return __awaiter(void 0, void 0, void 0, function () {
    var promise, resolveData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, asyncSetProps(_this, data, bizAlias)];
            case 1:
                promise = _a.sent();
                resolveData = {
                    OSSData: null,
                    uploadData: null,
                    modelUrl: null,
                };
                res = promise;
                switch (type) {
                    case 'jsapi':
                        resolveData.OSSData = res.dataArray;
                        break;
                    case 'upload':
                        resolveData.uploadData = res.dataArray;
                        break;
                    case 'ModelType':
                        resolveData.modelUrl = res.dataArray[0]['url'];
                        break;
                    default:
                        throw new Error('type error');
                }
                return [2 /*return*/, resolveData];
        }
    });
}); };
var parseTableAsync = function (_this, data, bizAlias) { return __awaiter(void 0, void 0, void 0, function () {
    var form, ProjectName, ck_name, resolve, resolveData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = _this.props.form;
                ProjectName = form.getFieldValue('Autopro');
                ck_name = _this.state.detailname;
                if (ck_name) {
                    data['ck_name'] = ck_name;
                }
                if (!ProjectName) {
                    throw new Error('请先选择项目');
                }
                return [4 /*yield*/, asyncSetProps(_this, data, bizAlias)];
            case 1:
                resolve = _a.sent();
                resolveData = {
                    uploadData: null,
                };
                resolveData.uploadData = resolve.dataArray;
                return [2 /*return*/, resolveData];
        }
    });
}); };
export { asyncSetProps, uploadAsyncSetProps, parseTableAsync };
