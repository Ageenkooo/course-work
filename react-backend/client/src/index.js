import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AdminPage from './adminPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Header from './stories/header/header'

const Div = styled.div`
    &.cont{
        width: 100%;
	    height: 100%;
	    position: absolute;
  	    background-color: #2f3c5e;
  	    overflow: hidden;
    }
    &.calendar{
        width: 20vw;
        padding: 3vh;
	    color: white;
	    background-color: rgba(224,190,191, 1);
	    height: 18vw;
	    position: absolute !important;
	    z-index: 1;
	    border-top-left-radius: 5px;
	    border-bottom-left-radius: 5px;
	    margin-top: 25vh;
	    right: 0px;
	    margin-right: 0;
	   
    }
    &.unactive{
        margin-right: -10vw;
    }
`;
const Main = styled.main`
    &.main{
        margin-top: -1vw;
        border-radius: 5px;
	    height: 83vh;
	    width: 74vw;
	    margin-left: 10vw;
	    margin-right: 10vw;
	    background-color: white;
	    overflow: scroll;
	    overflow-x: hidden;
	    padding: 0 3vw;
    }
    ::-webkit-scrollbar { width: 0; }
`;


ReactDOM.render(
    <Div className={"cont"}>
        <Header name={"My Profile"}/>
        <Main className={"main"}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/admin" component={AdminPage} />
                </Switch>
            </BrowserRouter>
        </Main>
    </Div>
    ,
    document.getElementById("root")
)

registerServiceWorker();

