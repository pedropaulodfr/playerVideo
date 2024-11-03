"use client";

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { videos } from './dados/video'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeMute from "@mui/icons-material/VolumeMute";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Sidebar from '../components/Sidebar';
import PlayerVideo from "@/components/PlayerVideo";


export default function Home() {
  const { videoSelecionado, onChangeVideo, onChangePlay } = useContext(HomeContext);
  const { volume, onChangeVolume, botaoVolume, onChangeBotaoVolume } = useContext(HomeContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{zIndex: 9999}}><Sidebar/></div>

      <div className="info-music">
        <div className="cover-music"  style={{width: "80vw"}}>
          <PlayerVideo videoSrc={videoSelecionado.urlVideo} mute={false} play={videoSelecionado.play} volume={volume} />
        </div>
        <div className="description-music">
          <h1 style={{fontSize: "1.3em", fontWeight: "bold"}}>{videoSelecionado.name}</h1>
          <h2 style={{fontSize: "1em", fontWeight: "normal"}}>{videoSelecionado.author}</h2>
        </div>
      </div>

      <div className="flex flex-row">
        <button className="m-2" onClick={() => onChangeVideo(videoSelecionado, "prev")}>
          <BiSkipPreviousCircle size={45} />
        </button>
        <button className="m-2" onClick={() => onChangePlay()}>
          {videoSelecionado.play ? <FaRegCirclePause size={60} /> : <FaRegCirclePlay size={60} />}
        </button>
        <button className="m-2" onClick={() => onChangeVideo(videoSelecionado, "next")}>
          <BiSkipNextCircle size={45} />
        </button>
        <button onClick={onChangeBotaoVolume}>
          {volume > 50 ? <VolumeUp /> : volume != 0 ? <VolumeDown /> : <VolumeMute />}
        </button>
      </div>

      {botaoVolume && (
        <div className="slider-volume">
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }} >
              <button onClick={() => {onChangeVolume(new Event(''), 0);}}>
                {(volume * 100) > 50 ? <VolumeUp /> : volume != 0 ? <VolumeDown /> : <VolumeMute />}
              </button>
              <Slider aria-label="Volume" value={volume * 100} onChange={onChangeVolume} style={{color: '#333333'}}/>
            </Stack>
          </Box>
        </div>
      )}
    </main>
  );
}
