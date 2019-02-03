import React, {Component} from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import NewFilm from "./adminFunctions/newFilm";
import ChangeFilm from "./adminFunctions/changeFilm";
import DeleteFilm from "./adminFunctions/deleteFilm";
import AddCinema from "./adminFunctions/addCinema";
import DeleteCinema from "./adminFunctions/deleteCinema";
import AddSession from "./adminFunctions/addSession";
import DeleteSession from "./adminFunctions/deleteSession";
import ChangeCinema from "./adminFunctions/changeCinema";
import ChangeSession from "./adminFunctions/changeSession";

const P = styled.p `
    &.center{
        text-align: center;
    }
    color: white;
    &.function{
        color: white;
        border: 5px solid #1F2124;
        margin: 0;
        padding: 1vw;
        background-color: #2f3c5e;
        cursor: pointer;
        border-radius: 10px;
        position: relative;
        z-index: 2;
    }
    &.function:hover{
        background-color: #625772;
    }
`;
const Wrapper = styled.div `
    color: white;
    background-color: #1F2124;
    &.visible, &.hidden{
        position: relative;
        z-index: 1;
        transition: all 0.5s ease-in-out;
    }
    &.visible{
        height: 40vh;
    }
    &.hidden{
        height: 0;
        overflow: hidden;
    }
`;
const WrapperBig = styled.div `
color: white;
    background-color: #1F2124;
    &.visible, &.hidden{
        position: relative;
        z-index: 1;
        transition: all 0.5s ease-in-out;
    }
    &.visible{
        height: 55vh;
    }
    &.hidden{
        height: 0;
        overflow: hidden;
    }
`;

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newFilm: "hidden",
            changeFilm: "hidden",
            deleteFilm: "hidden",
            addCinema: "hidden",
            deleteCinema: "hidden",
            addSession: "hidden",
            changeCinema: "hidden",
            deleteSession: "hidden",
            changeSession: "hidden"
        };
        this.show = this
            .show
            .bind(this);
    }
    show(e) {
        if (this.state[
            e
                .target
                .getAttribute('name')
        ] === "hidden") 
            for (let one in this.state) {
                if (one === e.target.getAttribute('name')) {
                    this.state[one] = 'visible';
                } else 
                    this.state[one] = 'hidden';
                }
            else 
                for (let one in this.state) {
                    if (one === e.target.getAttribute('name')) {
                        this.state[one] = 'hidden';
                    }
                }
            this.setState(this.state);
    }
    render() {
        return (
            <div>
                <P className={"center"}>Страница администратора</P>
                <P className={"function"} onClick={this.show} name="newFilm" id={"newFilm"}>Добавить фильм</P>
                <WrapperBig className={this.state.newFilm}>
                    <NewFilm/>
                </WrapperBig>
                <P className={"function"} onClick={this.show} name={"addCinema"}>Добавить кинотеатр</P>
                <Wrapper className={this.state.addCinema}>
                    <AddCinema/>
                </Wrapper>
                <P className={"function"} onClick={this.show} name={"addSession"}>Добавить сеанс</P>
                <WrapperBig className={this.state.addSession}>
                    <AddSession/>
                </WrapperBig>
                <P className={"function"} onClick={this.show} name={"changeFilm"}>Изменить фильм</P>
                <Wrapper className={this.state.changeFilm}>
                    <ChangeFilm/>
                </Wrapper>
                <P className={"function"} onClick={this.show} name={"changeCinema"}>Изменить кинотеатр</P>
                <WrapperBig className={this.state.changeCinema}>
                    <ChangeCinema/>
                </WrapperBig>
                <P className={"function"} onClick={this.show} name={"changeSession"}>Изменить сеанс</P>
                <Wrapper className={this.state.changeSession}>
                    <ChangeSession/>
                </Wrapper>
                <P className={"function"} onClick={this.show} name={"deleteFilm"}>Удалить фильм</P>
                <Wrapper className={this.state.deleteFilm}>
                    <DeleteFilm/>
                </Wrapper>
                <P className={"function"} onClick={this.show} name={"deleteCinema"}>Удалить кинотеатр</P>
                <Wrapper className={this.state.deleteCinema}>
                    <DeleteCinema/>
                </Wrapper>
                <P className={"function"} onClick={this.show} name={"deleteSession"}>Удалить сеанс</P>
                <Wrapper className={this.state.deleteSession}>
                    <DeleteSession/>
                </Wrapper>
            </div>
        );
    }
}

export default AdminPage;