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
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/videos');
            const data = await response.json();
            this.setState({ videos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }

    async componentQuery(query) {
        try {
            const response = await axios.get('http://localhost:4000/video', {
                params: {
                    query: query
                }
            });
            const data = await response.json();
            this.setState({ videos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="App App-header">
                <div className="container">
                    <div className="row">
                        {this.state.videos.map(video =>
                        <div className="col-md-4" key={video.id}>
                            <Link to={`/player/${video.id}`}>
                                <div className="card border-0">
                                    <div className="card-body">
                                        <p>{video.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )}
                    </div>
                    <div className="searchBox">
                        <SearchBox callback{...this.componentQuery} />
                    </div>
                </div>
            </div>
        )
    }
}