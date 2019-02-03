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
    &.img{
        border:1px solid white;
        height: 300px;
        width: 200px;
    }
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
    &.centerAlign{
        align-items: center;
    }
    &.film{
        padding-left:5%;
        padding-right: 5%;
    }
    &.center{
        padding: 0 10%;
    }
    &.color{
        background-color: #2f3c5e;
        opacity: 0.7;
        width: 96%;
        padding: 2%;
    }
    &.color:hover{
        opacity: 0.95;
    }
    &.film, &.desc{
        color: #dedcee;
        text-shadow: black 0 0 2px;
    }
`;

const P = styled.p `
    color: white;
    font-size: 1.4vw;
    font-style: italic;
`;

const Span = styled.span`
    color: #54546c;
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
                    {/* <Div className={"img"}> */}
                    <Img
                        src={this.props.activeFilm.poster}
                        height='300px'
                        width='200px'/>
                        {/* </Div> */}
                    <Div className={"film"}>
                        <Div className={"flex space centerAlign"}>
                            <P>{this.props.activeFilm.name}</P>
                            <p><Span>Режиссер: </Span>{this.props.activeFilm.producer}</p>
                            <p><Span>Страна:</Span> {this.props.activeFilm.country}</p>
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
