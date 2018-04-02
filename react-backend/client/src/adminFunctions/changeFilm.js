import React, { Component } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import InputComponent from '../stories/inputComponent/inputComponent'
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
class ChangeFilm extends Component {
    constructor(props){
        super(props);
        this.state={options:[],
                    films:'',
                    cells:'name',
                    option: ''};
        this.handleChange=this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    handleChange(event) {
        if(!event.target.key)
            this.state[event.target.name]=event.target.value;
        else
            this.state[event.target.name]=event.target.key;
        this.setState(this);
    }
    onSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/changefilm',
            data: JSON.stringify({name: this.state.films,
                                option: this.state.cells,
                                value: this.state.option}),
            dataType: "json",
            contentType: "application/json",
            success: (data)=>{
                if(data === "ok"){}
            },
        });
    };
    componentDidMount() {
        fetch('/users/getallfilms')
            .then((res) => {
                res.json().then((result) => {
                    this.setState({options: result});
                    this.setState({films: result[0].val})
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
                    <MySelect label={"Название изменения"}
                              name={"cells"}
                              options={[{val: "Название", key: "name"},{val: "Режиссер", key: "producer"},{val: "Страна", key: "country"},{val:"Описание", key: "description"}]}
                              onChange={this.handleChange}/>
                    <InputComponent label={"Опция"}
                                    value={this.state.option}
                                    name={"option"}
                                    onChange={this.onChange}/>
                </Flex>
                <br/>
                <RegularButton value={"Изменить фильм"}/>
            </form>
        );
    }
}

export default ChangeFilm;