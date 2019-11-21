import React, { Component } from 'react'
import LoginUser from './LoginUser';
//import RegisterUser from './Accounts/RegisterUser';

class NavComponent extends Component {
    render(){
        let form;
        switch(this.props.displayed_form){
            case 'login' : 
                form = <LoginUser
                        handleLoginChange={this.props.handleLoginChange}
                        handleLogin={this.props.handleLogin}
                        username={this.props.username}/>;
                break;
            default:
                form = null;
            }
        const logged_in_nav = (
            <ul>
                <li onClick = {() => this.props.display_form('login')}>Login</li>
            </ul>
        );
        const logged_out_nav = (
            <ul>
                <li onClick={this.props.handleLogout}>Logout</li>
            </ul>
        );
        return (
            <div>
                {this.props.logged_in? logged_out_nav : logged_in_nav}
                {form}            
            </div>
        );
    }
}
export default NavComponent