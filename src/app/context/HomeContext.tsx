"use client";
import React, { createContext, ReactNode, useState, useEffect, SetStateAction } from "react";

type HomeContextData = {
  playing: boolean;
  onChangePlay: () => void;
  volume: number;
  onChangeVolume: (event: Event, newValue: number | number[]) => void;
  botaoVolume: boolean;
  onChangeBotaoVolume: () => void;
  onChangeAudio: (musica: string, index: number) => void;
  musicaSelecionada: number;
  setMusicaSelecionada: React.Dispatch<React.SetStateAction<number>>;
};

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
  children: ReactNode;
};

const HomeContextProvider = ({ children }: ProviderProps) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(30);
  const [botaoVolume, setBotaoVolume] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [musicaSelecionada, setMusicaSelecionada] = useState<number>(0)

  const onChangePlay = () => {
    if (audio) {
      if (playing) 
        audio.pause(); 
      else
        audio.play(); 
      
      setPlaying(!playing); 
    }
  };
  
  // Atualiza o áudio quando uma nova música for selecionada
  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setPlaying(false); // Reseta o estado quando a música termina
      };
      
      // Sincroniza o volume do novo áudio
      audio.volume = volume / 100;
      if (playing)
        audio.pause();
      else 
        audio.play();
    }
  }, [audio, playing, volume, musicaSelecionada]); // O efeito escuta mudanças no audio, playing, e volume
  

  const onChangeVolume = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const onChangeBotaoVolume = () => {
    setBotaoVolume(!botaoVolume);
  };

  const onChangeAudio = (musica: string, index: number) => {
    if (audio)
      audio.pause(); // Pausa a música atual antes de trocar
  
    const newAudio = new Audio(musica); // Cria o novo áudio
    newAudio.volume = volume / 100; // Ajusta o volume do novo áudio
    setAudio(newAudio); // Atualiza o estado com o novo áudio
    setPlaying(true); // Define como tocando
    setMusicaSelecionada(index); // Atualiza index da nova música
  
    newAudio.play(); // Toca a nova música
  };

  return (
    <HomeContext.Provider
      value={{
        playing,
        onChangePlay,
        volume,
        onChangeVolume,
        botaoVolume,
        onChangeBotaoVolume,
        onChangeAudio,
        musicaSelecionada,
        setMusicaSelecionada
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
