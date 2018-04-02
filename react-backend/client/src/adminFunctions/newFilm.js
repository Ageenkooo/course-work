import React, { Component } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import InputComponent from '../stories/inputComponent/inputComponent'
import RegularButton from '../stories/button/regularButton';
import PropTypes from "prop-types";
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
    transition: all 0.5s ease-in-out;
    &.space{
    justify-content: space-between;
    }
    &.center{
        justify-content: center;
    }
`;
class NewFilm extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            producer:'',
            country:'',
            description:'',
            poster:'',
            trailer:'',
            date:'',
            actors:'',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange = (e) => {
        console.log(e.target)
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    onSubmit = (e) => {
        e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/users/addfilm',
                data: JSON.stringify({name: this.state.name,
                                        producer: this.state.producer,
                                        country: this.state.country,
                                        description: this.state.description,
                                        poster: this.state.poster,
                                        trailer: this.state.trailer,
                                        date: this.state.date,
                                        actors: this.state.actors}),
                dataType: "json",
                contentType: "application/json",
                success: (data)=>{
                    if(data === "ok"){}
                },

            });
        };

    render() {
        return (
                <form onSubmit={this.onSubmit}>
                    <Flex className={"space"}>
                        <InputComponent label={"Название фильма"} value={this.state.name} name={"name"} onChange={this.onChange}/>
                        <InputComponent label={"Режиссер"} value={this.state.producer} name={"producer"} onChange={this.onChange}/>
                        <InputComponent label={"Страна"} value={this.state.country} name={"country"} onChange={this.onChange}/>

                    </Flex>
                    <Flex className={"space"}>
                        <InputComponent label={"Описание"} value={this.state.description} name={"description"} onChange={this.onChange}/>
                        <InputComponent label={"Ссылка на постер"} value={this.state.poster} name={"poster"} onChange={this.onChange}/>
                        <InputComponent label={"Ссылка на трейлер"} value={this.state.trailer} name={"trailer"} onChange={this.onChange}/>

                    </Flex>
                    <Flex className={"space"}>
                        <InputComponent label={"Дата выхода"} value={this.state.date} name={"date"} onChange={this.onChange}/>
                        <InputComponent label={"Актеры"} value={this.state.actors} name={"actors"} onChange={this.onChange}/>
                    </Flex>
                    <br/>
                    <RegularButton value={"Добавить фильм"} />
                </form>
        );
    }
}

export default NewFilm;