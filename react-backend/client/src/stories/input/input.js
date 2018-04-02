import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const InputS = styled.input`
    padding: 8px;
    margin: 1vw;
    border: 1px solid #cccccc; 
   border-radius: 3px; 
   background: #ffffff !important;
   outline: none;
   width: 15vw ;
   height: 1vw; 
   color: #cccccc;
   font-size: 1.3vw;
   font-family: Tahoma;`;
class Input extends React.Component{
    render(){
        return <InputS className={cn(this.props.className)}
                        name={this.props.name}
                        type={this.props.type}
                        onChange = {this.props.onChange}
                        onBlur={this.props.onBlur}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onKeyDown={this.props.onKeyDown}/>
    }
}
export default Input;
