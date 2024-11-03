"use client";
import React, { createContext, ReactNode, useState, useEffect, useRef, SetStateAction } from "react";
import { videos } from '../dados/video';

type Video = {
  name: string;
  author: string;
  description: string;
  urlVideo: string;
  image: string;
  play: boolean
}

type HomeContextData = {
  onChangePlay: () => void;
  videoSelecionado: Video;
  onChangeVideo: (urlVideoAtual: Video, acao: string) => void;
  volume: number;
  onChangeVolume: (event: Event, newValue: number | number[]) => void;
  botaoVolume: boolean;
  onChangeBotaoVolume: () => void;
};

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
  children: ReactNode;
};

const HomeContextProvider = ({ children }: ProviderProps) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);
  const [botaoVolume, setBotaoVolume] = useState<boolean>(false);
  const [videoSelecionado, setVideoSelecionado] = useState<Video>(videos[0])

  const onChangePlay = () => {
      if (videoSelecionado.play) {
        setVideoSelecionado({...videoSelecionado, play: false})
      }
      else {
        setVideoSelecionado({...videoSelecionado, play: true})
      }
    }

  const onChangeVolume = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue / 100);
    }
  };

  const onChangeBotaoVolume = () => {
    setBotaoVolume(!botaoVolume);
  };

  const onChangeVideo = (videoAtual: Video, acao: string) => {
    const posicao = videos.findIndex(v => v.urlVideo === videoAtual.urlVideo);
    if (acao === "next")
    {
      setVideoSelecionado(videos[posicao + 1])
    } else if (acao === "prev" && posicao !== 0) {
      setVideoSelecionado(videos[posicao - 1])
    } else if (acao === "load")
    {
      setVideoSelecionado(videoAtual)
    }
  };

  return (
    <HomeContext.Provider
      value={{
        onChangePlay,
        videoSelecionado,
        onChangeVideo,
        volume,
        onChangeVolume,
        botaoVolume,
        onChangeBotaoVolume,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
