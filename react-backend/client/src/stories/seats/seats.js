import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Chair from '../chair/chair'

const Div = styled.div `
    width: 47vw;
    background-color: #2f3c5e;
    padding:2vw;
    border-radius: 5px;
`;
const P = styled.p`
    text-align: center;
    background-color: white;
    padding: 5px;   
    border-radius: 10px;
`;
class Seats extends React.Component {
    constructor(props) {
        super(props);
        this.show = this
            .show
            .bind(this);
    }

    show() {
        return this
            .props
            .seats
            .map((seat, i) => {
                console.log(seat)
                return  <Chair available={seat?"available":"unavailable"} onClick={this.props.onClick} name={i}/>
            })
    }
    render() {
        return <Div><P>Экран</P>{this.show()}</Div>
    }
}
export default Seats;
