import React, {Component} from 'react';
import logo from './logo.svg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions';
import styled from 'styled-components';
import Img from 'react-image';
import YouTube from 'react-youtube';
import cn from 'classnames';
import $ from 'jquery';
window.jQuery = window.$ = $;

const Div = styled.div `
    &.main{
        margin-top: 2vw;
    }
    &.flex{
        display: flex;
        margin-bottom: 2vw;
    }
    &.space{
        justify-content:space-around;
        width: 100%;
    }
`;

const P = styled.p `
    padding: 1vw 3vw;
`;
class SessionData extends Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount(){
    //     $.ajax({
    //         type: 'post',
    //         url: '/sessions',
    //         data: JSON.stringify({film: this.props.activeFilm.name}),
    //         dataType: "json",
    //         contentType: "application/json",
    //         success: (data) => {
    //             this.setState({
    //                 sessions: data,
    //             });
    //         }
    //     });
    // }
    render() {
        return (
            <Div className={"main"}>
              hey {this.props.activeSession.time}
            </Div>

        );
    }
}
function mapStateToProps(state) {
    return {activeSession: state.activeSession};
}

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, matchDispatchToProps)(SessionData);
