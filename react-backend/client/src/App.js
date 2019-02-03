import React, {Component} from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import cn from 'classnames';
import './App.css';
import {Link} from 'react-router-dom'
import Header from './stories/header/header'
import Film from './stories/film/film'
import CinemaList from './stories/cinema/cinema'
import Calendar from './stories/calendar/calendar'
import Lable from './stories/lable/lable'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions';
import $ from 'jquery';
window.jQuery = window.$ = $;

const MyCinemaList = styled.div `
    margin-top: 15vh;
    position: absolute !important;
    left: 0px;
`;
// const Div = styled.div`
//     background-color: rgba(224,190,191, 1);
//     margin: 2vw; 
// `;
const P = styled.p `
    color: white;
    font-size: 1.3vw;
    padding-left: 3.5vw;
    text-align:center;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.filterFilms = this
            .filterFilms
            .bind(this);
        this.show = this
            .show
            .bind(this);
        this.showCinemas = this
            .showCinemas
            .bind(this);
        this.sortFilms = this
            .sortFilms
            .bind(this);
        this.changeDate = this
            .changeDate
            .bind(this);
        this.state = {
            cinema: '',
            cinemas: [],
            films: [],
            currentfilms: [],
            filmsbydate: [],
            filmsbysession: [],
            sessions: [],
            date: '',
            activeCinema: "",
        }
    }
    componentDidMount() {
        fetch('/cinemas').then((res) => {
            res
                .json()
                .then((result) => {

                    this.setState({cinemas: result});
                    console.log(this.state.cinemas)
                })
                .catch((err) => {
                    console.log(err)
                })
            });
        fetch('/films').then((res) => {
            res
                .json()
                .then((result) => {
                    this.setState({films: result});
                    this.setState({currentfilms: result});
                })
                .catch((err) => {
                    console.log(err)
                })
            })
    }
    sortFilms(e) {
        const state = this.state;
        state[
            e
                .target
                .getAttribute("name")
        ] = e.target.innerHTML;
        this.state.activeCinema = e.target.innerHTML;
        this.setState(state);
        $.ajax({
            type: 'post',
            url: '/sessions',
            data: this.state.date
                ? JSON.stringify({cinema: this.state.cinema, date: this.state.date})
                : JSON.stringify({cinema: this.state.cinema}),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {
                this.setState({
                    filmsbysession: data.map((one) => {
                        return one.film
                    })
                });
                this.filterFilms(this.state.filmsbysession);
            }
        });
    }
    showCinemas() {
        return this
            .state
            .cinemas
            .map((cinema) => {
                return <Lable onClick={this.sortFilms} className={this.state.active} name={'cinema'}>{cinema.name}</Lable>
            })
    }
    changeDate(e) {
        if (e.target.getAttribute('datetime') !== null) {
            this.state.date = e
                .target
                .getAttribute('datetime')
                .slice(0, 10)
                .replace(new RegExp("-", 'g'), '.');
            this.setState(this);
            console.log(this.state)
            $.ajax({
                type: 'post',
                url: '/sessions',
                data: this.state.cinema
                    ? JSON.stringify({cinema: this.state.cinema, date: this.state.date})
                    : JSON.stringify({date: this.state.date}),
                dataType: "json",
                contentType: "application/json",
                success: (data) => {
                    this.setState({
                        filmsbydate: data.map((one) => {
                            return one.film
                        })
                    });
                    this.filterFilms(this.state.filmsbydate);
                }
            });
        }
    }
    filterFilms(array) {
        this.state.films = this
            .state
            .currentfilms
            .filter((film) => {
                return array.indexOf(film.name) > -1
            });
        this.setState(this);
    }
    show() {
        if (this.state.films.length != 0) 
            return this
                .state
                .films
                .map((film) => {
                    return <Link to={`/about/${film.name}`} key={film.name}>
                        <Film
                            name={film.name}
                            src={film.poster}
                            onClick={() => {
                                this
                                    .props
                                    .actions
                                    .select(film)
                            }}/>
                    </Link>
                })
        else 
            return <p>Нет фильмов на эту дату или в этом кинотеатре</p>
    }
    render() {
        return (
            <div >
                <MyCinemaList>
                    <CinemaList>
                        {this.showCinemas()}
                    </CinemaList>
                </MyCinemaList>
                <Calendar onClick={this.changeDate}/> <div><P>{this.state.activeCinema}</P></div>{this.show()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {films: state.films};
}

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
export default connect(mapStateToProps, matchDispatchToProps)(App);
