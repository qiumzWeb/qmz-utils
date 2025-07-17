import { download, getObjType } from './index'

// 媒体类型
export const mediaType = {
  audio: 'audio/ogg; codecs=opus',
  videoMp4: 'video/mp4; codecs="avc1.424028, mp4a.40.2"',
  videoWebm: "video/webm; codecs=vp9"
}

// 创建Video 
export function createVideo(attrs?:any) {
  const video = document.createElement('video')
  video.className = 'RTC_VIDEO'
  if (getObjType(attrs) === 'Object') {
    Object.entries(attrs).forEach(([key, val]:any) => {
      video.setAttribute(key,val)
    })
  }
  return video
}

// 下载视频
export function downloadVideo(res:any, name?:any) {
  download(res, {
    fileName: name || `视频录制-${new Date().toLocaleDateString()}-${Date.now()}`,
    mimeType: mediaType.videoMp4
  })
}

// 录屏功能
export async function getCaptureScreen(displayMediaOptions = {video: true, audio: true, name: ''}) {
  let mediaRecorder = null;
  const mimeType = mediaType.videoWebm;
  if (getObjType(displayMediaOptions) !== 'Object') throw new Error('displayMediaOptions param is not an object');
  displayMediaOptions.video = (displayMediaOptions?.video || true);
  displayMediaOptions.audio = (displayMediaOptions?.audio || true);

  // 开始录制
  try {
    const getDisplayMedia = (window.navigator as any).mediaDevices.getDisplayMedia;
    if (!getDisplayMedia) throw new Error('getDisplayMedia is not supported');
    const stream = await getDisplayMedia(displayMediaOptions);
    mediaRecorder = new (window as any).MediaRecorder(stream, { mimeType })
    const chunks = []
    mediaRecorder.start()
    mediaRecorder.ondataavailable = function(e:any) {
      chunks.push(e.data)
      closeMediaRecord(chunks)
      downloadVideo(chunks, displayMediaOptions.name)
    }
    mediaRecorder.onstop = function() {
      console.log("data available after MediaRecorder.stop() called.");
      stream.getTracks().forEach(track => track.stop())
      console.log("record end");
    }
  } catch(err) {
    console.log("Error: " + err);
  }
  // 取消录制
  function closeMediaRecord(chunks:any) {
    typeof mediaRecorder.onRecordEnd === 'function' && mediaRecorder.onRecordEnd(chunks)
  }
  return mediaRecorder;
}


