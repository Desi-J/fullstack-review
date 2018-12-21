import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import List from './components/List';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from './components/ducks/reducer';
class App extends Component {
  constructor(){
    super();

  this.state = {
    user: null
  }

}
//WHEN THE SERVER LOADS IT AUTOMATICALLY FETCHES THIS DATA
componentDidMount() {
  axios.get('/auth/user-data').then(response => {
    this.setState({ user: response.data.user})
    this.props.setUser(response.data.user)
  }).catch(error => {
    console.log('componentDIDmount error did not get stuff:', error)
  })
}

login() {
  const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
  window.location=`https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  //Dont have to bind cuz not using keyword this
}
  

  render() {
    console.log('userdata:',this.props.user)
    const {user} = this.props
    return (
      <div>
        <div className="button">
      
        {user ? user.name : ""}
        <button onClick={this.login}> Log in</button>
        </div>

        <Route path="/" component={List}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {setUser}) (App);
