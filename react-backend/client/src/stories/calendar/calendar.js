import React, {Component} from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

const Div = styled.div `
    &.show{
        cursor: pointer;
        padding-right: 1vw;
    }
    &.calendar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 30vw;
        padding: 3vh 2vw;
	    color: white;
	    background-color: #2f3c5e;
	    height: 20vw;
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
        margin-right: -30vw;
    }
`;
const P = styled.p`
    transform: rotate(-90deg);
    width: 70px;
    height:100px;
    font-size: 1.3vw;
`;


class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.change = this
            .change
            .bind(this);
        this.state = {
            date: new Date(),
            class: "calendar unactive"
        }
    }
    onChange = date => this.setState({date: date});

    change() {
        if (this.state.class === "calendar unactive") 
            this.state.class = "calendar";
        else 
            this.state.class = "calendar unactive";
        this.setState(this.state);
    }
    render() {
        return (
            <Div className={this.state.class} onClick={this.props.onClick}>
                <Div className={"show"} onClick={this.change}>
                    <P>Календарь</P>
                </Div>
                <Calendar
                    tileDisabled={(tile) => {
                        if (tile.date.toString().slice(8, 10) <= 8) {
                            return false
                        } else 
                            return true
                    }}
                    onChange={this.onChange}
                    onClick={this.props.onClick}
                    value={this.state.date}/>
            </Div>
        );
    }
}

export default MyCalendar;