import React, { Component } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import InputComponent from '../stories/inputComponent/inputComponent'
import RegularButton from '../stories/button/regularButton'
import MySelect from '../stories/select/select'
import $ from 'jquery';
window.jQuery = window.$ = $;

const Flex = styled.div`
    display: flex;
    &.space{
    justify-content: space-between;
    }
    &.center{
        justify-content: center;
    }
`;
class ChangeSession extends Component {
    constructor(props){
        super(props);
        this.state={filmoptions:[],
            cinemaoptions:[],
            dateoptions:[],
            timeoptions: [],
            date:'',
            film:'',
            cinema:'',
            option:'',
            time: '',
            change: ''};
        this.handleChange=this.handleChange.bind(this);
        this.changeFilms=this.changeFilms.bind(this);
        this.changeDate=this.changeDate.bind(this);
        this.changeTime=this.changeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/changesession',
            data: JSON.stringify({
                option: this.state.change,
                film: this.state.film,
                cinema: this.state.cinema,
                date: this.state.date,
                time: this.state.time,
                value: this.state.option}),
            dataType: "json",
            contentType: "application/json",
            success: (data)=>{
                if(data === "ok"){}
            },
        });
    };
    handleChange(event) {
        if(!event.target.key)
            this.state[event.target.name]=event.target.value;
        else
            this.state[event.target.name]=event.target.key;
        this.setState(this);
    }
    changeTime(event){
        this.handleChange(event);
        $.ajax({
            type: 'post',
            url: '/users/getsessionsbydate',
            data: JSON.stringify({cinema: this.state.cinema, film: this.state.film, date: this.state.date}),
            dataType: "json",
            contentType: "application/json",
            success: (data)=>{
                this.setState({timeoptions: data.map((one)=>{return {val: one.time}})});
                this.setState({time: data[0].time});
            },
        });
    }
    changeDate(event){
        this.handleChange(event);
        $.ajax({
            type: 'post',
            url: '/users/getsessionsbyfilm',
            data: JSON.stringify({cinema: this.state.cinema, film: this.state.film}),
            dataType: "json",
            contentType: "application/json",
            success: (data)=>{
                this.setState({dateoptions: data.map((one)=>{return {val: one.date}})});
                this.setState({date: data[0].val});
            },
        });
    }
    changeFilms(event){
        this.handleChange(event);
        $.ajax({
            type: 'post',
            url: '/users/getsessionsbycinema',
            data: JSON.stringify({cinema: this.state.cinema}),
            dataType: "json",
            contentType: "application/json",
            success: (data)=>{
                console.log(data)
                this.setState({filmoptions: data.map((one)=>{return {val: one}})});
                this.setState({film: data[0].val});
            },
        });
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    componentDidMount() {
        fetch('/users/getallcinemas')
            .then((res) => {
                res.json().then((result) => {
                    this.setState({cinemaoptions: result});
                    this.setState({cinema: result[0].val})
                })
            })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Flex className={"space"}>
                    <MySelect label={"Название кинотеатра"}
                              name={"cinema"}
                              options={this.state.cinemaoptions}
                              onChange={this.changeFilms}/>
                    <MySelect label={"Название фильма"}
                              name={"film"}
                              options={this.state.filmoptions}
                              onChange={this.changeDate}/>
                    <MySelect label={"День"} name={"date"}
                              options={this.state.dateoptions}
                              onChange={this.changeTime}/>
                </Flex>
                <Flex className={"space"}>
                    <MySelect label={"Время"} name={"time"}
                              options={this.state.timeoptions}
                              onChange={this.handleChange}/>
                    <MySelect label={"Название изменения"}
                              name={"change"}
                              options={[{val: "Фильм", key: "film"},{val: "Дата", key : "date"},{val: "Время", key: "time"},{val: "Цена", key: "price"}]}
                              onChange={this.handleChange}/>
                    <InputComponent label={"Опция"}
                                    value={this.state.option}
                                    name={"option"}
                                    onChange={this.onChange}/>
                </Flex>
                <br/>
                <RegularButton value={"Изменить сеанс"}/>
            </form>
        );
    }
}

export default ChangeSession;