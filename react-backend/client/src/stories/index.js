import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Input from './input/input';
import Film from './film/film';
import Profile from './profile/profile';
import Chair from './chair/chair';
import Header from './header/header';
import Button from './button/button';
import RegularButton from './button/regularButton';
import CinemaList from './cinema/cinema';
import InputComponent from "./inputComponent/inputComponent";
import MySelect from "./select/select";


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
    .add('with text', () => <Button onClick={action('clicked')} value={"buy"}/>)
    .add('with 1text', () => <RegularButton onClick={action('clicked')} value={"delete smth"} />);

storiesOf('Input', module)
    .add('default', () => <Input  /> );
storiesOf('Film', module)
    .add('default', () => <Film  name={"Film name"} from={"22.01.2018"}/> );
storiesOf('Profile', module)
    .add('default', () => <Profile onClick={action('clicked')} name={"My profile"}/> );
storiesOf('Chair', module)
    .add('available', () => <Chair available ="available" /> )
    .add('unavailable', () => <Chair available ="unavailable"  /> );
storiesOf('Header', module)
    .add('available', () => <Header name={"My profile"} /> );
storiesOf('CinemaList', module)
    .add('available', () => <CinemaList >кинотеатры</CinemaList> );
storiesOf('InputComponent', module)
    .add('available', () => <InputComponent name={"inpjlljjklut"} /> );
storiesOf('Select', module)
    .add('available', () => <MySelect options={[{val: "first"},{val: "second"}]} name={"select"} /> );