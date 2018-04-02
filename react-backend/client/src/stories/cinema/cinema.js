import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const Div = styled.div`
    &.show{
        cursor: pointer;
        padding-left: 1vw;
    }
    &.cinema{
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 15vw;
        padding: 2vw 2vw;
	    color: white;
	    background-color: rgba(224,190,191, 1);
	    position: absolute !important;
	    z-index: 1;
	    border-top-right-radius: 5px;
	    border-bottom-right-radius: 5px;
	    transition: left 0.3s ease-out 0.3s;
	}
	&.unactive{
        left: -5vw;
    }
`;

class CinemaList extends React.Component{
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
        this.state = {class: "cinema unactive"}
    }
    change(){
        if(this.state.class === "cinema unactive")
            this.state.class = "cinema";
        else this.state.class = "cinema unactive";
        this.setState(this.state);
    }

    render(){
        return <Div className={this.state.class}>
                    <Div>
                        {this.props.children}
                    </Div>
                    <Div className={"show"} onClick={this.change}>O</Div>
                </Div>
    }
}
export default CinemaList;
