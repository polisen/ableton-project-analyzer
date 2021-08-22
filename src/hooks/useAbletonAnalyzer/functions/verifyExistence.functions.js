"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.verifyExistence = void 0;
var getPathFromOrigin = function (relative, origin) {
    try {
        var rPathArr = relative.split("/").filter(function (x) { return x; });
        var oPathArr = origin.split("/").filter(function (x) { return x; });
        var newArr = [];
        var oLength = oPathArr.length - 1;
        for (var _i = 0, rPathArr_1 = rPathArr; _i < rPathArr_1.length; _i++) {
            var e = rPathArr_1[_i];
            if (e === "..")
                oLength--;
            else
                newArr.push(e);
        }
        if (oLength < 0)
            throw new Error("path out of bounds");
        var newHead = oPathArr.slice(0, oLength);
        newArr = __spreadArray(__spreadArray([], newHead), newArr);
        return newArr;
    }
    catch (error) {
        // console.error(error);
        return [];
    }
};
var findInStructure = function (path, structure) {
    // console.log(structure)
    var currentStructure = structure;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var p = path_1[_i];
        // console.log(p)
        if (currentStructure[p])
            currentStructure = currentStructure[p];
        else
            return false;
        // console.log(currentStructure)
    }
    return true;
};
var verifyExistence = function (samples, fileStructure, originPath) {
    var results = {};
    for (var _i = 0, _a = Object.entries(samples); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var RelativePath = value.RelativePath;
        var samplePath = getPathFromOrigin(RelativePath, originPath);
        if (!samplePath.length)
            results[key] = "out-of-bounds";
        else {
            results[key] = findInStructure(samplePath, fileStructure);
        }
    }
    return results;
};
exports.verifyExistence = verifyExistence;
