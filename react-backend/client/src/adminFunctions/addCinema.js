import React, {Component} from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import InputComponent from '../stories/inputComponent/inputComponent'
import RegularButton from '../stories/button/regularButton'
import $ from 'jquery';
window.jQuery = window.$ = $;

const Flex = styled.div `
    display: flex;
    &.space{
    justify-content: space-between;
    }
    &.center{
        justify-content: center;
    }
`;
class AddCinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: ''
        };
        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    onSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/addcinema',
            data: JSON.stringify({name: this.state.name, address: this.state.address}),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {
                if (data === "ok") {}
            }
        });
    };
    render() { 
        return (
            <form onSubmit={this.onSubmit}>
                <Flex>
                    <InputComponent
                        label={"Название"}
                        value={this.state.name}
                        name={"name"}
                        onChange={this.onChange}/>
                    <InputComponent
                        label={"Адрес"}
                        value={this.state.address}
                        name={"address"}
                        onChange={this.onChange}/>
                </Flex>
                <br/>
                <RegularButton value={"Добавить кинотеатр"}/>
            </form>
        );
    }
}

export default AddCinema;