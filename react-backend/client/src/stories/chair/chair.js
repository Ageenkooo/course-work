import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import sofa1 from './sofa.png';
import sofa2 from './sofaChosen.png';
import sofa3 from './sofaUnavailable.png'

const ChairImg = styled.img`
/* float: left; */
    width : 50px;
	height : 50px;
	margin: 0.5vw;
    cursor: pointer;
	background-image: url('./sofa.png');
	background-repeat : no-repeat;
	background-size : 100% 100%;
`;

class Chair extends React.Component{
    constructor(props) {
        super(props);
        if(this.props.available === "unavailable")
            this.state = {
                sofa: sofa3,
            };
        else
            this.state = {
                sofa: sofa1,
            };
        this.onChange = this.onChange.bind(this);
    }
    onChange(){
        if(this.state.sofa === sofa1)
                this.setState({ sofa: sofa2});
        if(this.state.sofa === sofa2 )
                this.setState({sofa: sofa1});
        }
        


    render(){
        return <ChairImg  available = {this.props.available}
                          onClick = {()=>{this.onChange(); this.props.onClick(this.props.name);}}
                          src={this.state.sofa}
                          name={this.props.name}
        />
    }
}
export default Chair;
