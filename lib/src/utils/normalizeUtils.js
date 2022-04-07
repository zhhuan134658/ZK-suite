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
var traverseTree = function (node, fn) {
    if (!node || !node.children) {
        return;
    }
    node = fn(node);
    node.children.forEach(function (item) {
        traverseTree(item, fn);
    });
};
var parseTreeData = function (treeNode) {
    treeNode['label'] = treeNode['title'];
    treeNode['value'] = JSON.stringify({
        key: treeNode['key'],
        title: treeNode['title'],
    });
    return treeNode;
};
var traverseAndParseTreeData = function (tree) {
    var T = tree;
    traverseTree(T, parseTreeData);
    console.log('TREE', T);
    return T;
};
var parseListData = function (ListData, parser) {
    var parserKeys = parser.map(function (item) { return item.key; });
    var parseList = __spreadArray([], ListData, true);
    var parsedList = [];
    parseList.forEach(function (item) {
        var parsedItem = __assign(__assign({}, item), { children: [] });
        var _loop_1 = function (key) {
            if (parserKeys.includes(key)) {
                var parseEntry = parser.filter(function (parser) { return parser.key === key; })[0];
                var newItem = {
                    itemLabel: '',
                    itemValue: '',
                    index: 0,
                };
                newItem.itemLabel = parseEntry.label;
                newItem.itemValue = item[key];
                if (parseEntry.icon) {
                    newItem['itemIcon'] = parseEntry.icon;
                }
                if (parseEntry.index) {
                    newItem['index'] = parseEntry.index;
                }
                if (parseEntry.title) {
                    newItem['title'] = true;
                }
                if (item['xuan'] === 1) {
                    newItem.selected = true;
                }
                parsedItem.children.push(newItem);
            }
        };
        for (var key in item) {
            _loop_1(key);
        }
        parsedItem.children.sort(function (a, b) { return a.index - b.index; });
        parsedList.push(parsedItem);
    });
    return parsedList;
};
var searchTree = function (tree, key, value) {
    if (tree[key] === value) {
        return tree;
    }
    else if (tree['children']) {
        var res = null;
        for (var i = 0; i < tree['children'].length; i++) {
            res = searchTree(tree['children'][i], key, value);
            if (res) {
                break;
            }
        }
        return res;
    }
    return null;
};
var uniqueArrayByKey = function (arr, keys) {
    var res = [];
    var hash = new Map();
    var _loop_2 = function (i) {
        var key = keys.map(function (key) { return arr[i][key]; }).join(',');
        if (!hash.has(key)) {
            hash.set(key, true);
            res.push(arr[i]);
        }
    };
    for (var i = 0; i < arr.length; i++) {
        _loop_2(i);
    }
    return res;
};
export { traverseAndParseTreeData, parseListData, searchTree, uniqueArrayByKey, };
