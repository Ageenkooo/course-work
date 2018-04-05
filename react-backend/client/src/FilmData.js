import React, {Component} from 'react';
import logo from './logo.svg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions';
import styled from 'styled-components';
import Img from 'react-image';
import YouTube from 'react-youtube';

class FilmData extends Component {
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };
        return (
            <div>
                <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={this._onReady}
      />
                <Img
                    src={this.props.activeFilm.poster}
                    height='25%'
                    width='15%'
                    border-radius='10px'/>
                <p>Film name: {this.props.activeFilm.name}</p>
                <p>Film producer: {this.props.activeFilm.producer}</p>
                <p>Film country: {this.props.activeFilm.country}</p>
                <p>Film description: {this.props.activeFilm.description}</p>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {activeFilm: state.activeFilm};
}

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, matchDispatchToProps)(FilmData);
