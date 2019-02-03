import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import $ from 'jquery';
import RegularButton from './stories/button/regularButton';
import {withRouter} from "react-router-dom";
import styled from 'styled-components';

window.jQuery = window.$ = $;
const Form = styled.div `
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* background-color: #2f3c5e; */
    border-radius: 5px;
    padding: 2%;
    margin-top: 2vw;
    color: white;
    margin-left: 8%;
    margin-right: 8%;
`;
const Div = styled.div`
    color: #dedcee;
    &.line{
        background-color: #1F2124;
        border-right: 2px solid white;
    }   
    padding: 2%;
`;
const Span = styled.span`
    color: #54546c;
`;
class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            ticketsData: []
        }
        this.Logout = this
            .Logout
            .bind(this);
            this.showTickets=this.showTickets.bind(this);
            this.countTickets=this.countTickets.bind(this);
    }

    componentDidMount() {
        fetch('users/userinfo')
            .then(res => res.json())
            .then((res) => {
                this.state.name = res.name;
                this.state.email = res.email;
                this.state.password = res.password;
                this.state.ticketsData = res.tickets;
                this.setState(this.state);
            })
    }
    showTickets(){
        if(this.state.ticketsData[0])
            return this.state.ticketsData.map((data)=>
            {return <div><p>"{data.film}" - {data.time} - {data.cinema} -{data.date}</p>
               <p>Места :</p>                                     
            {data.tickets.map((ticket)=>{return <span> Место {ticket+1} </span>})}
            <hr/></div>})
        else{
            return <p>Вы еще не заказали ни одного билета</p>
        }
    }
    Logout() {
        $.ajax({
            type: 'post',
            url: '/users/logout',
            data: JSON.stringify({email: this.state.email}),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {

                if (data == 'Access') {
                    console.log("ok")
                    this
                        .props
                        .history
                        .push('/');
                }
            }
        });
    }
    countTickets(){
        var tickets = 0;
        this.state.ticketsData.forEach((cur)=>{tickets += cur.tickets.length})
        return tickets;
    }
    render() {
        return (
            <Form>
            <Div className="line">
                <p><Span >Пользователь </Span></p>
                <p><Span>Имя  :</Span> {this.state.name}</p>
                <p><Span>Email :</Span> {this.state.email}</p>
                <p><Span>Количество билетов :</Span> {this.countTickets()}</p>
                <RegularButton onClick={this.Logout} value="Выйти"></RegularButton>
            </Div>
            <Div>
                <p><Span>Заказанные билеты</Span></p>
            {this.showTickets()}</Div>
            </Form>
        );
    }
}

export default withRouter(User);
