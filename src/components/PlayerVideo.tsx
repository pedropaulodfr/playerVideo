import React, {  useContext, useRef } from "react";
import { HomeContext } from "@/app/context/HomeContext";

interface PlayerVideoProps {
    videoSrc: string; 
    mute: boolean;
    play: boolean;
    volume: number;
  }

const PlayerVideo: React.FC<PlayerVideoProps> = ({ videoSrc, mute, play, volume }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { fullScreen, onChangeFullScreen, loop } = useContext(HomeContext)
    
    if (play) {
        videoRef.current?.play();
    } else {
        videoRef.current?.pause();
    }
    
    if(videoRef.current) {
        videoRef.current.volume = volume;
    }

    // Função para alternar para fullscreen
    if (videoRef.current && fullScreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
        onChangeFullScreen()
      }
    }

  return (
    <div className="flex flex-col justify-center items-center" style={{ maxWidth: "100%", maxHeight: "100%"}}>
      <video 
        className="player-video"
        ref={videoRef}
        width="100%"
        controls
        autoPlay = {false}
        loop = {loop}
        muted={mute}
        src={`${videoSrc}`} // Caminho do vídeo na pasta public
      >
        Seu navegador não suporta a reprodução de vídeos.
      </video>
    </div>
  );
};

export default PlayerVideo;
