// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7LIoy":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "339fa845bcfa8452";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"7ZSs6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _documentElements = require("./documentElements");
var _visualizer = require("./visualizer");
var _visualizerDefault = parcelHelpers.interopDefault(_visualizer);
class Main {
    constructor(audioContext, analyser, bufferLength, dataArray, visualizer){
        this.startRenderer = ()=>{
            requestAnimationFrame(()=>this.startRenderer());
            this.visualizer.render();
        };
        this.audioContext = audioContext;
        this.analyser = analyser;
        this.bufferLength = bufferLength;
        this.dataArray = dataArray;
        this.visualizer = visualizer;
    }
    static{
        this.initAudio = async (audioData, audioContext, analyser)=>{
            const buffer = await audioContext.decodeAudioData(audioData);
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(analyser);
            const visualizer = new (0, _visualizerDefault.default)(audioContext);
            visualizer.connectAudio(analyser);
            analyser.connect(audioContext.destination);
            source.start();
            return visualizer;
        };
    }
    static async init(audioData) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const FFT_SIZE = 4096;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.minDecibels = -90;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0.0;
        const visualizer = await Main.initAudio(audioData, audioContext, analyser);
        const main = new Main(audioContext, analyser, bufferLength, dataArray, visualizer);
        main.startRenderer();
    }
    static{
        this.handleFileSelect = (event)=>{
            const input = event.target;
            const file = input.files?.[0];
            if (file == null) return alert("File was null");
            const reader = new FileReader();
            reader.onload = function(event) {
                if (event.target != null && event.target.result != null && typeof event.target.result !== "string") Main.init(event.target.result);
                else return alert("File reader did not return a valid result");
            };
            reader.readAsArrayBuffer(file);
        };
    }
}
(0, _documentElements.audioFileInput).addEventListener("change", Main.handleFileSelect, false);

},{"./documentElements":"jgzJc","./visualizer":"cOUfa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jgzJc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "colorThemeSelect", ()=>colorThemeSelect);
parcelHelpers.export(exports, "modeSelect", ()=>modeSelect);
parcelHelpers.export(exports, "audioFileInput", ()=>audioFileInput);
parcelHelpers.export(exports, "volumeBarCanvas", ()=>volumeBarCanvas);
parcelHelpers.export(exports, "visualizerCanvas", ()=>visualizerCanvas);
const colorThemeSelect = document.getElementById("colorThemeSelect");
const modeSelect = document.getElementById("modeSelect");
const audioFileInput = document.getElementById("audioFileInput");
const volumeBarCanvas = document.getElementById("volumeBarCanvas");
const visualizerCanvas = document.getElementById("visualizerCanvas");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cOUfa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _audioLevelsJs = require("./audioLevels.js");
var _audioLevelsJsDefault = parcelHelpers.interopDefault(_audioLevelsJs);
var _audioProcessorJs = require("./audioProcessor.js");
var _audioProcessorJsDefault = parcelHelpers.interopDefault(_audioProcessorJs);
var _renderFuncsJs = require("./renderFuncs.js");
var _optionsJs = require("./options.js");
var _optionsJsDefault = parcelHelpers.interopDefault(_optionsJs);
class Visualizer {
    constructor(audioContext){
        this.audioNode = null;
        this.audio = new (0, _audioProcessorJsDefault.default)(audioContext);
        this.audioLevels = new (0, _audioLevelsJsDefault.default)(this.audio);
        // Get the canvas element and its context
        this.canvas = document.getElementById("volumeBarCanvas");
        this.ctx = this.canvas.getContext("2d");
    }
    render() {
        this.audio.sampleAudio();
        this.audioLevels.updateAudioLevels();
        this.renderWebGL();
    }
    connectAudio(audioNode) {
        this.audioNode = audioNode;
        this.audio.connectAudio(audioNode);
    }
    disconnectAudio(audioNode) {
        this.audioNode = null;
        this.audio.disconnectAudio(audioNode);
    }
    renderWebGL() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const renderFunc = (0, _renderFuncsJs.RENDER_FUNCS)[(0, _optionsJsDefault.default).getOption("visualizer")];
        renderFunc(this.audio, this.canvas, this.ctx);
    }
}
exports.default = Visualizer;

},{"./audioLevels.js":"9Goj8","./audioProcessor.js":"c2Ffz","./renderFuncs.js":"gUb6E","./options.js":"kHa67","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Goj8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class AudioLevels {
    constructor(audio){
        this.audio = audio;
        let sampleRate;
        if (this.audio.audioContext) sampleRate = this.audio.audioContext.sampleRate;
        else sampleRate = 44100;
        const bucketHz = sampleRate / this.audio.fftSize;
        const bassLow = Math.clamp(Math.round(20 / bucketHz) - 1, 0, this.audio.numSamps - 1);
        const bassHigh = Math.clamp(Math.round(320 / bucketHz) - 1, 0, this.audio.numSamps - 1);
        const midHigh = Math.clamp(Math.round(2800 / bucketHz) - 1, 0, this.audio.numSamps - 1);
        const trebHigh = Math.clamp(Math.round(11025 / bucketHz) - 1, 0, this.audio.numSamps - 1);
        this.starts = [
            bassLow,
            bassHigh,
            midHigh
        ];
        this.stops = [
            bassHigh,
            midHigh,
            trebHigh
        ];
        this.val = new Float32Array(3);
        this.imm = new Float32Array(3);
        this.att = new Float32Array(3);
        this.avg = new Float32Array(3);
        this.longAvg = new Float32Array(3);
        this.att.fill(1);
        this.avg.fill(1);
        this.longAvg.fill(1);
    }
    /* eslint-disable camelcase */ get bass() {
        return this.val[0];
    }
    get bass_att() {
        return this.att[0];
    }
    get mid() {
        return this.val[1];
    }
    get mid_att() {
        return this.att[1];
    }
    get treb() {
        return this.val[2];
    }
    get treb_att() {
        return this.att[2];
    }
    /* eslint-enable camelcase */ static isFiniteNumber(num) {
        return Number.isFinite(num) && !Number.isNaN(num);
    }
    // static adjustRateToFPS(rate, baseFPS, FPS) {
    //     return rate ** (baseFPS / FPS);
    // }
    updateAudioLevels() {
        if (this.audio.freqArray.length > 0) {
            // let effectiveFPS = fps;
            // if (
            //     !AudioLevels.isFiniteNumber(effectiveFPS) ||
            //     effectiveFPS < 15
            // ) {
            //     effectiveFPS = 15;
            // } else if (effectiveFPS > 144) {
            //     effectiveFPS = 144;
            // }
            // Clear for next loop
            this.imm.fill(0);
            for(let i = 0; i < 3; i++)for(let j = this.starts[i]; j < this.stops[i]; j++)this.imm[i] += this.audio.freqArray[j];
            for(let i = 0; i < 3; i++){
                let rate;
                if (this.imm[i] > this.avg[i]) rate = 0.2;
                else rate = 0.5;
                // rate = AudioLevels.adjustRateToFPS(rate, 30.0, effectiveFPS);
                this.avg[i] = this.avg[i] * rate + this.imm[i] * (1 - rate);
                // if (frame < 50) {
                //     rate = 0.9;
                // } else {
                rate = 0.992;
                // }
                // rate = AudioLevels.adjustRateToFPS(rate, 30.0, effectiveFPS);
                this.longAvg[i] = this.longAvg[i] * rate + this.imm[i] * (1 - rate);
                if (this.longAvg[i] < 0.001) {
                    this.val[i] = 1.0;
                    this.att[i] = 1.0;
                } else {
                    this.val[i] = this.imm[i] / this.longAvg[i];
                    this.att[i] = this.avg[i] / this.longAvg[i];
                }
            }
        }
    }
}
exports.default = AudioLevels;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c2Ffz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _fftJs = require("./fft.js");
var _fftJsDefault = parcelHelpers.interopDefault(_fftJs);
class AudioProcessor {
    constructor(context){
        this.numSamps = 512;
        this.fftSize = this.numSamps * 2;
        this.fft = new (0, _fftJsDefault.default)(this.fftSize, 512, true);
        this.audioContext = context;
        this.audible = context.createDelay();
        this.analyser = context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.0;
        this.analyser.fftSize = this.fftSize;
        this.audible.connect(this.analyser);
        // Split channels
        this.analyserL = context.createAnalyser();
        this.analyserL.smoothingTimeConstant = 0.0;
        this.analyserL.fftSize = this.fftSize;
        this.analyserR = context.createAnalyser();
        this.analyserR.smoothingTimeConstant = 0.0;
        this.analyserR.fftSize = this.fftSize;
        this.splitter = context.createChannelSplitter(2);
        this.audible.connect(this.splitter);
        this.splitter.connect(this.analyserL, 0);
        this.splitter.connect(this.analyserR, 1);
        // Initialised once as typed arrays
        // Used for webaudio API raw (time domain) samples. 0 -> 255
        this.timeByteArray = new Uint8Array(this.fftSize);
        this.timeByteArrayL = new Uint8Array(this.fftSize);
        this.timeByteArrayR = new Uint8Array(this.fftSize);
        // Signed raw samples shifted to -128 -> 127
        this.timeArray = new Int8Array(this.fftSize);
        this.timeByteArraySignedL = new Int8Array(this.fftSize);
        this.timeByteArraySignedR = new Int8Array(this.fftSize);
        // Temporary array for smoothing
        this.tempTimeArrayL = new Int8Array(this.fftSize);
        this.tempTimeArrayR = new Int8Array(this.fftSize);
        // Undersampled from this.fftSize to this.numSamps
        this.timeArrayL = new Int8Array(this.numSamps);
        this.timeArrayR = new Int8Array(this.numSamps);
        // Frequency domain arrays
        this.freqArray = new Float32Array(0);
        this.freqArrayL = new Float32Array(0);
        this.freqArrayR = new Float32Array(0);
    }
    sampleAudio() {
        this.analyser.getByteTimeDomainData(this.timeByteArray);
        this.analyserL.getByteTimeDomainData(this.timeByteArrayL);
        this.analyserR.getByteTimeDomainData(this.timeByteArrayR);
        this.processAudio();
    }
    updateAudio(timeByteArray, timeByteArrayL, timeByteArrayR) {
        this.timeByteArray.set(timeByteArray);
        this.timeByteArrayL.set(timeByteArrayL);
        this.timeByteArrayR.set(timeByteArrayR);
        this.processAudio();
    }
    /* eslint-disable no-bitwise */ processAudio() {
        for(let i = 0, j = 0, lastIdx = 0; i < this.fftSize; i++){
            // Shift Unsigned to Signed about 0
            this.timeArray[i] = this.timeByteArray[i] - 128;
            this.timeByteArraySignedL[i] = this.timeByteArrayL[i] - 128;
            this.timeByteArraySignedR[i] = this.timeByteArrayR[i] - 128;
            this.tempTimeArrayL[i] = 0.5 * (this.timeByteArraySignedL[i] + this.timeByteArraySignedL[lastIdx]);
            this.tempTimeArrayR[i] = 0.5 * (this.timeByteArraySignedR[i] + this.timeByteArraySignedR[lastIdx]);
            // Undersampled
            if (i % 2 === 0) {
                this.timeArrayL[j] = this.tempTimeArrayL[i];
                this.timeArrayR[j] = this.tempTimeArrayR[i];
                j += 1;
            }
            lastIdx = i;
        }
        // Use full width samples for the FFT
        this.freqArray = this.fft.timeToFrequencyDomain(this.timeArray);
        this.freqArrayL = this.fft.timeToFrequencyDomain(this.timeByteArraySignedL);
        this.freqArrayR = this.fft.timeToFrequencyDomain(this.timeByteArraySignedR);
    }
    connectAudio(audioNode) {
        audioNode.connect(this.audible);
    }
    disconnectAudio(audioNode) {
        audioNode.disconnect(this.audible);
    }
}
exports.default = AudioProcessor;

},{"./fft.js":"8S9Sq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8S9Sq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class FFT {
    constructor(samplesIn, samplesOut, equalize = false){
        this.equalizeArr = null;
        this.samplesIn = samplesIn;
        this.samplesOut = samplesOut;
        this.equalize = equalize;
        this.NFREQ = samplesOut * 2;
        if (this.equalize) this.initEqualizeTable();
        this.bitrevtable = new Uint16Array(this.NFREQ);
        this.cossintable = [
            new Float32Array(0),
            new Float32Array(0)
        ];
        this.initBitRevTable();
        this.initCosSinTable();
    }
    initEqualizeTable() {
        this.equalizeArr = new Float32Array(this.samplesOut);
        const invHalfNFREQ = 1.0 / this.samplesOut;
        for(let i = 0; i < this.samplesOut; i++)this.equalizeArr[i] = -0.02 * Math.log((this.samplesOut - i) * invHalfNFREQ);
    }
    /* eslint-disable no-bitwise */ initBitRevTable() {
        for(let i = 0; i < this.NFREQ; i++)this.bitrevtable[i] = i;
        let j = 0;
        for(let i = 0; i < this.NFREQ; i++){
            if (j > i) {
                const temp = this.bitrevtable[i];
                this.bitrevtable[i] = this.bitrevtable[j];
                this.bitrevtable[j] = temp;
            }
            let m = this.NFREQ >> 1;
            while(m >= 1 && j >= m){
                j -= m;
                m >>= 1;
            }
            j += m;
        }
    }
    initCosSinTable() {
        let dftsize = 2;
        let tabsize = 0;
        while(dftsize <= this.NFREQ){
            tabsize += 1;
            dftsize <<= 1;
        }
        this.cossintable = [
            new Float32Array(tabsize),
            new Float32Array(tabsize)
        ];
        dftsize = 2;
        let i = 0;
        while(dftsize <= this.NFREQ){
            const theta = -2 * Math.PI / dftsize;
            this.cossintable[0][i] = Math.cos(theta);
            this.cossintable[1][i] = Math.sin(theta);
            i += 1;
            dftsize <<= 1;
        }
    }
    timeToFrequencyDomain(waveDataIn) {
        const real = new Float32Array(this.NFREQ);
        const imag = new Float32Array(this.NFREQ);
        for(let i = 0; i < this.NFREQ; i++){
            const idx = this.bitrevtable[i];
            if (idx < this.samplesIn) real[i] = waveDataIn[idx];
            else real[i] = 0;
            imag[i] = 0;
        }
        let dftsize = 2;
        let t = 0;
        while(dftsize <= this.NFREQ){
            const wpr = this.cossintable[0][t];
            const wpi = this.cossintable[1][t];
            let wr = 1.0;
            let wi = 0.0;
            const hdftsize = dftsize >> 1;
            for(let m = 0; m < hdftsize; m++){
                for(let i = m; i < this.NFREQ; i += dftsize){
                    const j = i + hdftsize;
                    const tempr = wr * real[j] - wi * imag[j];
                    const tempi = wr * imag[j] + wi * real[j];
                    real[j] = real[i] - tempr;
                    imag[j] = imag[i] - tempi;
                    real[i] += tempr;
                    imag[i] += tempi;
                }
                const wtemp = wr;
                wr = wtemp * wpr - wi * wpi;
                wi = wi * wpr + wtemp * wpi;
            }
            dftsize <<= 1;
            t += 1;
        }
        const spectralDataOut = new Float32Array(this.samplesOut);
        if (this.equalize && this.equalizeArr != null) for(let i = 0; i < this.samplesOut; i++)spectralDataOut[i] = this.equalizeArr[i] * Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
        else for(let i = 0; i < this.samplesOut; i++)spectralDataOut[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
        return spectralDataOut;
    }
}
exports.default = FFT;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gUb6E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RENDER_FUNCS", ()=>RENDER_FUNCS);
var _colorThemes = require("./colorThemes");
var _colorThemesDefault = parcelHelpers.interopDefault(_colorThemes);
const RENDER_FUNCS = {
    bars: (audio, canvas, ctx)=>{
        const data = audio.freqArray;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const numBars = data.length;
        // Calculate logarithmic positions for each bar
        let totalLog = 0;
        const logWidths = [];
        let cumulativeWidth = 0;
        for(let i = 0; i < numBars; i++)if (i === 0) {
            logWidths.push(1);
            totalLog += 1;
        } else {
            const logWidth = Math.log10(i + 1) - Math.log10(i);
            logWidths.push(logWidth);
            totalLog += logWidth;
        }
        // Draw each bar with logarithmically adjusted widths
        for(let i = 0; i < numBars; i++){
            const logWidth = logWidths[i] / totalLog * canvasWidth;
            const barHeight = data[i] * canvasHeight / 20;
            const something = (0, _colorThemesDefault.default).getTheme();
            ctx.fillStyle = (0, _colorThemesDefault.default).getTheme().primary;
            ctx.fillRect(cumulativeWidth, canvasHeight - barHeight, logWidth, barHeight);
            cumulativeWidth += logWidth;
        }
    },
    line: (audio, canvas, ctx)=>{
        const data = audio.freqArray.map((val)=>{
            return Math.log10(val + 1);
        });
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const numBars = data.length;
        // Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // Calculate logarithmic positions for each bar
        let totalLog = 0;
        const logWidths = [];
        for(let i = 0; i < numBars; i++)if (i === 0) {
            logWidths.push(1);
            totalLog += 1;
        } else {
            const logWidth = Math.log10(i + 1) - Math.log10(i);
            logWidths.push(logWidth);
            totalLog += logWidth;
        }
        let cumulativeWidth = 0;
        ctx.beginPath();
        for(let i = 0; i < numBars; i++){
            const logWidth = logWidths[i] / totalLog * canvasWidth;
            const x = cumulativeWidth + logWidth / 2;
            const y = canvasHeight - data[i] * canvasHeight / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            cumulativeWidth += logWidth;
        }
        ctx.strokeStyle = (0, _colorThemesDefault.default).getTheme().primary;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
};

},{"./colorThemes":"iDkvs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iDkvs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _optionsJs = require("./options.js");
var _optionsJsDefault = parcelHelpers.interopDefault(_optionsJs);
const COLOR_THEMES = {
    foam: {
        primary: "#abffca",
        secondary: "#000000"
    },
    fire: {
        primary: "#ff0000",
        secondary: "#000000"
    },
    bubblegum: {
        primary: "#ffffff",
        secondary: "#ffa1ee"
    },
    galaxy: {
        primary: "#e8daed",
        secondary: "#755b7d"
    }
};
class ColorThemes {
    static getTheme() {
        const theme = (0, _optionsJsDefault.default).getOption("theme");
        return COLOR_THEMES[theme];
    }
    static setTheme(newTheme) {
        (0, _optionsJsDefault.default).setOption("theme", newTheme);
    }
}
exports.default = ColorThemes;

},{"./options.js":"kHa67","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kHa67":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _documentElements = require("./documentElements");
const opts = {
    theme: "foam",
    visualizer: "line"
};
class Options {
    static init() {
        for(const key in opts)if (localStorage.getItem(key) != null) {
            // @ts-ignore - TODO: write error handling for local storage keys
            opts[key] = localStorage.getItem(key);
            Options.sideEffects(key);
        }
    }
    static getOption(key) {
        return opts[key];
    }
    static setOption(key, value) {
        opts[key] = value;
        localStorage.setItem(key, value);
        Options.sideEffects(key);
    }
    static{
        this.sideEffects = (key)=>{
            if (key === "theme") Options.setThemeSideEffect(opts.theme);
            if (key === "visualizer") Options.setVisualizerSideEffect(opts.visualizer);
        };
    }
    static{
        this.setThemeSideEffect = (newTheme)=>{
            document.documentElement.setAttribute("data-theme", newTheme);
            (0, _documentElements.colorThemeSelect).value = newTheme;
        };
    }
    static{
        this.setVisualizerSideEffect = (newVisualizer)=>{
            (0, _documentElements.modeSelect).value = newVisualizer;
        };
    }
}
exports.default = Options;
(()=>{
    Options.init();
})();

},{"./documentElements":"jgzJc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["7LIoy","7ZSs6"], "7ZSs6", "parcelRequire599b")

//# sourceMappingURL=index.bcfa8452.js.map
