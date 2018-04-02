import React, { Component } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import RegularButton from '../stories/button/regularButton'
import MySelect from '../stories/select/select'
import $ from 'jquery';
window.jQuery = window.$ = $;
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    let $ = require("jquery")(window);
});

const Flex = styled.div`
    display: flex;
    &.space{
    justify-content: space-between;
    }
    &.center{
        justify-content: center;
    }
`;
class DeleteFilm extends Component {
    constructor(props){
        super(props);
        this.state={options:[],
                    films:''};
        this.handleChange=this.handleChange.bind(this);
    }
    onSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/deletefilm',
            data: JSON.stringify({name: this.state.films}),
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
        fetch('/users/getallfilms')
            .then((res) => {
                res.json().then((result) => {
                    this.setState({options: result})
                })
            })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Flex className={"space"}>
                    <MySelect label={"Название фильма"}
                              name={"films"}
                              options={this.state.options}
                              onChange={this.handleChange}/>
                </Flex>
                <br/>
                <RegularButton value={"Удалить фильм"}/>
            </form>
        );
    }
}

export default DeleteFilm;