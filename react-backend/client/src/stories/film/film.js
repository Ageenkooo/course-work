import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import Button from "../button/button";

const Div = styled.div`
    &.wrapper{
        float: left;
        margin:1.7vw;
    }
    &.film{
        height: 25vw;
	    width: 14vw;
	    background-color: #2f3c5e;
	    padding: 0.5vw ;
	    color: white;
	    font-size: 1vw;
	}
	
	&.poster{
	    height: 78%;
	    width: 100%;
	    border-radius: 5px;
	    background-color: white;
	    background-size: auto 100% ;
	    background-position: 20% 0;
	    transition: all 0.5s ease;
	}
	
	&.film P:nth-child(3){
	    // float: right;
	} 
	
`;
const P = styled.p`
    padding: 0.5vw 0.5vw 0vw 0.5vw;
    margin: 0;
`;

class Film extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Div className={"wrapper"}>
                <Div className="film" >
                    <Div className="poster"  >

                    </Div>

                    <P>{this.props.name}</P>
                    {/*<P> {this.props.from}</P>*/}
                    <Button/>
                </Div>
                {/*<Div className="wave">*/}
                    {/*<Div className="subwave">*/}

                    {/*</Div>*/}
                {/*</Div>*/}
            </Div>
        )
              }
          }

export default Film;
