/**
 * 动态加载script脚本
 *
 * @param {string} url js链接
 * @return {Promise<void>} 返回Promise
 * @example
 * loadScript('https://h5.dingtalk.com').then(() => {
 *  console.log('done');
 * });
 */
function loadScript(url, attributes) {
    return new Promise(function (resolve, reject) {
        var parent = document.head || document.body || document.documentElement;
        var script = document.createElement('script');
        var loadend = function () {
            script.onerror = null;
            script.onload = null;
        };
        if (attributes === null || attributes === void 0 ? void 0 : attributes.id) {
            script.id = attributes.id;
        }
        script.onerror = function () {
            var err = new Error("Failed to load script: ".concat(url));
            loadend();
            reject(err);
        };
        script.onload = function () {
            loadend();
            resolve(url);
        };
        script.async = true;
        script.src = url;
        script.crossOrigin = 'anonymous';
        parent.appendChild(script);
    });
}
export default loadScript;
