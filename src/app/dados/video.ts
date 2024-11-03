type Video = {
    name: string;
    author: string;
    description: string;
    urlVideo: string;
    image: string;
    play: boolean
}

export const videos: Video[] = [
    {
        name: "SAMSUNG 4K DEMO QLED 🔵 Pure Colors",
        author: "TV HiFi Pro",
        description: "video 01",
        urlVideo: "videos/video_1.mp4",
        image: "https://i.ytimg.com/vi/x91MPoITQ3I/hqdefault.jpg",
        play: true
    },
    {
        name: "2021 LG OLED l Ink Art 4K HDR 60fps",
        author: "LG Global",
        description: "video 02",
        urlVideo: "videos/video_2.mp4",
        image: "https://i.ytimg.com/vi/njX2bu-_Vw4/hqdefault.jpg",
        play: true
    },
    {
        name: "Visual Mastery: LG OLED 4K HDR 60fps",
        author: "LG",
        description: "video 03",
        urlVideo: "videos/video_3.mp4",
        image: "https://i.ytimg.com/vi/WO2b03Zdu4Q/hqdefault.jpg",
        play: true
    },
    {
        name: "4K HDR Fireworks Sony Oled TV Demo",
        author: "Relaxing Visual",
        description: "video 04",
        urlVideo: "videos/video_4.mp4",
        image: "https://i.ytimg.com/vi/Dxya5ucIroI/hqdefault.jpg",
        play: true
    },
]