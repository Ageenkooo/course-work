import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import sofa1 from './sofa.png';
import sofa2 from './sofaChosen.png';
import sofa3 from './sofaUnavailable.png'

const ChairImg = styled.img`
    width : 25px;
	height : 25px;
	margin: 5px;
	background-image: {url('./sofa.png')};
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
                          onClick = {this.onChange}
                          src={this.state.sofa}
        />
    }
}
export default Chair;
