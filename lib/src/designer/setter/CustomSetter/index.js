import React from 'react';
import { Switch } from 'antd';
import './style.less';
var SuiteSetterDemo = {
    handleChange: function (checked) {
        this.setFieldProps('leaveReason', {
            hidden: !checked,
        });
    },
    setterRender: function () {
        return (React.createElement("div", null,
            React.createElement("div", null, this.props.label),
            React.createElement(Switch, { defaultChecked: this.props.defaultChecked, onChange: this.handleChange })));
    },
};
export default SuiteSetterDemo;
