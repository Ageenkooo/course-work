import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import RegularButton from "../button/regularButton";
import Img from 'react-image';

const Div = styled.div `
    &.wrapper{
        float: left;
        margin:1.7vw;
    }
    &.film{
        height: 27vw;
	    width: 15vw;
	    background-color: #2f3c5e;
	    padding-top: 0.5vw ;
	    color: white;
	    font-size: 0.9vw;
        display: flex;
        flex-direction: column;
        justify-content:space-between;

	}
	
    &.poster{
	    height: 75%;
	    width: 100%;
	    border-radius: 5px;
	    background-color: white;
	    background-size: auto 100% ;
	    background-position: 20% 0;
	    transition: all 0.5s ease;
	}	
`;
const P = styled.p `
    padding: 0.5vw 0.5vw 0vw 0.5vw;
    margin: 0;
    text-align: center;
`;

class Film extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Div className={"wrapper"} onClick = {this.props.onClick}>
                <Div className="film">
                    <Img
                        src={this.props.src}
                        height='75%'
                        width='100%'
                        border-radius='10px'/>
                    <P>{this.props.name}</P>
                    <RegularButton value="Подробнее"/>
                </Div>
            </Div>
        )
    }
}

export default Film;
