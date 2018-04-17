import React, {Component} from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import InputComponent from '../stories/inputComponent/inputComponent'
import RegularButton from '../stories/button/regularButton'
import MySelect from '../stories/select/select'
import $ from 'jquery';
window.jQuery = window.$ = $;

const Flex = styled.div `
    display: flex;
    &.space{
    justify-content: space-between;
    }
    &.left{
    justify-content: flex-start;
    }
    &.center{
        justify-content: center;
    }
`;
class AddSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cinemaoptions: [],
            filmoptions: [],
            cinema: '',
            film: '',
            date: '',
            time: '',
            price: ''
        };
        this.handleChange = this
            .handleChange
            .bind(this);
    }
    handleChange(event) {
        if (!event.target.key) 
            this.state[event.target.name] = event.target.value;
        else 
            this.state[event.target.name] = event.target.key;
        this.setState(this);

    }
    onSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/addsession',
            data: JSON.stringify(
                {cinema: this.state.cinema, film: this.state.film, date: this.state.date, time: this.state.time, price: this.state.price}
            ),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {
                if (data === "ok") {}
            }
        });
    };
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    componentDidMount() {
        fetch('/users/getallcinemas').then((res) => {
            res
                .json()
                .then((result) => {
                    this.setState({cinemaoptions: result});
                    // this.setState({cinema: result[0].val})
                })
        })
        fetch('/users/getallfilms').then((res) => {
            res
                .json()
                .then((result) => {
                    this.setState({filmoptions: result});
                    // this.setState({film: result[0].val})
                })
        })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Flex className={"left"}>
                    <MySelect
                        label={"Название кинотеатра"}
                        name={"cinema"}
                        options={this.state.cinemaoptions}
                        onChange={this.handleChange}/>
                    <MySelect
                        label={"Название Фильма"}
                        name={"film"}
                        options={this.state.filmoptions}
                        onChange={this.handleChange}/>
                </Flex>
                <Flex className={"space"}>
                    <InputComponent
                        label={"Дата"}
                        value={this.state.date}
                        name={"date"}
                        onChange={this.onChange}/>
                    <InputComponent
                        label={"Время"}
                        value={this.state.time}
                        name={"time"}
                        onChange={this.onChange}/>
                    <InputComponent
                        label={"Цена"}
                        value={this.state.price}
                        name={"price"}
                        onChange={this.onChange}/>
                </Flex>
                <br/>
                <RegularButton value={"Добавить сеанс"}/>
            </form>
        );
    }
}

export default AddSession;