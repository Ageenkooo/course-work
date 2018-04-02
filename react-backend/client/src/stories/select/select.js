import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const Div = styled.div`
    margin: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25vw;
`;
const Select = styled.select`
   padding: 8px;
    margin: 1vw;
    border: 1px solid #cccccc; 
   border-radius: 3px; 
   background: #ffffff !important;
   outline: none;
   width: 15vw ;
   height: 2.5vw; 
   color: #cccccc;
   font-size: 1.2vw;
   font-family: Tahoma;
  background-image: url('/images/stories/select-arrow-pink.png');
  background-position: right center;
  background-repeat: no-repeat;
  line-height: 1em;
  /* for FF */
  -moz-appearance: none;
  text-indent: 0.01px; 
  text-overflow: '';
  /* for IE */
  -ms-appearance: none;
  appearance: none!important;
`;
class MySelect extends React.Component {

    render() {
        return (
            <Div>
                <p>{this.props.label}</p>
            <Select name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                {this.props.options.map((opt) =>{return <option value={opt.key?opt.key:opt.val} >{opt.val}</option>})}
            </Select>
            </Div>
         );
     }
 }
export default MySelect;