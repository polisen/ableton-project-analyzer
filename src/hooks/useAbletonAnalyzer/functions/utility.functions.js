"use strict";
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
exports.__esModule = true;
exports.recursiveFormat = exports.giveNewKeys = exports.getDeviceChainName = exports.fileExtractor = exports.nameExtractor = exports.logFileData = exports.buildDirectoryStructure = exports.stripDuplicatePlugins = exports.stripDuplicateSamples = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var stripDuplicateSamples = function (obj) {
    var arr = [];
    var object = {};
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var Path = value.Path;
        if (!arr.includes(Path))
            object[key] = value;
        arr.push(Path);
    }
    return object;
};
exports.stripDuplicateSamples = stripDuplicateSamples;
var stripDuplicatePlugins = function (obj) {
    var pathObj = { AU: {}, VST3: {}, VST: {} };
    var object = {};
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var Name = value.Name, type = value.type;
        if (pathObj[type][Name])
            continue;
        object[key] = value;
        pathObj[type][Name] = true;
    }
    return object;
};
exports.stripDuplicatePlugins = stripDuplicatePlugins;
var buildDirectoryStructure = function (arr) {
    var obj = {};
    if (arr.length <= 0)
        return {};
    // console.log(arr)
    arr.forEach(function (file) {
        var path = file.path;
        path.split('/').filter(function (f) { return f; }).reduce(function (r, e) {
            return r[e] || (r[e] = {});
        }, obj);
    });
    return obj;
};
exports.buildDirectoryStructure = buildDirectoryStructure;
/**
 * Logs metadata about file.
 * @param {file} File - File<Blob>
 */
var logFileData = function (_a) {
    var name = _a.name, type = _a.type, size = _a.size;
    console.log("User layout file:\n" +
        "name: " +
        name +
        "\n" +
        "type: " +
        type +
        "\n" +
        "size: " +
        size +
        " bytes\n");
};
exports.logFileData = logFileData;
var nameExtractor = function (Name) {
    var _a;
    return (_a = Name.MemorizedFirstClipName) !== null && _a !== void 0 ? _a : Name.EffectiveName;
};
exports.nameExtractor = nameExtractor;
var fileExtractor = function (_a) {
    var OriginalFileSize = _a.OriginalFileSize, Path = _a.Path, RelativePath = _a.RelativePath;
    // console.log(OriginalFileSize, Path, RelativePath)
    return { OriginalFileSize: OriginalFileSize, Path: Path, RelativePath: RelativePath, FileName: Path.split('/').slice(-1)[0] };
};
exports.fileExtractor = fileExtractor;
var getDeviceChainName = function (arr) {
    return arr.length === 1 ? arr[0] : arr.filter(function (k) { return k.includes("DeviceChain"); })[0];
};
exports.getDeviceChainName = getDeviceChainName;
var giveNewKeys = function (obj) {
    var newObj = {};
    Object.keys(obj).forEach(function (key) { return (newObj[toolkit_1.nanoid()] = obj[key]); });
    return newObj;
};
exports.giveNewKeys = giveNewKeys;
/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */
var recursiveFormat = function recursiveProjectInfoFormatter(tagName, arr) {
    var _a, _b;
    if (arr instanceof Array !== true)
        console.log(arr);
    // console.log(tagName)
    if (arr.length === 0)
        return;
    var obj = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var child = arr_1[_i];
        var children = child.children, tagName_1 = child.tagName, attributes = child.attributes;
        if (!children || !tagName_1 || !attributes) {
            return child;
        }
        if (children.length === 0 && attributes.Value)
            if (Object.keys(attributes).length > 0) {
                obj.attributes = attributes;
            }
        if (children.length > 0) {
            obj = __assign(__assign({}, obj), (_a = {}, _a[attributes.Id ? tagName_1 + "_" + attributes.Id : tagName_1] = __assign({}, exports.recursiveFormat(tagName_1, children)), _a));
        }
        else if (attributes.Value) {
            obj = __assign(__assign({}, obj), (_b = {}, _b[tagName_1] = attributes.Value, _b));
        }
    }
    return obj;
};
exports.recursiveFormat = recursiveFormat;
