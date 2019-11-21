// Important note: this could have been achieved automatically using something 
// like https://www.npmjs.com/package/react-crud-table
// But for the sake of demo purposes, writing everything from scratch 
// It's not optimal in many ways, but works for demo purposes :)

import React, { Component } from 'react';
import NavComponent from './NavComponent';
import Table from './Table';

import Axios from 'axios';

const base_url = "api/"
class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
             logged_in : localStorage.getItem('token') ? true : false,
             username : '',
             displayed_form : '',
             addresses : [],
             loaded : false,
             crud_form : 'post',
             new_url: '',
             crud_id : 0,
        }
    }

    componentDidMount(){
        if(this.state.logged_in){
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Token ${localStorage.getItem('token')}`
            }
            Axios.get(base_url+'addresses/', {headers: headers})
            .then(response => {
                this.setState({ 
                    addresses : response.data,
                    loaded : true, 
                    crud_form : 'post', 
                })
            })
            .catch(err => console.log(err));
        }
    }

    display_form = (formName) => {
        this.setState({
            displayed_form : formName
        });
    }

    handleLoginChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({logged_in : false, username : ''})
    }
    
    handleEdit = (address_id) => {
        console.log(address_id)
        this.setState({ crud_form : 'put', crud_id : address_id })
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
        Axios.get(base_url+'addresses/'+address_id+'/', {headers: headers})
        .then(response => {
            this.setState({ new_url : response.data.original_url })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    handleDelete = (address_id) => {
        console.log(address_id)
        this.setState({ crud_form : 'del', crud_id : address_id })
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
        Axios.get(base_url+'addresses/'+address_id+'/', {headers: headers})
        .then(response => {
            this.setState({ new_url : response.data.original_url })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleLogin = (e, data) => {
        e.preventDefault();
        console.log(data)
        
        let headers = {
          'Content-Type': 'application/json',
        }
        
        Axios.post(base_url+'login/', data, {headers: headers})
        .then(response => {
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token);
            //For debug purposes
            //localStorage.setItem('token', 'ccbe093d0501aade681b3a92ede6120da080706c');
            this.setState({
                logged_in : true,
                username : data.username,
                //displayed_form : 'post',
                //loaded : true,
            })
            
            headers['Authorization'] = `Token ${localStorage.getItem('token')}`
            
            Axios.get(base_url+'addresses/', {headers: headers})
            .then(response => {
                this.setState({ 
                    addresses : response.data,
                    loaded : true,
                })
            })
            .catch(error => {
                console.log(error)
            })
            
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({
            displayed_form : '',
        })
        
          
    }    
    
    
    addressPost = e => {
        e.preventDefault();
        const {new_url} = this.state
        const data = {
            'original_url': new_url
        }
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
        
        Axios.post(base_url+'addresses/', data, {headers: headers})
        .then(response => {
            this.setState({ new_url : '' })
            Axios.get(base_url+'addresses/', {headers: headers})
            .then(response => {
                this.setState({ addresses : response.data })
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
        
        
        
    }
    
    
    addressPut = e => {
        e.preventDefault();
        const {new_url, crud_id} = this.state
        const data = {
            'original_url': new_url
        }
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
        
        Axios.put(base_url+'addresses/'+crud_id+'/', data, {headers: headers})
        .then(response => {
            this.setState({ new_url : '' })
            Axios.get(base_url+'addresses/', {headers: headers})
            .then(response => {
                this.setState({ addresses : response.data })
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
        
    }
    
    addressDel = e => {
        e.preventDefault();
        const {crud_id} = this.state
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
        
        Axios.delete(base_url+'addresses/'+crud_id+'/', {headers: headers})
        .then(response => {
            this.setState({ new_url : '' })
            Axios.get(base_url+'addresses/', {headers: headers})
            .then(response => {
                this.setState({ addresses : response.data })
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
        
    }
    
    
    changeHandler = (event) => {
        event.preventDefault()
            var stateObject = function() {
              var returnObj = {};
              returnObj['display_' + event.target.name] = true;
                 return returnObj;
            }();
        
            this.setState( stateObject );    
            this.setState({
                [event.target.name] : event.target.value,
            })
        }
    
    renderCrudForm(crud_form) {
        var style = {
          width: '100%',
        };
        var colStyle = {
          width: '80%',
        };
        switch(crud_form){
            case 'put': 
                return (              
                    <form onSubmit={this.addressPut} noValidate>
                    <table className="table is-striped" style={style}>
                        <tfoot>
                            <tr>
                                <th>Edit URL:</th>
                                <th style={colStyle}><input type="text" id="new_url" name="new_url" value={this.state.new_url} onChange={this.changeHandler} style={style}/></th>
                                <th> <button type='submit'>Save</button> </th>
                            </tr>
                        </tfoot>
                    </table>
                    </form>
                );
            case 'del': 
                return (
                    <form onSubmit={this.addressDel} noValidate>
                    <table className="table is-striped" style={style}>
                        <tfoot>
                            <tr>
                                <th>Delete URL?</th>
                                <th style={colStyle}><input type="text" id="new_url" name="new_url" value={this.state.new_url} style={style}/></th>
                                <th> <button type='submit'>Delete</button> </th>
                            </tr>
                        </tfoot>
                    </table>
                    </form>
                );
            case 'post': 
                return (
                    <form onSubmit={this.addressPost} noValidate>
                    <table className="table is-striped" style={style}>
                        <tfoot>
                            <tr>
                                <th>New URL*:</th>
                                <th style={colStyle}><input type="text" id="new_url" name="new_url" value={this.state.new_url} onChange={this.changeHandler} style={style}/></th>
                                <th> <button type='submit'>Submit</button> </th>
                            </tr>
                        </tfoot>
                    </table> 
                    </form>
                );
            default:
                return null;
        }
    }
    
    render() {
        const { logged_in, username, displayed_form, crud_form } = this.state;
        let crud_form_render;

        return (
            <div>
                <NavComponent
                logged_in = {logged_in}
                handleLogin = {this.handleLogin}
                handleLoginChange = {this.handleLoginChange}
                handleLogout = {this.handleLogout}
                username = {username}
                displayed_form = {displayed_form}
                display_form = {this.display_form}
                crud_form = {this.crud_form}
                 />
                <h3>{
                    this.state.logged_in
                    ? `Hello ${this.state.username}`
                    : 'Please log in'
                }</h3>
                {
                    this.state.logged_in //&& this.state.loaded
                    ? <Table data = {this.state.addresses} handleEdit = {this.handleEdit} handleDelete = {this.handleDelete}/>
                    : ''
                }
                {
                    this.state.logged_in 
                    ? this.renderCrudForm(crud_form)
                    : ''
                }
            </div>
        )
    }
}

export default Main;
