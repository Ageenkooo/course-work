import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import $ from 'jquery';
import {withRouter} from "react-router-dom";

window.jQuery = window.$ = $;

class User extends Component {

    //   static contextTypes = { router: React.PropTypes.object }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.Logout = this
            .Logout
            .bind(this);
    }

    componentDidMount() {
        fetch('users/userinfo')
            .then(res => res.json())
            .then((res) => {
                this.state.name = res.name;
                this.state.email = res.email;
                this.state.password = res.password;
                this.setState(this.state);
            })
    }
    Logout() {
        $.ajax({
            type: 'post',
            url: '/users/logout',
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
    render() {
        return (
            <div>
                <p>{this.state.name}</p>
                <button onClick={this.Logout}>Выйти</button>
            </div>
        );
    }
}

export default withRouter(User);
