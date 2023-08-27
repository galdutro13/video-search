import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import SearchBox from './components/searchBox';
import axios from "axios";

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
        const gridWidth = 1350;
        const numberOfColumns = 6;
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
                <h1 style={{fontSize: '30px', marginTop: '25px', marginBottom: '25px'}}>30 TECNOLOGIAS DA USP QUE VOCÊ PRECISA CONHECER!</h1>
                <div className="container" style={{ maxWidth: '1536px', minHeight: '1000px' }}>
                    <div className="grid" ref={this.gridRef} style={{position:'absolute', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <div className="grid-sizer"></div>
                        <div className="grid-item">
                            <label style={{fontSize: '15px', fontFamily: 'cursive'}}>digite aqui palavrs chave:</label>
                            <div className="searchBox" style={{fontSize: '15px', marginBottom: '35px', position: 'sticky'}}>
                                <SearchBox callback={this.handleSearch} />
                            </div>
                        </div>
                        {videos.map(video => {
                            const color = this.getRandomColor(previousColor);
                            previousColor = color;
                            
                            const baseFontSize = 16; // O tamanho de fonte base em pixels
                            const maxLength = 50; // O comprimento máximo de texto que você espera
                            const fontSize = Math.max(baseFontSize * (1 - (video.title.length - 20) / maxLength), 12) + "px";
                            
                            return (
                            <div className="grid-item" key={video.id} style={{ maxWidth: '180px', marginBottom: '35px', boxShadow: '4px 3px 5px rgba(0, 0, 0, 0.6)' }}>
                                <Link to={`/player/${video.id}`}>
                                    <div className="card border-0" style={{ backgroundColor: color }}>
                                        <div className="card-body">
                                            <p style={{fontSize: '12px', fontFamily: 'cursive', color: 'black'}}>{video.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            );
                        })}
                    </div>
                    
                </div>
            </div>
        )
    }
}
