import './pc.less';
var SwapDemoSuite = {
    suiteDidMount: function () {
        var form = this.props.form;
        // const hiddenReason = form.getSuiteProp('hiddenReason');
        // form.setFieldValue('DateFielddate', new Date().toLocaleDateString());
        var IsAutoOutExtendValue = form.getFieldExtendValue('IsAutoOut');
        var outPeopleField = form.getFieldInstance('outPeople');
        console.log(IsAutoOutExtendValue);
        if ((IsAutoOutExtendValue === null || IsAutoOutExtendValue === void 0 ? void 0 : IsAutoOutExtendValue.key) === 'option_2') {
        }
        this.formDataLinkagehandler();
        // this.asyncSetFieldProps();
        this.formDataWatch();
    },
    //监听值
    formDataWatch: function () {
        var _this = this;
        var form = this.props.form;
        //出库人是否隐藏
        var outPeopleField = form.getFieldInstance('outPeople');
        form.onFieldExtendValueChange('IsAutoOut', function (extendValue) {
            console.log(extendValue);
            if (extendValue.key === '2') {
            }
            else {
                // outPeopleField.show();
            }
        });
        //监听项目类型
        var SelectHeField = form.getFieldInstance('SelectHe');
        form.onFieldExtendValueChange('RadioField', function (extendValue) {
            form.setFieldValue('Selectbaopro', '');
            form.setFieldValue('SelectHe', '');
            form.setFieldExtendValue('SelectHe', '');
            if (extendValue.label === '投标保证金支出' ||
                extendValue.label === '投标保证金退回') {
                var newdate = { isProject: '' };
                newdate.isProject = '2';
                _this.asyncSetFieldProps(newdate, 'Selectbaopro');
            }
            else {
                // SelectHeField.show();
                var newdate = { isProject: '' };
                newdate.isProject = '1';
                _this.asyncSetFieldProps(newdate, 'Selectbaopro');
            }
        });
        form.onFieldExtendValueChange('Autoprobei', function (extendValue) {
            var newdate = { project_name: '' };
            try {
                newdate.project_name = extendValue.label;
                _this.asyncSetFieldProps(newdate, 'Autoprobei');
            }
            catch (e) {
                form.setFieldValue('Ljjiemoney', '');
                form.setFieldValue('Ljhuanmoney', '');
                form.setFieldValue('Beimoneyyu', '');
                form.setFieldValue('MoneyFeidk', '');
                form.setFieldValue('MoneyFeigh', '');
                console.log('343');
            }
            //   newdate.project_name = extendValue.label;
            //   this.asyncSetFieldProps(newdate, 'Autoprobei');
        });
    },
    // 关联选项
    formDataLinkagehandler: function () { },
    // 动态获取业务数据
    asyncSetFieldProps: function (vlauedata, apiname) {
        var _a = this.props, form = _a.form, spi = _a.spi;
        var SelectbaoproField = form.getFieldInstance(apiname);
        var key = SelectbaoproField.getProp('id');
        var value = '1';
        var bizAsyncData = [
            {
                key: key,
                bizAlias: apiname,
                extendValue: vlauedata,
                value: value,
            },
        ];
        spi
            .refreshData({
            modifiedBizAlias: [apiname],
            bizAsyncData: bizAsyncData,
        })
            .then(function (res) {
            var newarr;
            try {
                newarr = JSON.parse(res.dataList[0].value).data;
            }
            catch (e) { }
            if (apiname == 'Selectbaopro') {
                form.setFieldProp(apiname, 'options', newarr);
            }
            else if (apiname == 'Autoprobei') {
                console.log(newarr);
                form.setFieldValue('Ljjiemoney', newarr.lj_jie);
                form.setFieldExtendValue('Ljjiemoney', newarr.lj_jie);
                form.setFieldValue('Ljhuanmoney', newarr.lj_huan);
                form.setFieldExtendValue('Ljhuanmoney', newarr.lj_huan);
                form.setFieldValue('Beimoneyyu', newarr.bei_yu);
                form.setFieldExtendValue('Beimoneyyu', newarr.bei_yu);
                form.setFieldValue('MoneyFeidk', newarr.fybx_dk_spz);
                form.setFieldExtendValue('MoneyFeidk', newarr.fybx_dk_spz);
                form.setFieldValue('MoneyFeigh', newarr.re_money_spz);
                form.setFieldExtendValue('MoneyFeigh', newarr.re_money_spz);
            }
        });
    },
};
export default SwapDemoSuite;
