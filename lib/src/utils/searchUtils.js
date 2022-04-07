var searchBarSubmit = function (_this, value, type) {
    var newData = _this.state.allData;
    console.log('new submit', value);
    newData.name = value;
    _this.asyncSetFieldProps(newData, type);
};
var searchBarChange = function (_this, value, type) {
    if (!value) {
        searchBarSubmit(_this, '', type);
    }
    _this.setState({
        SearchBarvalue: value,
    });
};
var searchBarSubmitRK = function (_this, value, rk_id) {
    var newData = _this.state.allData;
    newData.name = value;
    newData.page = 1;
    newData.rk_id = [rk_id];
    console.log('searchParams', newData);
    _this.setState({
        allData: newData,
    });
    _this.asyncSetFieldProps(newData);
};
export { searchBarSubmit, searchBarChange, searchBarSubmitRK };
