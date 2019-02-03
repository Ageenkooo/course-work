import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import $ from 'jquery';
import RegularButton from './stories/button/regularButton';
import Input from './stories/input/input'
import styled from 'styled-components';
import {withRouter} from "react-router-dom";

window.jQuery = window.$ = $;
const Form = styled.form `
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #2f3c5e;
    border-radius: 5px;
    margin-top: 2vw;
    color: white;
    margin-left: 25%;
    margin-right: 25%;
`;

const Span = styled.span `
    color: #54546c;
`;
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPass: '',
            linking: true,
            emailMes: '',
            passMes: ''
        };
        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        if (e.target.name == "email" && /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(e.target.value)) 
            this.state.emailMes = "Валидный email"
        else if (e.target.name == "email") 
            this.state.emailMes = "Невалидный,вводите еще";
        
        if (e.target.name == "confirmPass" && e.target.value == this.state.password) 
            this.state.passMes = "Пароли совпадают"
        else if (e.target.name == "confirmPass") 
            this.state.passMes = "Пароли не совпадают!"
        this.setState(state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password != '' && this.state.confirmPass != '' && this.state.password == this.state.confirmPass && this.state.emailMes == "Валидный email") {
            $.ajax({
                type: 'post',
                url: '/users/registration',
                data: JSON.stringify(
                    {email: this.state.email, password: this.state.password, name: this.state.name}
                ),
                dataType: "json",
                contentType: "application/json",
                success: (data) => {
                    if (data == "ok") 
                        this
                            .props
                            .history
                            .push('/login');
                    }
                });
        }
    }
    handleClick(e) {
        if (!this.state.linking) 
            e.preventDefault();
        }
    render() {
        return (
            <Form onSubmit={this.onSubmit} action="/registration" method="post">
                <p >Регистрация</p>
                <p >Имя пользователя
                </p>
                <Input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}/>
                <p >E-mail
                </p>
                <Input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}/>
                <Span>{this.state.emailMes}</Span>
                <p >Введите пароль
                </p>
                <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}/>
                <p >
                    Повторите пароль
                </p>
                <Input
                    type="password"
                    name="confirmPass"
                    value={this.state.confirmPass}
                    onChange={this.onChange}/>
                    <Span>{this.state.passMes}</Span>
                <br/>
                <RegularButton value={"Зарегистрироваться"}></RegularButton>
            </Form>
        );
    }
}

export default withRouter(Registration);
