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
import Seats from './stories/seats/seats'
import RegularButton from './stories/button/regularButton'
window.jQuery = window.$ = $;

const Div = styled.div `
    &.main{
        margin-top: 2vw;
    }
    &.flex{
        display: flex;
        flex-direction: column;
        margin-bottom: 2vw;
        align-items: center;
        justify-content: flex-start;
    }
    &.tickets{
        width: 47vw;
        text-align:center;
    }

`;

const P = styled.p `
    &.seat{
        float: left;
        padding: 2vw;
    }
`;
class SessionData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            name: ''
        }
        this.click = this
            .click
            .bind(this);
        this.showTickets = this
            .showTickets
            .bind(this);
        this.addTickets = this
            .addTickets
            .bind(this);
    }
    click(key, available) {
        if (available == "available") {
            if (this.state.tickets.includes(key + 1)) {
                this.state.tickets = this
                    .state
                    .tickets
                    .filter((ticket) => {
                        return ticket != (key + 1)
                    })
            } else 
                this
                    .state
                    .tickets
                    .push(key + 1);
            this.setState(this);
        }
    }
    showTickets() {
        if (this.state.tickets.length != 0) 
            return <Div className={"tickets"}>
                <p>Билеты для заказа:</p>
                {
                    this
                        .state
                        .tickets
                        .map((ticket) => {
                            return <span>Место {ticket} ,
                            </span>
                        })
                }</Div>
        else 
            return <p>Выберите места для заказа</p>
    }
    addTickets() {
        $.ajax({
            type: 'get',
            url: '/users/userinfo',
            dataType: "json",
            contentType: "application/json",
            response: 'text',
            success: ((data) => {
                this.state.name = data.name;
                this.setState(this);
                $.ajax({
                    type: 'post',
                    url: '/users/addtickets',
                    data: JSON.stringify({
                        name: this.state.name,
                        ticketsData: {
                            film: this.props.activeSession.film,
                            time: this.props.activeSession.time,
                            date: this.props.activeSession.date,
                            cinema: this.props.activeSession.cinema,
                            tickets: this.state.tickets
                        }
                    }),
                    dataType: "json",
                    contentType: "application/json"
                });
            })
        });
        for(var i=0; i<this.state.tickets.length; i++)
        {$.ajax({
            type: 'post',
            url: '/users/changesessionseats',
            data: JSON.stringify({
                film: this.props.activeSession.film, time: this.props.activeSession.time, date: this.props.activeSession.date, cinema: this.props.activeSession.cinema, seat: this
                    .state
                    .tickets[i]
            }),
            dataType: "json",
            contentType: "application/json"
        });}

    }
    render() {
        return (
            <Div className={"main flex space"}>
                <p>"{this.props.activeSession.film}" - {this.props.activeSession.time}
                    - {this.props.activeSession.date}
                    - {this.props.activeSession.cinema}</p>
                <Seats seats={this.props.activeSession.seats} onClick={this.click}/> {this.showTickets()}
                <RegularButton value={"Заказать места"} onClick={this.addTickets}></RegularButton>
            </Div>

        );
    }
}
function mapStateToProps(state) {
    return {activeSession: state.activeSession};
}

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, matchDispatchToProps)(SessionData);
