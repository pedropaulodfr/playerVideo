import React, { useContext, useRef, useState } from "react";

interface PlayerVideoProps {
    videoSrc: string; 
    mute: boolean;
    play: boolean;
    volume: number;
  }

const PlayerVideo: React.FC<PlayerVideoProps> = ({ videoSrc, mute, play, volume }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    if (play) {
        videoRef.current?.play();
    } else {
        videoRef.current?.pause();
    }
    
    if(videoRef.current) {
        videoRef.current.volume = volume;
    }

  return (
    <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <video
        ref={videoRef}
        width="100%"
        controls
        autoPlay
        loop
        muted={mute}
        src={`${videoSrc}`} // Caminho do vídeo na pasta public
      >
        Seu navegador não suporta a reprodução de vídeos.
      </video>
    </div>
  );
};

export default PlayerVideo;
