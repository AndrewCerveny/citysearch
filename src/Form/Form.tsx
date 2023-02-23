import React, { Component } from "react";
import './Form.css'
import {Link} from 'react-router-dom'

type MyProps = {
    handleCallback: Function;  
    homeUrbanArea: boolean;  
    desiredUrbanArea: boolean;
    urbanAreas: any;
}

type MyState = {
    homeCity: string;
    desiredCity: string;
}

class Form extends Component<MyProps, MyState> {

    state: MyState = {
        homeCity: '',
        desiredCity: '',
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        this.setState(prevState => ({
          ...prevState,
          [name]: value,
        }))
    }

    createDatalist = () => {
        const dropDown = this.props.urbanAreas.map((item: { href: string, fullName: string }) => <option key={item.href}>{item.fullName}</option>)
        return dropDown
    }

    handleClick = () => {
        this.props.handleCallback(this.state.homeCity, this.state.desiredCity)        
    }

    render() {
        return (
          <div className="form">
            <form>
                <div className='input-container'>
                    <label>Starting City</label>
                    <input type='search' list='listOne' autoComplete='off' name='homeCity' placeholder='Enter your current city' onChange={(event) => this.handleChange(event)} required/>
                    <datalist id='listOne'>{this.createDatalist()}</datalist>
                </div>
                {!this.props.homeUrbanArea && <h2>Please enter a valid city</h2>}
                <div className='input-container'>
                    <label>Desired City</label>
                    <input type='search' list='listTwo' autoComplete='off' name='desiredCity' placeholder='Enter your desired city' onChange={(event) => this.handleChange(event)} required/>
                    <datalist id='listTwo'>{this.createDatalist()}</datalist>
                </div>
                {!this.props.desiredUrbanArea && <h2>Please enter a valid city</h2>}
                <Link to='/cities' tabIndex={-1}>
                    <button onClick={() => this.handleClick()} className='search'>Search</button>
                </Link>
            </form>
          </div>
        )
    }
}

export default Form

