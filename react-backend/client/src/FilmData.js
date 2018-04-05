import React, {Component} from 'react';
import logo from './logo.svg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions';
import styled from 'styled-components';
import Img from 'react-image';
import YouTube from 'react-youtube';
import cn from 'classnames';
import $ from 'jquery';
window.jQuery = window.$ = $;

const Div = styled.div `
    &.main{
        margin-top: 2vw;
    }
    &.flex{
        display: flex;
        margin-bottom: 2vw;
    }
    &.space{
        justify-content:space-around;
        width: 100%;
    }
`;

const P = styled.p `
    padding: 1vw 3vw;
`;
class FilmData extends Component {
    constructor(props) {
        super(props);
        this.state = {sessions: []};
        this.showSessions = this.showSessions.bind(this);
    }
    _onReady(event) {
        event
            .target
            .pauseVideo();
    }
    showSessions() {
            $.ajax({
                type: 'post',
                url: '/sessions',
                data: JSON.stringify({film: this.props.activeFilm.name}),
                dataType: "json",
                contentType: "application/json",
                success: (data) => {
                    this.setState({
                        sessions: data,
                    });
                }
            });
            console.log(this.state.sessions)
    }
    render() {
        const opts = {
            height: '250',
            width: '460',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
                showinfo: 0,
                modestbranding: 1
            }
        };
        return (
            <Div className={"main"}>
                <Div className={"flex"}>
                    <Img
                        src={this.props.activeFilm.poster}
                        height='25%'
                        width='15%'
                        border-radius='10px'/>
                    <div>
                        <Div className={"flex space"}>
                            <p>{this.props.activeFilm.name}</p>
                            <p>Режиссер: {this.props.activeFilm.producer}</p>
                            <p>Страна: {this.props.activeFilm.country}</p>
                        </Div>
                        <P className={"desc"}>{
                                this
                                    .props
                                    .activeFilm
                                    .description
                                    .slice(0, 400)
                            }...</P>
                    </div>
                </Div>
                <Div className={"flex"}>
                <YouTube
                    videoId={this.props.activeFilm.trailer}
                    opts={opts}
                    onReady={this._onReady}/>
                    

                    {this.showSessions()}
                    </Div>
            </Div>

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
