import React, {Component} from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import cn from 'classnames';
import './App.css';
import Header from './stories/header/header'
import Film from './stories/film/film'
import CinemaList from './stories/cinema/cinema'
import Calendar from './stories/calendar/calendar'
import Lable from './stories/lable/lable'
import $ from 'jquery';
window.jQuery = window.$ = $;

const MyCinemaList = styled.div `
    margin-top: 15vh;
    position: absolute !important;
    left: 0px;
`;

const P = styled.p `
    padding-left: 3.5vw;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.show = this
            .show
            .bind(this);
        this.showCinemas = this
            .showCinemas
            .bind(this);
        this.sortFilms = this
            .sortFilms
            .bind(this);
        this.state = {
            cinema: '',
            cinemas: [],
            films: [],
            sessions: []
        }
    }
    componentDidMount() {
        fetch('/cinemas').then((res) => {
            res
                .json()
                .then((result) => {
                    this.setState({cinemas: result});
                })
        });
        fetch('/films').then((res) => {
            res
                .json()
                .then((result) => {
                    this.setState({films: result});
                })
        })
    }
    sortFilms(e) {
        const state = this.state;
        state[e.target.getAttribute("name")] = e.target.innerHTML;
        this.setState(state);
        $.ajax({
            type: 'post',
            url: '/sessions',
            data: JSON.stringify({cinema: this.state.cinema}),
            dataType: "json",
            contentType: "application/json",
            success: (data)=>{
                console.log(data)
                this.setState({films: data.map((one)=>{return {name: one}})});
            },
        });
    }
    showCinemas() {
        return this
            .state
            .cinemas
            .map((cinema) => {
                return <Lable onClick={this.sortFilms} name={'cinema'}>{cinema.name}</Lable>
            })
    }
    show() {
        return this
            .state
            .films
            .map((film) => {
                return <Film name={film.name}
                    // from={film.date}
/>
            })
    }
    render() {
        return (
            <div >

                <MyCinemaList>
                    <CinemaList>
                        <P>Кинотеатры</P>
                        {this.showCinemas()}
                    </CinemaList>
                </MyCinemaList>
                <Calendar/> {this.show()}
            </div>
        );
    }
}

export default App;
