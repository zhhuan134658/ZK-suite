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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { fpAdd, fpDivide, fpMul, toFixed } from '../utils/fpOperations';
var deleteRowForTaxCalcTables = function (_this, row) {
    var dataSource = __spreadArray([], _this.state.dataSource, true);
    var remainArray = dataSource.filter(function (item) { return item.id !== row.id; });
    _this.setState({
        dataSource: remainArray,
    });
    var taxedArray = [];
    taxedArray = remainArray.filter(function (item) {
        if (item.amount_tax) {
            return item;
        }
    });
    taxedArray = taxedArray.map(function (item) {
        return item.amount_tax;
    });
    var taxfreeArray = remainArray.filter(function (item) {
        if (item.no_amount_tax) {
            return item;
        }
    });
    taxfreeArray = taxfreeArray.map(function (item) {
        return item.no_amount_tax;
    });
    var totalTaxed, totalTaxfree;
    if (taxedArray.length > 0) {
        taxedArray.forEach(function (value, index) {
            var number = parseFloat(value);
            taxedArray[index] = number;
        });
        totalTaxed = taxedArray.reduce(fpAdd, 0); // Add up all taxed price
        totalTaxed = toFixed(totalTaxed, 2);
    }
    else {
        totalTaxed = 0;
    }
    if (taxfreeArray.length > 0) {
        taxfreeArray.forEach(function (value, index) {
            var number = parseFloat(value);
            taxfreeArray[index] = number;
        });
        totalTaxfree = taxfreeArray.reduce(fpAdd, 0); // Add up all tax free price
        totalTaxfree = toFixed(totalTaxfree, 2);
    }
    else {
        totalTaxfree = 0;
    }
    _this.setState({
        Inputmoney1: totalTaxed,
        Inputmoney2: totalTaxfree,
    });
};
var handleSaveTaxTable = function (_this, dataList, row, key) {
    var regex = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    var newData = dataList;
    var index = newData.findIndex(function (item) { return row.id === item.id; });
    var item = newData[index];
    if (regex.test(row['wz_number'])) {
        row['det_quantity'] = row['wz_number'];
    }
    //   if (!regex.test(row['det_quantity'])) {
    //     row['det_quantity'] = 0;
    //   }
    newData.splice(index, 1, __assign(__assign({}, item), row));
    //   for (const key in row) {
    //     if (row[key]) {
    //       row[key] = row[key].toString();
    //     }
    //   }
    //   if (!(regex.test(row.tax_rate) || regex.test(row.det_quantity))) {
    //     return newData;
    //   }
    switch (key) {
        case 'no_unit_price':
            if (!regex.test(row.unit_price)) {
                _this.setState({
                    fixedColumn: key,
                });
            }
            if (regex.test(row.no_unit_price) && regex.test(row.tax_rate)) {
                var taxBase = 1 + row.tax_rate * 0.01;
                var taxedUnitPrice = fpMul(row.no_unit_price, taxBase);
                console.log('2213123231231', taxedUnitPrice);
                newData[index].unit_price = toFixed(taxedUnitPrice, 2);
            }
            else if (!regex.test(row.no_unit_price) &&
                regex.test(row.tax_rate) &&
                regex.test(row.unit_price)) {
                var taxBase = 1 + row.tax_rate * 0.01;
                var taxfreeUnitPrice = fpDivide(row.unit_price, taxBase);
                newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
            }
            break;
        case 'unit_price':
            if (!regex.test(row.no_unit_price)) {
                _this.setState({
                    fixedColumn: key,
                });
            }
            if (regex.test(row.unit_price) && regex.test(row.tax_rate)) {
                var taxBase = 1 + row.tax_rate * 0.01;
                var taxfreeUnitPrice = fpDivide(row.unit_price, taxBase);
                newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
            }
            else if (!regex.test(row.unit_price) &&
                regex.test(row.tax_rate) &&
                regex.test(row.no_unit_price)) {
                var taxBase = 1 + row.tax_rate * 0.01;
                var taxedUnitPrice = fpMul(row.no_unit_price, taxBase);
                var unitPrice = toFixed(taxedUnitPrice, 2);
                newData[index].unit_price = unitPrice;
                var amountTax = fpMul(unitPrice, row.det_quantity);
                newData[index].amount_tax = toFixed(amountTax, 2);
            }
            if (regex.test(row.unit_price) && regex.test(row.det_quantity)) {
                var totalTaxed = fpMul(row.unit_price, row.det_quantity);
                newData[index].amount_tax = toFixed(totalTaxed, 2);
                if (regex.test(row.tax_rate)) {
                    var taxBase = 1 + row.tax_rate * 0.01;
                    var totalTaxed_1 = fpMul(row.unit_price, row.det_quantity);
                    var totalTaxfree = fpDivide(totalTaxed_1, taxBase);
                    newData[index].no_amount_tax = toFixed(totalTaxfree, 2);
                    var taxRate = row.tax_rate * 0.01;
                    var totalTaxAmount = fpMul(totalTaxfree, taxRate);
                    newData[index].tax_amount = toFixed(totalTaxAmount, 2);
                }
            }
            break;
        case 'tax_rate':
            if (regex.test(row.no_unit_price) && !regex.test(row.unit_price)) {
                if (_this.state.fixedColumn === 'unit_price') {
                    var taxedUnitPrice = row.unit_price;
                    if (regex.test(row.tax_rate)) {
                        var taxBase = 1 + row.tax_rate * 0.01;
                        var taxfreeUnitPrice = fpDivide(taxedUnitPrice, taxBase);
                        newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
                        newData[index].no_amount_tax = toFixed(fpMul(taxfreeUnitPrice, row.det_quantity), 2);
                        newData[index].amount_tax = toFixed(fpMul(row.unit_price, row.det_quantity), 2);
                    }
                }
                else {
                    var taxBase = 1 + row.tax_rate * 0.01;
                    var taxedUnitPrice = fpMul(row.no_unit_price, taxBase);
                    newData[index].unit_price = toFixed(taxedUnitPrice, 2);
                    newData[index].no_amount_tax = toFixed(fpMul(row.no_unit_price, row.det_quantity), 2);
                    newData[index].amount_tax = toFixed(fpMul(newData[index].unit_price, newData[index].det_quantity), 2);
                }
            }
            else if (!regex.test(row.no_unit_price) && regex.test(row.unit_price)) {
                var taxBase = 1 + row.tax_rate * 0.01;
                var taxfreeUnitPrice = fpDivide(row.unit_price, taxBase);
                newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
                var totalTaxed = fpMul(row.unit_price, row.det_quantity);
                newData[index].amount_tax = toFixed(totalTaxed, 2);
                var totalTaxfree = fpMul(row.det_quantity, taxfreeUnitPrice);
                newData[index].no_amount_tax = toFixed(totalTaxfree, 2);
                var totalTaxAmount = fpAdd(totalTaxed, -totalTaxfree);
                newData[index].tax_amount = toFixed(totalTaxAmount, 2);
            }
            else if (regex.test(row.no_unit_price) &&
                regex.test(row.unit_price) &&
                regex.test(row.tax_rate)) {
                if (_this.state.fixedColumn === 'unit_price') {
                    var taxedUnitPrice = row.unit_price;
                    var taxBase = 1 + row.tax_rate * 0.01;
                    var taxfreeUnitPrice = fpDivide(taxedUnitPrice, taxBase);
                    newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
                    newData[index].no_amount_tax = toFixed(fpMul(taxfreeUnitPrice, row.det_quantity), 2);
                    newData[index].amount_tax = toFixed(fpMul(newData[index].unit_price, row.det_quantity), 2);
                }
                else {
                    var taxfreeUnitPrice = row.no_unit_price;
                    var taxBase = 1 + row.tax_rate * 0.01;
                    var taxedUnitPrice = fpMul(taxfreeUnitPrice, taxBase);
                    newData[index].unit_price = toFixed(taxedUnitPrice, 2);
                    newData[index].no_amount_tax = toFixed(fpMul(taxfreeUnitPrice, row.det_quantity), 2);
                    newData[index].amount_tax = toFixed(fpMul(newData[index].unit_price, row.det_quantity), 2);
                }
            }
            if (regex.test(row.no_unit_price) &&
                regex.test(row.det_quantity) &&
                regex.test(row.tax_rate)) {
                var totalTaxfree = fpMul(row.no_unit_price, row.det_quantity);
                var totalTaxed = fpMul(newData[index].unit_price, row.det_quantity);
                var totalTaxAmount = fpAdd(totalTaxed, -totalTaxfree);
                newData[index].tax_amount = toFixed(totalTaxAmount, 2);
                newData[index].amount_tax = toFixed(totalTaxed, 2);
            }
            break;
        default:
            break;
    }
    if (key !== 'unit_price') {
        if (regex.test(row.no_unit_price) && regex.test(row.det_quantity)) {
            var totalTaxfree = fpMul(row.no_unit_price, row.det_quantity);
            if (regex.test(row.tax_rate)) {
                var taxRate = row.tax_rate * 0.01;
                var totalTaxAmount = fpMul(totalTaxfree, taxRate);
                var totalTaxed = fpMul(newData[index].unit_price, row.det_quantity);
                newData[index].tax_amount = toFixed(totalTaxAmount, 2);
                newData[index].amount_tax = toFixed(totalTaxed, 2);
            }
            newData[index].no_amount_tax = toFixed(totalTaxfree, 2);
        }
    }
    for (var key_1 in newData[index]) {
        if (newData[index][key_1]) {
            newData[index][key_1] = newData[index][key_1].toString();
        }
    }
    return newData;
};
var handleTaxTableStatistics = function (_this, dataArray) {
    var allArray;
    if (dataArray && dataArray.length > 0) {
        allArray = __spreadArray([], dataArray, true);
    }
    else {
        allArray = __spreadArray([], _this.state.dataSource, true);
    }
    var taxedArray = allArray.filter(function (item) {
        if (item.amount_tax) {
            return item;
        }
    });
    taxedArray = taxedArray.map(function (item) {
        return item.amount_tax;
    });
    var taxfreeArray = allArray.filter(function (item) {
        if (item.no_amount_tax) {
            return item;
        }
    });
    taxfreeArray = taxfreeArray.map(function (item) {
        return item.no_amount_tax;
    });
    if (taxedArray.length > 0) {
        taxedArray.forEach(function (e, index) {
            var number = parseFloat(e);
            taxedArray[index] = number;
        });
        var taxedSum = taxedArray.reduce(fpAdd, 0); // Add up all taxed price
        _this.setState({
            Inputmoney1: toFixed(taxedSum, 2),
        });
    }
    if (taxfreeArray.length > 0) {
        taxfreeArray.forEach(function (e, index) {
            var number = parseFloat(e);
            taxfreeArray[index] = number;
        });
        var taxfreeSum = taxfreeArray.reduce(fpAdd, 0); // Add up all tax free price
        _this.setState({
            Inputmoney2: toFixed(taxfreeSum, 2),
        });
    }
};
export { deleteRowForTaxCalcTables, handleSaveTaxTable, handleTaxTableStatistics, };
