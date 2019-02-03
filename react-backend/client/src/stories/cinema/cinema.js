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
        width: 10vw;
        padding: 2vw 2.1vw;
	    color: white;
	    background-color: #2f3c5e;
	    position: absolute !important;
	    z-index: 1;
	    border-top-right-radius: 5px;
	    border-bottom-right-radius: 5px;
	    transition: left 0.3s ease-out 0.3s;
	}
	&.unactive{
        left: -10vw;
    }
`;
const P = styled.p`
    transform: rotate(90deg);
    font-size: 1.3vw;
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
                    <Div className={"show"} onClick={this.change}><P>Кинотеатры</P></Div>
                </Div>
    }
}
export default CinemaList;
