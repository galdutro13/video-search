import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null,
      videoData: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const response = await fetch(`http://localhost:4000/video/${id}/data`);
      const data = await response.json();
      console.log(data);
      this.setState({ videoId: id, videoData: data, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    console.log('Componente desmontado');
  }

  handleBackClick = () => {
    this.props.navigate(-1);
  }

  render() {
    console.log('Valor de videoId:', this.state.videoId);
    return (
      <div className="App">
        <header className="App-header" style={{textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)', backgroundColor: '#6699cc'}}>
        <div className="Arrow Left" style={{ cursor: 'pointer', position: 'absolute', left: '50px', top: '50px'}} onClick={this.handleBackClick}>
          <i class="arrow left" style={{ height: '15px', width: '15px'}}></i>
          <p style={{ display: 'inline', color: '#f9cb08', fontWeight: 'bold', paddingLeft: '4px'}}>Voltar</p>
        </div>

        {this.state.videoId && (
          <video 
          style={{ width: "50%", height: "auto", boxShadow: '4px 3px 8px rgba(0, 0, 0, 0.5)' }}
          controls autoPlay>
            <source
              src={`http://localhost:4000/videos/${this.state.videoId}`}
              type="video/mp4"
            />
          </video> 
        )}
        </header>
      </div>
    );
  }
}

const PlayerWrapper = () => {
  const params = useParams();
  const navigate = useNavigate();

  return <Player match={{ params }} navigate={ navigate } />;
};

export default PlayerWrapper;