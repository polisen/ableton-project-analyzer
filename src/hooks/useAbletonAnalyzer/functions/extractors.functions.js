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
exports.deviceChainExtractor = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var utility_functions_1 = require("./utility.functions");
/**
 * All of these functions are recursively extracting some part of the ableton project.
 * They call each in different constellations depending on the project structure.
 * deviceExtractor could be said to be the main junction
 * deviceChainExractor is the entry point.
 * TODO: Document better. Sorry. No time right now.
 * TODO: Stronger types.  Recursive typing is hard.
 */
var deviceChainExtractor = function (DeviceChain) {
    var _a;
    var MainSequencer = DeviceChain.MainSequencer;
    return __assign(__assign({}, (MainSequencer ? audioExtractor(MainSequencer) : {})), deviceExtractor((_a = DeviceChain.DeviceChain) !== null && _a !== void 0 ? _a : DeviceChain[utility_functions_1.getDeviceChainName(Object.keys(DeviceChain))]));
};
exports.deviceChainExtractor = deviceChainExtractor;
var deviceExtractor = function (_a) {
    var Devices = _a.Devices;
    if (!Devices)
        return {};
    var list = {};
    for (var _i = 0, _b = Object.entries(Devices); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        if (key.includes("PluginDevice")) {
            var info = pluginExtractor(value);
            list["plugins"] = __assign(__assign({}, list["plugins"]), info);
            continue;
        }
        if (key.includes("InstrumentGroup") ||
            key.includes("EffectGroup") ||
            key.includes("DrumGroup")) {
            var info = groupExtractor(value);
            for (var _d = 0, _e = Object.entries(info); _d < _e.length; _d++) {
                var _f = _e[_d], key_1 = _f[0], value_1 = _f[1];
                var samples = value_1.samples, plugins = value_1.plugins;
                list["samples"] = __assign(__assign({}, list["samples"]), samples);
                list["plugins"] = __assign(__assign({}, list["plugins"]), plugins);
            }
            continue;
        }
        if (key.includes("MultiSampler") || key.includes("Simpler")) {
            var info = samplerExtractor(value);
            list["samples"] = __assign(__assign({}, list["samples"]), utility_functions_1.giveNewKeys(info));
            continue;
        }
    }
    return list;
};
var samplerExtractor = function (_a) {
    var _b;
    var SampleParts = _a.Player.MultiSampleMap.SampleParts;
    // console.log(SampleParts)
    var results = {};
    for (var _i = 0, _c = Object.entries(SampleParts); _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        var _e = value.SampleRef, DefaultDuration = _e.DefaultDuration, DefaultSampleRate = _e.DefaultSampleRate, FileRef = _e.FileRef;
        results = __assign(__assign({}, results), (_b = {}, _b[key] = __assign({ DefaultDuration: DefaultDuration, DefaultSampleRate: DefaultSampleRate }, utility_functions_1.fileExtractor(FileRef)), _b));
    }
    return results;
};
var groupExtractor = function (_a) {
    var _b;
    var Branches = _a.Branches;
    // console.group('audioEffectBranches', Branches)
    var results = {};
    for (var _i = 0, _c = Object.entries(Branches); _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        results[utility_functions_1.nameExtractor((_b = value.Name) !== null && _b !== void 0 ? _b : key)] = exports.deviceChainExtractor(value.DeviceChain);
    }
    return results;
};
var pluginExtractor = function (_a) {
    var PluginDesc = _a.PluginDesc;
    var results = {};
    for (var _i = 0, _b = Object.entries(PluginDesc); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        // console.log(value);
        var PlugName = value.PlugName, Name = value.Name, Preset = value.Preset, Manufacturer = value.Manufacturer;
        results[toolkit_1.nanoid()] = {
            Name: PlugName !== null && PlugName !== void 0 ? PlugName : Name,
            type: Object.keys(Preset)[0].includes("Vst3")
                ? "VST3"
                : Object.keys(Preset)[0].includes("Au")
                    ? "AU"
                    : "VST",
            Manufacturer: Manufacturer
        };
    }
    return results;
};
var clipSlotExtractor = function (_a) {
    var ClipSlot = _a.ClipSlot;
    var samples = {};
    if (!ClipSlot.Value)
        return {};
    for (var _i = 0, _b = Object.entries(ClipSlot.Value); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        var _d = value.SampleRef, DefaultDuration = _d.DefaultDuration, DefaultSampleRate = _d.DefaultSampleRate, FileRef = _d.FileRef;
        samples[toolkit_1.nanoid()] = __assign({ DefaultDuration: DefaultDuration, DefaultSampleRate: DefaultSampleRate }, utility_functions_1.fileExtractor(FileRef));
    }
    return samples;
};
var sampleExtractor = function (sample) {
    var _a;
    var _b = sample.SampleRef, DefaultDuration = _b.DefaultDuration, DefaultSampleRate = _b.DefaultSampleRate, FileRef = _b.FileRef;
    return _a = {},
        _a[toolkit_1.nanoid()] = __assign({ DefaultDuration: DefaultDuration, DefaultSampleRate: DefaultSampleRate }, utility_functions_1.fileExtractor(FileRef)),
        _a;
};
var audioExtractor = function (MainSequencer) {
    if (!MainSequencer.Sample)
        return {};
    if (!MainSequencer.Sample.ArrangerAutomation.Events)
        return {};
    var list = {};
    for (var _i = 0, _a = Object.entries(MainSequencer.ClipSlotList); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        list["samples"] = __assign(__assign({}, list["samples"]), clipSlotExtractor(value));
    }
    for (var _c = 0, _d = Object.entries(MainSequencer.Sample.ArrangerAutomation.Events); _c < _d.length; _c++) {
        var _e = _d[_c], key = _e[0], value = _e[1];
        list["samples"] = __assign(__assign({}, list["samples"]), sampleExtractor(value));
    }
    return list;
};
