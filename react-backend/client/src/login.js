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
    background-color: rgba(224,190,191, 1);
    border-radius: 5px;
    margin-top: 2vw;
    color: white;
    margin-left: 25%;
    margin-right: 25%;
`;
class LogIn extends Component {

    //   static contextTypes = { router: React.PropTypes.object }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            linking: true
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
                if (data == 'Access') {
                    this
                        .props
                        .history
                        .push('/');
                }
            }
        });
    }
    handleClick(e) {
        if (!this.state.linking) 
            e.preventDefault();
        }
    
    render() {
        return (
            <Form onSubmit={this.onSubmit} action="/signIn" method="post">
                <p>Sign in</p>
                <br/>
                <p >Your e-mail</p>
                <Input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}/>
                <p >Password</p>
                <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}/>
                <br/>
                <RegularButton type="submit" value="Войти"></RegularButton>
                <Link to={'/registration'}>
                    <p>Зарегистрироваться</p>
                </Link>
            </Form>
        );
    }
}

export default withRouter(LogIn);
