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
        imagesLoaded(grid, () => {
            new Masonry(grid, {
                itemSelector: '.grid-item',
                columnWidth: columnWidth,
                percentPosition: true,
            });
        });
    }

    async fetchVideos() {
        try {
            const response = await fetch('http://localhost:4000/videos');
            const data = await response.json();
            this.setState({ videos: data });
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

    render() {
        const { videos } = this.state;
        return (
            <div className="App App-header">
                <h1 style={{fontSize: '30px', marginTop: '25px', marginBottom: '25px'}}>30 TECNOLOGIAS DA USP QUE VOCÊ PRECISA CONHECER!</h1>
                <div className="container" style={{maxWidth: '1350px'}}>
                    <div className="grid" ref={this.gridRef}>
                        <div className="grid-sizer"></div>
                        {videos.map(video => (
                            <div className="grid-item" key={video.id} style={{ maxWidth: '180px', marginBottom: '35px' }}>
                                <Link to={`/player/${video.id}`}>
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <p style={{fontSize: '12px'}}>{video.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="searchBox" style={{position: 'absolute', right: '50px', top: '50px', fontSize: '15px'}}>
                        <SearchBox callback={this.handleSearch} />
                    </div>
                </div>
            </div>
        )
    }
}
