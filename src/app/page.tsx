"use client";

import { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { musics } from '../app/dados/music';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeMute from "@mui/icons-material/VolumeMute";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { playing, onChangePlay } = useContext(HomeContext);
  const { volume, onChangeVolume } = useContext(HomeContext);
  const { botaoVolume, onChangeBotaoVolume } = useContext(HomeContext);
  const { musicaSelecionada } = useContext(HomeContext);
  const { onChangeAudio } = useContext(HomeContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{playing ? "Pause" : "Executando"}</h1>
      <div style={{zIndex: 9999}}><Sidebar/></div>

      <div className="info-music">
        <div className="cover-music" style={{width: "80vw"}}>
          <img src={musics[musicaSelecionada].image} width={400} />
        </div>
        <div className="description-music">
          <h1 style={{fontSize: "1.3em", fontWeight: "bold"}}>{musics[musicaSelecionada].name}</h1>
          <h2 style={{fontSize: "1em", fontWeight: "normal"}}>{musics[musicaSelecionada].author}</h2>
        </div>
      </div>

      <Slider defaultValue={0} aria-label="" />

      <div className="flex flex-row ">
        <button className="m-2">
          <BiSkipPreviousCircle onClick={() => onChangeAudio(musics[musicaSelecionada - 1].urlAudio, musicaSelecionada - 1)} size={45} />
        </button>
        <button className="m-2" onClick={() => onChangePlay()}>
          {playing ? <FaRegCirclePlay size={60} />: <FaRegCirclePause size={60} />}
        </button>
        <button className="m-2">
          <BiSkipNextCircle onClick={() => onChangeAudio(musics[musicaSelecionada + 1].urlAudio, musicaSelecionada + 1)} size={45} />
        </button>
        <button onClick={onChangeBotaoVolume}>
          {volume > 50 ? <VolumeUp /> : volume != 0 ? <VolumeDown /> : <VolumeMute />}
        </button>
      </div>

      {botaoVolume && (
        <div className="slider-volume">
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }} >
              {volume > 50 ? <VolumeUp /> : volume != 0 ? <VolumeDown /> : <VolumeMute />}
              <Slider aria-label="Volume" value={volume} onChange={onChangeVolume}/>
            </Stack>
          </Box>
        </div>
      )}
    </main>
  );
}
