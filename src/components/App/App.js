import React, { Component } from 'react';
import { authUser } from '../../lib/awsLib';
import Layout from '../Layout/Layout';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true
    }
  }

  async componentDidMount() {
    try {
      const user = await authUser()

      if (user) {
        this.props.login(user.username)
      }
    } catch(err) {
      console.error(err)
    } finally {
      this.setState({ isAuthenticating: false })
    }
  }

  render() {
    const { user, logout } = this.props;
    const { isAuthenticating } = this.state;

    return (<Layout user={user.username} logout={logout} isAuthenticating={isAuthenticating} />);
  }
}

export default App;
