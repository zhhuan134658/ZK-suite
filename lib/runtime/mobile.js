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
import React from "react";
import SwapDemoSuite from "../src/runtime/mobile";
import createReactClass from "create-react-class";
import SelectProField from "./SelectProField/mobile";
import SelectProtwoField from "./SelectProtwoField/mobile";
import SelectTbproField from "./SelectTbproField/mobile";
import SelectHeField from "./SelectHeField/mobile";
import SelectRelatedField from "./SelectRelatedField/mobile";
import SelectHeshouField from "./SelectHeshouField/mobile";
import SelectLeaseField from "./SelectLeaseField/mobile";
import SelectZuField from "./SelectZuField/mobile";
import SelectFenField from "./SelectFenField/mobile";
import SelectOtherField from "./SelectOtherField/mobile";
import SelectOtherZhiField from "./SelectOtherZhiField/mobile";
import SelectConField from "./SelectConField/mobile";
import SelectjiaField from "./SelectjiaField/mobile";
import SelectLaoField from "./SelectLaoField/mobile";
import SelectSpoField from "./SelectSpoField/mobile";
import SelecTickeField from "./SelecTickeField/mobile";
import SelecTickefaField from "./SelecTickefaField/mobile";
import TestMaterField from "./TestMaterField/mobile";
import TestCollectionField from "./TestCollectionField/mobile";
import TestLabourField from "./TestLabourField/mobile";
import TestSubconField from "./TestSubconField/mobile";
import TestRegistField from "./TestRegistField/mobile";
import SelectAccField from "./SelectAccField/mobile";
import CorpSupplierField from "./CorpSupplierField/mobile";
import CorpSupplieryiField from "./CorpSupplieryiField/mobile";
import CorpHouseField from "./CorpHouseField/mobile";
import PositionDesField from "./PositionDesField/mobile";
import TestBiddingField from "./TestBiddingField/mobile";
import TestBidzhiField from "./TestBidzhiField/mobile";
import TestBidshouField from "./TestBidshouField/mobile";
import TestPlanField from "./TestPlanField/mobile";
import TestOrderField from "./TestOrderField/mobile";
import TestOrdernewField from "./TestOrdernewField/mobile";
import TestSheField from "./TestSheField/mobile";
import TestMaterialField from "./TestMaterialField/mobile";
import TestApplicationField from "./TestApplicationField/mobile";
import TestSetField from "./TestSetField/mobile";
import TestPurField from "./TestPurField/mobile";
import TestReturnField from "./TestReturnField/mobile";
import TestExpeField from "./TestExpeField/mobile";
import TestCinField from "./TestCinField/mobile";
import TestOutField from "./TestOutField/mobile";
import TestCunField from "./TestCunField/mobile";
import TestLeaseField from "./TestLeaseField/mobile";
import TestLeconField from "./TestLeconField/mobile";
import TestMachineryField from "./TestMachineryField/mobile";
import TestDemandField from "./TestDemandField/mobile";
import TestInspecField from "./TestInspecField/mobile";
import TestMainField from "./TestMainField/mobile";
import TestOliField from "./TestOliField/mobile";
import TestScienceField from "./TestScienceField/mobile";
import TestOpeningField from "./TestOpeningField/mobile";
import AntdUploadFiled from "./AntdUploadFiled/mobile";
var Suite = createReactClass({
    mixins: [SwapDemoSuite],
    componentWillMount: function () {
        this.suiteWillMount && this.suiteWillMount();
    },
    componentDidMount: function () {
        this.suiteDidMount && this.suiteDidMount();
    },
    componentDidUpdate: function () {
        this.suiteDidUpdate && this.suiteDidUpdate();
    },
    render: function () {
        var _this = this;
        if (this.suiteRender) {
            return this.suiteRender();
        }
        return (React.createElement("div", { className: "isvzhukuaiwarehousing" },
            React.createElement("div", { className: "mobile-runtime-wrap" }, this.props.form.getFields().map(function (field) {
                if (field.props.commonBizType === 'SelectProField' || field.props.commonBizType === 'SelectPro') {
                    return React.createElement(SelectProField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectProtwoField' || field.props.commonBizType === 'SelectProtwo') {
                    return React.createElement(SelectProtwoField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectTbproField' || field.props.commonBizType === 'SelectTbpro') {
                    return React.createElement(SelectTbproField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectHeField' || field.props.commonBizType === 'SelectHe') {
                    return React.createElement(SelectHeField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectRelatedField' || field.props.commonBizType === 'SelectRelated') {
                    return React.createElement(SelectRelatedField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectHeshouField' || field.props.commonBizType === 'SelectHeshou') {
                    return React.createElement(SelectHeshouField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectLeaseField' || field.props.commonBizType === 'SelectLease') {
                    return React.createElement(SelectLeaseField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectZuField' || field.props.commonBizType === 'SelectZu') {
                    return React.createElement(SelectZuField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectFenField' || field.props.commonBizType === 'SelectFen') {
                    return React.createElement(SelectFenField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectOtherField' || field.props.commonBizType === 'OtherContract') {
                    return React.createElement(SelectOtherField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectOtherZhiField' || field.props.commonBizType === 'OtherZhisett') {
                    return React.createElement(SelectOtherZhiField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectConField' || field.props.commonBizType === 'SelectCon') {
                    return React.createElement(SelectConField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectjiaField' || field.props.commonBizType === 'Selectjia') {
                    return React.createElement(SelectjiaField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectLaoField' || field.props.commonBizType === 'SelectLao') {
                    return React.createElement(SelectLaoField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectSpoField' || field.props.commonBizType === 'SelectSpo') {
                    return React.createElement(SelectSpoField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelecTickeField' || field.props.commonBizType === 'SelecTicke') {
                    return React.createElement(SelecTickeField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelecTickefaField' || field.props.commonBizType === 'SelecTickefa') {
                    return React.createElement(SelecTickefaField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestMaterField' || field.props.commonBizType === 'TestMater') {
                    return React.createElement(TestMaterField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestCollectionField' || field.props.commonBizType === 'TestCollection') {
                    return React.createElement(TestCollectionField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestLabourField' || field.props.commonBizType === 'TestLabour') {
                    return React.createElement(TestLabourField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestSubconField' || field.props.commonBizType === 'TestSubcon') {
                    return React.createElement(TestSubconField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestRegistField' || field.props.commonBizType === 'TestRegist') {
                    return React.createElement(TestRegistField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'SelectAccField' || field.props.commonBizType === 'SelectAcc') {
                    return React.createElement(SelectAccField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'CorpSupplierField' || field.props.commonBizType === 'CorpSupplier') {
                    return React.createElement(CorpSupplierField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'CorpSupplieryiField' || field.props.commonBizType === 'CorpSupplieryi') {
                    return React.createElement(CorpSupplieryiField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'CorpHouseField' || field.props.commonBizType === 'CorpHouse') {
                    return React.createElement(CorpHouseField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'PositionDesField' || field.props.commonBizType === 'PositionDes') {
                    return React.createElement(PositionDesField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestBiddingField' || field.props.commonBizType === 'TestBidding') {
                    return React.createElement(TestBiddingField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestBidzhiField' || field.props.commonBizType === 'TestBidzhi') {
                    return React.createElement(TestBidzhiField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestBidshouField' || field.props.commonBizType === 'TestBidshou') {
                    return React.createElement(TestBidshouField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestPlanField' || field.props.commonBizType === 'TestPlan') {
                    return React.createElement(TestPlanField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestOrderField' || field.props.commonBizType === 'TestOrder') {
                    return React.createElement(TestOrderField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestOrdernewField' || field.props.commonBizType === 'TestOrdernew') {
                    return React.createElement(TestOrdernewField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestSheField' || field.props.commonBizType === 'TestShe') {
                    return React.createElement(TestSheField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestMaterialField' || field.props.commonBizType === 'TestMaterial') {
                    return React.createElement(TestMaterialField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestApplicationField' || field.props.commonBizType === 'TestApplication') {
                    return React.createElement(TestApplicationField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestSetField' || field.props.commonBizType === 'TestSet') {
                    return React.createElement(TestSetField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestPurField' || field.props.commonBizType === 'TestPur') {
                    return React.createElement(TestPurField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestReturnField' || field.props.commonBizType === 'TestReturn') {
                    return React.createElement(TestReturnField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestExpeField' || field.props.commonBizType === 'TestExpe') {
                    return React.createElement(TestExpeField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestCinField' || field.props.commonBizType === 'TestCin') {
                    return React.createElement(TestCinField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestOutField' || field.props.commonBizType === 'TestOut') {
                    return React.createElement(TestOutField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestCunField' || field.props.commonBizType === 'TestCun') {
                    return React.createElement(TestCunField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestLeaseField' || field.props.commonBizType === 'TestLease') {
                    return React.createElement(TestLeaseField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestLeconField' || field.props.commonBizType === 'TestLecon') {
                    return React.createElement(TestLeconField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestMachineryField' || field.props.commonBizType === 'TestMachinery') {
                    return React.createElement(TestMachineryField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestDemandField' || field.props.commonBizType === 'TestDemand') {
                    return React.createElement(TestDemandField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestInspecField' || field.props.commonBizType === 'TestInspec') {
                    return React.createElement(TestInspecField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestMainField' || field.props.commonBizType === 'TestMain') {
                    return React.createElement(TestMainField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestOliField' || field.props.commonBizType === 'TestOli') {
                    return React.createElement(TestOliField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestScienceField' || field.props.commonBizType === 'TestScience') {
                    return React.createElement(TestScienceField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'TestOpeningField' || field.props.commonBizType === 'TestOpening') {
                    return React.createElement(TestOpeningField, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                if (field.props.commonBizType === 'AntdUploadFiled' || field.props.commonBizType === 'AntdUpload') {
                    return React.createElement(AntdUploadFiled, __assign({}, _this.props, { bizAlias: field.props.bizAlias }));
                }
                return field.renderComponent();
            }))));
    },
});
export default Suite;
