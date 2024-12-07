import React, { useContext, useEffect, useRef, useState } from "react";
import { HomeContext } from "@/app/context/HomeContext";
import styles from "./PlayerVideo.module.css";
import Parametros from "../helpers/functions";

interface PlayerVideoProps {
  videoSrc: string;
  mute: boolean;
  volume: number;
}

type Video = {
  name: string;
  author: string;
  description: string;
  urlVideo: string;
  image: string;
  cover: string;
};

const PlayerVideo: React.FC<PlayerVideoProps> = ({ videoSrc, mute, volume, }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    play,
    fullScreen,
    onChangeFullScreen,
    loop,
    onChangeVideo,
    onChangePlayBool,
    onChangeBotaoPularIntro,
    onChangeBotaoPularEncerramento,
    botaoPularIntroClick,
    botaoPularEncerramentoClick,
    handleBotaoPularIntro,
    handleBotaoPularEncerramento,
  } = useContext(HomeContext);

  // UseEffect para ficar monitorando o tempo de execução
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime == video.duration) {
        if (typeof window === "undefined") return;

        const ultimoVideo = localStorage.getItem("ultimoVideo");
        if (ultimoVideo) {
          const videoObj: Video = JSON.parse(ultimoVideo) as Video;
          onChangeVideo(videoObj, "next");
        }
      } else if (video.currentTime == 0) {
        video.play();
      }

      // Controla a visibilidade do botão Pular Intro
      if (
        JSON.parse(Parametros.pegarParametro("skipIntro") ?? "false") &&
        Math.floor(video.currentTime) >= 2 &&
        Math.floor(video.currentTime) <= Math.floor(video.duration) - 10 * 60 &&
        !JSON.parse(JSON.parse(localStorage.getItem("pularIntro") ?? "false" ))
      ) {
        onChangeBotaoPularIntro(true);
      } else {
        onChangeBotaoPularIntro(false);
      }
      
      // Controla a visibilidade do botão Pular Encerramento
      if (
        JSON.parse(Parametros.pegarParametro("skipClosing") ?? "false") &&
        Math.floor(video.currentTime) >= Math.floor(video.duration) - Math.floor(Parametros.pegarParametro("tempClosing") ?? "false") &&
        !JSON.parse(JSON.parse(localStorage.getItem("pularEncerramento") ?? "false" ))
      ) {
        onChangeBotaoPularEncerramento(true);
      } else {
        onChangeBotaoPularEncerramento(false);
      }

      // Ação quando clicar no botão de Pular Intro
      if (botaoPularIntroClick) {
        localStorage.setItem("pularIntro", "true");
        onChangeBotaoPularIntro(false);
        handleBotaoPularIntro();
        video.currentTime = video.currentTime + Math.floor(Parametros.pegarParametro("durationIntro"));
      }
      
      // Ação quando clicar no botão de Pular Encerramenro
      if (botaoPularEncerramentoClick) {
        localStorage.setItem("pularEncerramento", "true");
        onChangeBotaoPularEncerramento(false);
        handleBotaoPularEncerramento();
        video.currentTime = video.duration - 1;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    // Cleanup ao desmontar o componente
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [botaoPularIntroClick, botaoPularEncerramentoClick]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePlayUpdate = () => {
      onChangePlayBool(true);
    };

    const handlePauseUpdate = () => {
      onChangePlayBool(false);
    };

    video.addEventListener("play", handlePlayUpdate);
    video.addEventListener("pause", handlePauseUpdate);

    return () => {
      video.removeEventListener("play", handlePlayUpdate);
      video.removeEventListener("pause", handlePauseUpdate);
    };
  }, []);

  if (play) {
    videoRef.current?.play();
  } else {
    videoRef.current?.pause();
  }

  if (videoRef.current) {
    videoRef.current.volume = volume;
  }

  // Função para alternar para fullscreen
  if (videoRef.current && fullScreen) {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
      onChangeFullScreen();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center" style={{ maxWidth: "100%", maxHeight: "100%" }} >
      <video
        className={`player-video ${styles.player}`}
        ref={videoRef}
        width="100%"
        controls = {JSON.parse(Parametros.pegarParametro("displayControls") ?? "false")}
        autoPlay={false}
        loop={loop}
        muted={mute}
        src={`${videoSrc}`} // Caminho do vídeo na pasta public
      >
        Seu navegador não suporta a reprodução de vídeos.
      </video>
    </div>
  );
};

export default PlayerVideo;
