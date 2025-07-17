export declare const mediaType: {
    audio: string;
    videoMp4: string;
    videoWebm: string;
};
export declare function createVideo(attrs?: any): HTMLVideoElement;
export declare function downloadVideo(res: any, name?: any): void;
export declare function getCaptureScreen(displayMediaOptions?: {
    video: boolean;
    audio: boolean;
    name: string;
}): Promise<any>;
//# sourceMappingURL=webRTC.d.ts.map