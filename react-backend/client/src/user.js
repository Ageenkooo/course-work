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
    background-color: rgba(224,190,191, 1);
    border-radius: 5px;
    padding: 2%;
    margin-top: 2vw;
    color: white;
    margin-left: 8%;
    margin-right: 8%;
`;
const Div = styled.div`
    &.line{
        border-right: 2px solid white;
    }   
    padding: 2%;
`;
class User extends Component {

    //   static contextTypes = { router: React.PropTypes.object }
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
            return this.state.ticketsData.map((data)=>{return <div><p>{data.film}- {data.time} - {data.cinema} -{data.date}</p>
                                                    {data.tickets.map((ticket)=>{return <span> Место {ticket} </span>})}</div>})
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
    render() {
        return (
            <Form>
            <Div className="line">
                <p>Имя пользователя : {this.state.name}</p>
                <p>Email : {this.state.email}</p>
                <RegularButton onClick={this.Logout} value="Выйти"></RegularButton>
            </Div>
            <Div>
                <p>Заказанные билеты</p>
            {this.showTickets()}</Div>
            </Form>
        );
    }
}

export default withRouter(User);
