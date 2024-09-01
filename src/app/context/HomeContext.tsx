'use client'

import React, {createContext, ReactNode, useState} from 'react';

type HomeContextData = {
    contador: number;
    incremento: () => void;
    playing: boolean;
    onChangePlay: () => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}:ProviderProps) => {
    const [contador, setContador] = useState(0);
    const [playing, setPlaying] = useState(true);

    const incremento = () => {
       setContador(contador + 1);
    }
    const onChangePlay = () => {
        setPlaying(!playing);
    }

    return (
        <HomeContext.Provider value={
            {
                contador,
                incremento,
                playing,
                onChangePlay
            }
        }>
          {children} 
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;