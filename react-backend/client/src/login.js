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
const P = styled.p`
    color: white;
`;
const Span = styled.span `
    color: #54546c;
`;
class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            linking: true,
            message: ''
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
    onChange(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.state.message= '';
        this.setState(state);
    }
    onSubmit(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/login',
            data: JSON.stringify({email: this.state.email, password: this.state.password}),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {
                this.state.message= '';
                if (data == 'Access') {
                    this
                        .props
                        .history
                        .push('/');
                }
            } ,
            error: this.state.message = "Неправильный e-mail или пароль"
        });
        this.setState(this);
    }
    handleClick(e) {
        if (!this.state.linking) 
            e.preventDefault();
        }
    
    render() {
        return (
            <Form onSubmit={this.onSubmit} action="/signIn" method="post">
                <p>Вход на сайт</p>
                <br/>
                <p >Ваш e-mail</p>
                <Input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}/>
                <p >Ваш пароль</p>
                <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}/>
                <br/>
                <RegularButton type="submit" value="Войти"></RegularButton><Span>{this.state.message}</Span>
                <Link to={'/registration'}>
                    <P>Зарегистрироваться</P>
                </Link>
            </Form>
        );
    }
}

export default withRouter(LogIn);
