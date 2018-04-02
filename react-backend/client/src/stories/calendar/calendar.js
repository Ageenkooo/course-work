import React, { Component } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

const Div = styled.div`
    &.show{
        cursor: pointer;
        padding-right: 1vw;
    }
    &.calendar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 22vw;
        padding: 3vh 1vw;
	    color: white;
	    background-color: rgba(224,190,191, 1);
	    height: 18vw;
	    position: absolute !important;
	    z-index: 1;
	    border-top-left-radius: 5px;
	    border-bottom-left-radius: 5px;
	    margin-top: 15vh;
	    right: 0px;
	    margin-right: 0;
	    transition: margin-right 0.3s ease-out 0.3s;
    }
    &.unactive{
        margin-right: -10vw;
    }
`;

class MyCalendar extends Component {
    constructor(props){
        super(props);
        this.change = this.change.bind(this);
        this.state = {date: new Date(),
                      class: "calendar unactive"}
    }
    onChange = date => this.setState({ date: date });

    change(){
        if(this.state.class === "calendar unactive")
            this.state.class = "calendar";
        else this.state.class = "calendar unactive";
        this.setState(this.state);
    }
    render() {
        return (
            <Div  className={this.state.class} >
                <Div className={"show"} onClick={this.change}> O </Div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </Div>
        );
    }
}

export default MyCalendar;