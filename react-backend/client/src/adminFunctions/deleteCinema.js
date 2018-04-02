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

class DeleteCinema extends Component {
    constructor(props){
        super(props);
        this.state={options:[],
            cinemas:''};
        this.handleChange=this.handleChange.bind(this);
    }
    onSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/deletecinema',
            data: JSON.stringify({name: this.state.cinemas}),
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
    componentDidMount() {
        fetch('/users/getallcinemas')
            .then((res) => {
                res.json().then((result) => {
                    this.setState({options: result})
                })
            })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <MySelect label={"Название кинотеатра"}
                          name={"cinemas"}
                          options={this.state.options}
                          onChange={this.handleChange}/>
                <br/>
                <RegularButton value={"удалить кинотеатр"}/>
            </form>
        );
    }
}

export default DeleteCinema;