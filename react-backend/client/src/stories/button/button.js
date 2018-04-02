import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Ticket from './ticket3.png'


const Input = styled.input`
    margin: 0 40%;
    :active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
    }
`;

class Button extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Input type={"image"} src={Ticket}  onClick={this.props.onClick} width={"25%"} height={"40px"} value={ this.props.value}/>
        )
    }
}

export default Button;
