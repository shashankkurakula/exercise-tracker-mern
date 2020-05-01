import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import * as btnStyle from './style'

const User = (props) => (
    <tr>
        <td>{props.user.username}</td>
        <td>{props.user.description}</td>
        <td>{props.user.dob.substring(0,10)}</td>
        <td>
            <Link to={"/edit-user/"+props.user._id}>edit</Link> | <button style={btnStyle.btnStyle.button} onClick={() => { props.deleteUser(props.user._id) }}>delete</button>
        </td>
    </tr>
)

export default class  UsersList extends Component {

constructor(props){
    super(props);

    this.userList = this.userList.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
        users: [],
    }
}

componentDidMount() {
    axios.get('http://localhost:5000/users')
    .then(res => {
        this.setState({
             users: res.data,
            })
    })
}

userList(){
    return this.state.users.map(currentUser => {
        return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
      })
}

deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
    .then(res => console.log(res.data))
    .catch(err => console.log('error'+err))
    
    this.setState({
        users: this.state.users.filter(user => user._id !== id)
    })
}

render(){
    return (
        <div>
            <h3>Logged Users</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Username</th>
                <th>Description</th>
                <th>DOB</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.userList() }
            </tbody>
            </table>
        </div>
        )
    }
}
