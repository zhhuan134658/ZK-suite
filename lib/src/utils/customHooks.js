import { useEffect, useState } from 'react';
var useInit = function (callback) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _a = useState(false), init = _a[0], setInit = _a[1];
    useEffect(function () {
        if (!init) {
            setInit(true);
            callback.apply(void 0, args);
        }
    }, [init, callback, args]);
    var resetInit = function () {
        setInit(false);
    };
    return [resetInit];
};
export { useInit };
