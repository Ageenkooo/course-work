import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Ticket from './ticket3.png'


const Input = styled.input`
    margin: 1vw;
    border: 0px solid black;
    padding: 10px;
    background-color:#625772;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    :hover{
        background-color: #2f3c5e ;
    }
    :active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
    }
`;

class RegularButton extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Input type={"submit"}   onClick={this.props.onClick} value={ this.props.value}/>
        )
    }
}

export default RegularButton