import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import SearchBox from './components/searchBox';
import axios from "axios";
import VideoHoverCard from './components/videoPreview';
import './Home.css'

const postitImages = [
    "assets/postits/1.png",
    'assets/postits/2.png',
    'assets/postits/3.png',
    'assets/postits/4.png',
    'assets/postits/5.png',
    'assets/postits/6.png',
    'assets/postits/7.png',
    'assets/postits/8.png',
    'assets/postits/9.png',
    'assets/postits/10.png',
    'assets/postits/11.png',
    'assets/postits/12.png',
    'assets/postits/13.png',
    'assets/postits/14.png',
    'assets/postits/15.png',
    'assets/postits/16.png',
    'assets/postits/17.png',
    'assets/postits/18.png',
    'assets/postits/19.png',
    'assets/postits/20.png',
    'assets/postits/21.png',
    'assets/postits/22.png',
    'assets/postits/23.png',
    'assets/postits/24.png',
    'assets/postits/25.png',
    'assets/postits/26.png',
    'assets/postits/27.png',
    'assets/postits/28.png',
    'assets/postits/29.png',
    'assets/postits/30.png',
]
export default class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            videos: []
        };
        this.gridRef = React.createRef();
        this.msnry = null;
    }

    componentDidMount() {
        this.fetchVideos();
    }

    componentDidUpdate() {
        // Inicializa o Masonry
        const grid = this.gridRef.current;
        const gridWidth = 1440;
        const numberOfColumns = 8;
        const columnWidth = gridWidth / numberOfColumns;
        this.msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: columnWidth,
            percentPosition: false,
            isFitWidth: true
        });
        imagesLoaded(grid, this.msnry);
    }

    async fetchVideos() {
        try {
            const response = await fetch('http://localhost:4000/videos');
            const data = await response.json();
            this.setState({ videos: data }, () => {
                this.msnry.reloadItems();
                this.msnry.layout();
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleSearch = async (query) => {
        try {
            if (query === '') {
                this.fetchVideos();
                return;
            } else {
                const response = await axios.get('http://localhost:4000/search?query=' + query);
                const data = response.data;
                this.setState({ videos: data });
            }
        } catch (error) {
            console.log(error);
        }
    }

    getRandomColor(previousColor) {
        // Define o conjunto de cores
        const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff'];
        // Filtra o conjunto de cores para remover a cor do card anterior
        const availableColors = colors.filter(color => color !== previousColor);
        // Gera um índice aleatório
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        // Retorna a cor correspondente ao índice gerado
        return availableColors[randomIndex];
    }

    render() {
        const { videos } = this.state;
        let previousColor = null;
        return (
            <div className="App App-header" style={{backgroundColor: '#6699cc'}}>
                <h1 style={{fontSize: '30px', marginTop: '25px', marginBottom: '25px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.65)', }}>30 TECNOLOGIAS DA USP QUE VOCÊ PRECISA CONHECER!</h1>
                <div className="container" style={{ maxWidth: '1620px', minHeight: '768px' }}>
                    <div className="grid" ref={this.gridRef} style={{position:'absolute', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <div className="grid-sizer"></div>
                        
                        {videos.map(video => {
                            const color = this.getRandomColor(previousColor);
                            const imageIndex = video.id % 30;
                            previousColor = color;
                            
                            const baseFontSize = 16; // O tamanho de fonte base em pixels
                            const maxLength = 50; // O comprimento máximo de texto que você espera
                            const fontSize = Math.max(baseFontSize * (1 - (video.title.length - 20) / maxLength), 9) + "px";

                            const backgroundStyle = {
                                maxWidth: '160px',
                                height: 'auto', 
                                marginBottom: '30px',
                                marginTop: '30px',
                                //boxShadow: '4px 3px 5px rgba(0, 0, 0, 0.6)',
                                overflow: 'visible'
                                // outros estilos aqui
                            };

                            const cardBackGround = {
                                //backgroundImage: `url(${postitImages[imageIndex]})`,
                                backgroundSize: 'cover',  // ou 'contain'
                                backgroundRepeat: 'no-repeat',
                                backgroundClip: 'border-box',
                                position: 'center', // novo
                                overflow: 'visible',
                                zIndex: 1 // novo
                            }

                            const cardBodyStyle = {
                                position: 'relative', 
                                zIndex: 2
                            }
                            
                            return (
                            <div className="grid-item" key={video.id} style={backgroundStyle}>
                                <Link to={`/player/${video.id}`}>
                                    <div className="card-content">
                                        <img src={postitImages[imageIndex]} className="postit-overlay"/>
                                        <div className="card transparent-card" style={cardBackGround}>
                                            <div className="card-body" style={cardBodyStyle}>
                                                <VideoHoverCard videoId={video.id} videoTitle={video.title} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            );
                        })}
                        <div className="grid-item">
                            <label style={{fontSize: '15px', fontFamily: 'cursive'}}>Digite aqui palavras chave:</label>
                            <div className="searchBox" style={{fontSize: '15px', marginBottom: '35px', position: 'sticky'}}>
                                <SearchBox callback={this.handleSearch} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
