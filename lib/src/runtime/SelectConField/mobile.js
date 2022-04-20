var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Drawer, InputItem, SearchBar, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { FancyList } from '../../components/fancyLists';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
import { searchBarChange } from '../../utils/searchUtils';
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
    handleOk: function () {
        throw new Error('Function not implemented.');
    },
    handleCancel: function () {
        this.setState({
            showElem: 'none',
        });
    },
    methods: function () {
        var _this = this;
        return {
            onOpenChange: function () {
                var form = _this.props.form;
                var project = form.getFieldValue('Autopro');
                if (!project) {
                    return Toast.info('请先选择项目', 1);
                }
                var newData = _this.state.allData;
                _this.asyncSetFieldProps(newData);
                _this.setState({
                    showElem: 'inherit',
                });
            },
            handleClick: function (item) {
                var form = _this.props.form;
                console.log(item);
                _this.setState({ inputvalue: item.name, showElem: 'none' }, function () {
                    form.setFieldValue('SelectCon', item.name);
                    form.setFieldExtendValue('SelectCon', item.name);
                    form.setFieldValue('Conmoney', item.money);
                    form.setFieldExtendValue('Conmoney', item.money);
                    form.setFieldValue('Selectjia', item.party_a);
                    form.setFieldExtendValue('Selectjia', item.party_a);
                });
            },
            onSubmit: function (value) {
                var data = _this.state.allData;
                data.name = value;
                _this.asyncSetFieldProps(data);
            },
            onSearchBarChange: function (value) {
                searchBarChange(_this, value, '');
            },
        };
    },
    asyncSetFieldProps: function (data) {
        var _this = this;
        var promise = asyncSetProps(_this, data, 'SelectCon', 'lease_completion_settlement');
        promise.then(function (res) {
            _this.setState({
                listData: __spreadArray([], res.dataArray, true),
            });
        });
    },
    //   fieldDidUpdate() {
    //     if (!this.props.runtimeProps.viewMode) {
    //       console.log('发起页：fieldDidUpdate');
    //       const editData = {
    //         hanmoney: 0,
    //         nomoney: 0,
    //         detailname: '',
    //         detailedData: [], //物资明细
    //       };
    //       if (this.state.Inputmoney1) {
    //         editData.hanmoney = Number(this.state.Inputmoney1);
    //       }
    //       if (this.state.Inputmoney2) {
    //         editData.nomoney = Number(this.state.Inputmoney2);
    //       }
    //       editData.detailname = this.state.chenkdata;
    //       editData.detailedData = this.state.materialList;
    //       const { form } = this.props;
    //       form.setFieldValue('TestPur', editData);
    //       form.setFieldExtendValue('TestPur', {
    //         data: editData,
    //       });
    //     }
    //   },
    fieldRender: function () {
        // fix in codepen
        var form = this.props.form;
        var field = form.getFieldInstance('SelectCon');
        var label = form.getFieldProp('SelectCon', 'label');
        var required = form.getFieldProp('SelectCon', 'required');
        var parser = [
            {
                key: 'name',
                label: '合同名称',
                index: 1,
                title: true,
            },
            {
                key: 'party_a',
                label: '甲方',
                index: 2,
            },
            {
                key: 'money',
                label: '合同金额',
                index: 3,
            },
        ];
        var sidebar = (React.createElement("div", { style: { width: '100vw' } },
            React.createElement(SearchBar, { value: this.state.SearchBarvalue, placeholder: "\u8BF7\u8F93\u5165", onSubmit: this.methods().onSubmit, onChange: this.methods().onSearchBarChange, onCancel: this.handleCancel, showCancelButton: true }),
            React.createElement(FancyList, { data: parseListData(this.state.listData, parser), itemClick: this.methods().handleClick })));
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
                                        React.createElement(InputItem, { editable: false, className: "ant-input m-mobile-inner-input", type: "text", placeholder: "\u8BF7\u9009\u62E9", value: this.state.inputvalue, onClick: this.methods().onOpenChange })))))),
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
                        }, sidebar: sidebar, onOpenChange: this.methods().onOpenChange }), document.getElementById('MF_APP'))))));
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
