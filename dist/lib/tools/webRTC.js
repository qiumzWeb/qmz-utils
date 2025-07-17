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
import { download, getObjType } from './index';
// 媒体类型
export var mediaType = {
    audio: 'audio/ogg; codecs=opus',
    videoMp4: 'video/mp4; codecs="avc1.424028, mp4a.40.2"',
    videoWebm: "video/webm; codecs=vp9"
};
// 创建Video 
export function createVideo(attrs) {
    var video = document.createElement('video');
    video.className = 'RTC_VIDEO';
    if (getObjType(attrs) === 'Object') {
        Object.entries(attrs).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            video.setAttribute(key, val);
        });
    }
    return video;
}
// 下载视频
export function downloadVideo(res, name) {
    download(res, {
        fileName: name || "\u89C6\u9891\u5F55\u5236-" + new Date().toLocaleDateString() + "-" + Date.now(),
        mimeType: mediaType.videoMp4
    });
}
// 录屏功能
export function getCaptureScreen(displayMediaOptions) {
    if (displayMediaOptions === void 0) { displayMediaOptions = { video: true, audio: true, name: '' }; }
    return __awaiter(this, void 0, void 0, function () {
        // 取消录制
        function closeMediaRecord(chunks) {
            typeof mediaRecorder.onRecordEnd === 'function' && mediaRecorder.onRecordEnd(chunks);
        }
        var mediaRecorder, mimeType, getDisplayMedia, stream_1, chunks_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mediaRecorder = null;
                    mimeType = mediaType.videoWebm;
                    if (getObjType(displayMediaOptions) !== 'Object')
                        throw new Error('displayMediaOptions param is not an object');
                    displayMediaOptions.video = ((displayMediaOptions === null || displayMediaOptions === void 0 ? void 0 : displayMediaOptions.video) || true);
                    displayMediaOptions.audio = ((displayMediaOptions === null || displayMediaOptions === void 0 ? void 0 : displayMediaOptions.audio) || true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    getDisplayMedia = window.navigator.mediaDevices.getDisplayMedia;
                    if (!getDisplayMedia)
                        throw new Error('getDisplayMedia is not supported');
                    return [4 /*yield*/, getDisplayMedia(displayMediaOptions)];
                case 2:
                    stream_1 = _a.sent();
                    mediaRecorder = new window.MediaRecorder(stream_1, { mimeType: mimeType });
                    chunks_1 = [];
                    mediaRecorder.start();
                    mediaRecorder.ondataavailable = function (e) {
                        chunks_1.push(e.data);
                        closeMediaRecord(chunks_1);
                        downloadVideo(chunks_1, displayMediaOptions.name);
                    };
                    mediaRecorder.onstop = function () {
                        console.log("data available after MediaRecorder.stop() called.");
                        stream_1.getTracks().forEach(function (track) { return track.stop(); });
                        console.log("record end");
                    };
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Error: " + err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, mediaRecorder];
            }
        });
    });
}
//# sourceMappingURL=webRTC.js.map