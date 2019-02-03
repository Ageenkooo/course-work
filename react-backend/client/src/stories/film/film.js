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
        border: 0.5px solid white;
        height: 23vw;
	    width: 15vw;
        background-size: 100% 100%;
	    padding-top: 0.5vw ;
	    color: white;
	    font-size: 0.9vw;
        display: flex;
        flex-direction: column;
        justify-content:flex-end;
        overflow: hidden;
        box-shadow: 10px 11px 25px -4px rgba(0,0,0,0.75);
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
    padding: 1vw 0.5vw;
    background-color: #2f3c5e;
    border-left: 0.5px solid white;
    border-right: 0.5px solid white;
    text-align: center;
`;

class Film extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Div className={"wrapper"} onClick = {this.props.onClick} >
                <Div className="film" style={{backgroundImage:'url(' + this.props.src + ')'}}>
                    <P>{this.props.name}</P>
                    {/* <RegularButton value="Подробнее"/> */}
                </Div>
            </Div>
        )
    }
}

export default Film;
