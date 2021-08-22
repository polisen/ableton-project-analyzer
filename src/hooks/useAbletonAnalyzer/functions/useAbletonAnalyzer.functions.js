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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.findData = exports.projectAnalyzer = exports.fileStructureAnalyzer = void 0;
var pako = require("pako");
var txml = require("txml");
var toolkit_1 = require("@reduxjs/toolkit");
var verifyExistence_functions_1 = require("./verifyExistence.functions");
var utility_functions_1 = require("./utility.functions");
var extractors_functions_1 = require("./extractors.functions");
/**
 * This function is the main entry for the useAbletonAnalyzer hook. It sends each desired file to the projectAnalyzer - of which the results file dependencies are verified to be present in the filestructure.
 * For each file:
 * 1. Check if it's an ableton file
 * 2. If so - send to the projectAnalyzer.
 * 3. Make sure that all the samples are present in the result of projectAnalyzer by checking for them in the filestructure.
 * 4. Append to the results.
 * @param files - Nested array of [file, filePath] - due to path being stripped from File object in a webWorker.
 * @param fileStructure - the filestructure of the files represented in a tree.
 * @returns object with result of each file successfully analysed.
 */
var fileStructureAnalyzer = function (files, fileStructure) { return __awaiter(void 0, void 0, void 0, function () {
    var results, _loop_1, _i, files_1, _a, file, path;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                results = {};
                _loop_1 = function (file, path) {
                    var abletonResults, verifiedSamples;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (file instanceof Blob !== true)
                                    return [2 /*return*/, "continue"];
                                if (path.includes("Backup"))
                                    return [2 /*return*/, "continue"];
                                if (![".als", ".adg", ".alp"].some(function (v) { return file.name.includes(v); })) return [3 /*break*/, 2];
                                return [4 /*yield*/, projectAnalyzer(file)];
                            case 1:
                                abletonResults = _c.sent();
                                verifiedSamples = verifyExistence_functions_1.verifyExistence(abletonResults.samples, fileStructure, path);
                                results[toolkit_1.nanoid()] = __assign(__assign(__assign(__assign({}, file), { fileName: file.name, path: path }), abletonResults), { verifiedSamples: verifiedSamples });
                                _c.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, files_1 = files;
                _b.label = 1;
            case 1:
                if (!(_i < files_1.length)) return [3 /*break*/, 4];
                _a = files_1[_i], file = _a[0], path = _a[1];
                return [5 /*yield**/, _loop_1(file, path)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, results];
        }
    });
}); };
exports.fileStructureAnalyzer = fileStructureAnalyzer;
/**
 *
 * @param {File} file - a File Blob that is hopefully an ableton project.
 * @returns results.
 *
 * - This function parses the File from Blob -> Gzipped XML -> XML -> Shitty Json -> Good Json
 * - The good json is then sent to findData and then returned
 * -
 * * An ableton project is just XML gzipped and called .als
 */
function projectAnalyzer(file) {
    return __awaiter(this, void 0, void 0, function () {
        var results, XMLstring, _a, _b, _c, parsedXML, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = {};
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    _b = (_a = pako).inflate;
                    _c = Uint8Array.bind;
                    return [4 /*yield*/, file.arrayBuffer()];
                case 2:
                    XMLstring = _b.apply(_a, [new (_c.apply(Uint8Array, [void 0, _d.sent()]))(), {
                            to: "string"
                        }]);
                    parsedXML = txml.parse(XMLstring);
                    return [2 /*return*/, exports.findData(utility_functions_1.recursiveFormat("root", parsedXML))];
                case 3:
                    e_1 = _d.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
exports.projectAnalyzer = projectAnalyzer;
/**
 * Extracts data from each audio track of given project and returns it's findings about samples and plugins.
 * @param {AbletonProject} object - project to analyse
 * @param Patterns - shapes of data to find.
 */
var findData = function findInformationInProject(_a) {
    var LiveSet = _a.Ableton.LiveSet;
    var results = {};
    Object.entries(__assign(__assign({}, LiveSet.Tracks), { MasterTrack: LiveSet.MasterTrack })).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var _b = __assign({ Name: utility_functions_1.nameExtractor(value.Name) }, extractors_functions_1.deviceChainExtractor(value.DeviceChain)), samples = _b.samples, plugins = _b.plugins;
        results["samples"] = __assign(__assign({}, results["samples"]), samples);
        results["plugins"] = __assign(__assign({}, results["plugins"]), plugins);
    });
    results.samples = utility_functions_1.stripDuplicateSamples(results.samples);
    results.plugins = utility_functions_1.stripDuplicatePlugins(results.plugins);
    return results;
};
exports.findData = findData;
