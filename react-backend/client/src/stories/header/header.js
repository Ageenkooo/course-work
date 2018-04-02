import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Profile from '../profile/profile'

const Div = styled.div`
    display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: white;
	padding-left: 10vw;
	padding-right: 10vw;
	font-size: 1.5vw;
	background-color: #2f3c5e;
`;

const LableS = styled.p`
    color : white;
	font-size : 1em;
	margin-top: 1.5em;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
	padding: 2%;
`;
class Header extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        return <Div>
            <LableS>
                КиноPro
            </LableS>
            <Profile name={this.props.name}/>
        </Div>
    }
}
export default Header;
