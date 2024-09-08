type Music = {
    name: string;
    author: string;
    description: string;
    urlAudio: string;
    image: string;
}

export const musics: Music[] = [
    {
        name: "Eletronic",
        author: "Desconhecido",
        description: "musica 01",
        urlAudio: "musicas/audio1.mp3",
        image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/electronic-music-album-cover-template-design-12b51a1ad56ef5851bc8068dd8c79aaf_screen.jpg"
    },
    {
        name: "Sina",
        author: "Djavan",
        description: "musica 02",
        urlAudio: "musicas/audio2.mp3",
        image: "https://cdn.folhape.com.br/img/c/1200/900/dn_arquivo/2019/05/djavan-chamada.jpg"
    },
    {
        name: "Velha roupa colorida",
        author: "Belchior",
        description: "musica 03",
        urlAudio: "musicas/audio3.mp3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXP0ZkNA5BdQaYIn6IA7_c1xkzYGFly-SWMw&s"
    }
]