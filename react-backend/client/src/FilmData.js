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
import {Link} from 'react-router-dom'
import Lable from './stories/lable/lable'
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
        justify-content:space-between;
        width: 100%;
    }
    &.film{
        padding-left:5%;
        padding-right: 5%;
    }
    &.center{
        padding: 0 10%;
    }
    &.color{
        background-color: rgba(224,190,191, 1);
        width: 96%;
        padding: 2%;
    }
    &.film, &.desc{
        color:#2f3c5e;
    }
`;

const P = styled.p `
    color: white;
`;
class FilmData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        };
        this.showSessions = this
            .showSessions
            .bind(this);
    }
    _onReady(event) {
        event
            .target
            .pauseVideo();
    }
    componentDidMount() {
        $.ajax({
            type: 'post',
            url: '/sessions',
            data: JSON.stringify({film: this.props.activeFilm.name}),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {
                this.setState({sessions: data});
            }
        });
    }
    showSessions() {

        return this
            .state
            .sessions
            .map((session) => {
                return <Link
                    to={`/seats/${session.time}`}
                    key={session.time}
                    style={{
                        textDecoration: 'none'
                    }}>
                    <Lable
                        onClick={() => {
                            this
                                .props
                                .actions
                                .selectSess(session)
                        }}
                        className={""}>{session.date}-{session.cinema}-{session.time}-{session.price}p</Lable>
                </Link>
            })
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
                    <Div className={"film"}>
                        <Div className={"flex space"}>
                            <p>{this.props.activeFilm.name}</p>
                            <p>Режиссер: {this.props.activeFilm.producer}</p>
                            <p>Страна: {this.props.activeFilm.country}</p>
                        </Div>
                        <Div className={"desc"}>{
                                this
                                    .props
                                    .activeFilm
                                    .description
                                    .slice(0, 400)
                            }...</Div>
                    </Div>
                </Div>
                <Div className={"flex space color"}>
                    <YouTube
                        videoId={this.props.activeFilm.trailer}
                        opts={opts}
                        onReady={this._onReady}/>

                    <Div className={"center"}>
                        <P>Сеансы:</P>
                        <p>{this.showSessions()}</p>
                    </Div>
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
