import React, { Component } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import Input from '../input/input'

const Div = styled.div`
    padding: 5px;
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
class InputComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                    <Div>
                        <p>{this.props.label}</p>
                        <Input name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
                    </Div>
        );
    }
}

export default InputComponent;