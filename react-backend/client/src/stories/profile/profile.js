import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import user from './oscar.png';

const LableS = styled.p`
    color : white;
	font-size : 1em;
	/* margin-top: 1.5em; */
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
`;

const ImgS = styled.img`
	width : 40px;
	height : 40px;
	margin: 2px;
	margin-top: 5px;
	background-repeat : no-repeat;
	background-size : 100% 100%;
`;

const Div = styled.div`
	height: 10vh;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    /* background-color: #2f3c5e; */
	width : 15vw;
	overflow : hidden;
	display : flex;
	flex-direction : row;
	justify-content : flex-end;
	padding : 0px 5px;
	/* margin: 2%; */
`;
class Profile extends React.Component{
    render(){
        return <Div>
            <LableS onClick = {this.props.onClick}>
                {this.props.name}
            </LableS>
            <ImgS src={user}/>
        </Div>
    }
}
export default Profile;
