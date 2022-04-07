import FormField from '../../src/runtime/SelectLeaseField/mobile';
import createReactClass from 'create-react-class';
var Field = createReactClass({
    mixins: [FormField],
    componentWillMount: function () {
        this.fieldWillMount && this.fieldWillMount();
    },
    componentDidMount: function () {
        this.fieldDidMount && this.fieldDidMount();
    },
    componentDidUpdate: function () {
        this.fieldDidUpdate && this.fieldDidUpdate();
    },
    render: function () {
        if (this.fieldRender) {
            return this.fieldRender();
        }
        return null;
    },
});
export default Field;
