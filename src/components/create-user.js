import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      dob: new Date(),
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDob(dob) {
    this.setState({
      dob: dob
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      description: this.state.description,
      dob: this.state.dob,
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      description: '',
      dob: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input type="text"
                required
                className="form-control"  
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input type="text"
                required
                className="form-control"  
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group"> 
            <label>DOB: </label>
            <div>
            <DatePicker
              selected={this.state.dob}
              onChange={this.onChangeDob}
            />
          </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}