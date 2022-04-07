import stringWidth from 'string-width';
var normalizeSpacing = function (str, length) {
    var normalStr;
    if (!str) {
        normalStr = '暂无';
    }
    else {
        normalStr = str.toString();
    }
    var strWidth = stringWidth(normalStr);
    if (strWidth < 5) {
        normalStr = normalStr + ' '.repeat(5 - strWidth);
    }
    strWidth = stringWidth(normalStr);
    if (strWidth < length) {
        var parsedString = normalStr + ' '.repeat(length - strWidth);
        return parsedString + '\t';
    }
    return normalStr;
};
var parsePrintString = function (data, columns, auxString) {
    var titleString = "\n ".concat(columns
        .map(function (column) { return normalizeSpacing(column.title, column.length); })
        .join(' | '));
    var dataString = '';
    data.forEach(function (row) {
        dataString += "\n ".concat(columns
            .map(function (column) { return normalizeSpacing(row[column.name], column.length); })
            .join(' | '));
    });
    var aux = auxString ? "\n ".concat(auxString) : '';
    return "".concat(titleString).concat(dataString).concat(aux);
};
export { parsePrintString };
