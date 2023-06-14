import React, { Component } from "react";

export default class Player extends Component {
    constructor(props) {
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {}

        }
    }

    async componentDidMount() {
        try {
            const response = await fetch(`http://localhost:4000/videos/${this.state.videoId}`);
            const data = await response.json();
            this.setState({ videoData: data });
        }
        catch (err) {
            console.log(err);
        }

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <video controls muted autoplay>
                        <source src={`http://localhost:4000/${this.state.videoData.video}`} type="video/mp4" />

                    </video>
                    <h1>{this.state.videoData.name}</h1>
                    </header>
                    
            </div>
        )
    }};