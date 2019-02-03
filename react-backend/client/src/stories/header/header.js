import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Profile from '../profile/profile'
import {Link} from 'react-router-dom'

const Div = styled.div `
    display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: white;
	padding-left: 17vw;
	padding-right: 17vw;
	font-size: 1.5vw;
    /* background-color: #2f3c5e; */
`;

const LableS = styled.p `
    color : white;
	font-size : 1em;
	margin-top: 1em;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
	/* padding: 2%; */
`;
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"Вход/Регистрация"
        };
    }

    componentDidMount() {
        fetch('users/userinfo')
            .then(res => res.json())
            .then((res) => {
                this.state.name = res.name;
                this.setState(this.state);
            })
    }
    componentWillMount(){
        fetch('users/userinfo')
            .then(res => res.json())
            .then((res) => {
                this.state.name = res.name;
                this.setState(this.state);
            })
            .catch((err)=>{
                this.state.name = "Вход/Регистрация";
                this.setState(this.state);
            })
    }
    
    render() {
        return <Div>
            <Link
                to={`/`}
                style={{
                    textDecoration: 'none'
                }}>
                <LableS>
                    КиноPro
                </LableS>
            </Link>
            <Link
                to={this.state.name=="Вход/Регистрация"?'/login':(this.state.name=="admin"?'/admin':'/user')}
                style={{
                    textDecoration: 'none'
                }}>
                <Profile
                    name={this.state.name}/>
            </Link>
        </Div>
    }
}
export default Header;
