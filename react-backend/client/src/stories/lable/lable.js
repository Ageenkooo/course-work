import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const Lable = styled.p`
    font-size: 1.2vw;
    color: white;
    cursor: pointer;
`;

class CinemaList extends React.Component{
    constructor(props) {
        super(props);
    }


    render(){
        return <Lable name={this.props.name} onClick={this.props.onClick} >{this.props.child}</Lable>
    }
}
export default Lable;
