import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './components/searchBox';
import axios from "axios";
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }

    componentDidMount() {
        this.fetchVideos();
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
                <div className="container">
                    <div className="row">
                        {videos.map(video => (
                            <div className="col-md-4" key={video.id}>
                                <Link to={`/player/${video.id}`}>
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <p>{video.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="searchBox">
                        <SearchBox callback={this.handleSearch} />
                    </div>
                </div>
            </div>
        )
    }
}