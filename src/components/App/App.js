import React, { PureComponent } from 'react';
import Layout from '../Layout/Layout';

class App extends PureComponent {
  componentDidMount() {
    const { login } = this.props;

    login();
  }

  componentDidUpdate() {
    const { user, recipes, getRecipes, tags, getTags } = this.props;

    if (user.activeUser.Id && recipes.length === 0) {
      getRecipes();      
    }

    if (user.activeUser.Id && tags.length === 0) {
      getTags();      
    }
  }

  render() {
    const { user, logout, recipes } = this.props;

    return (<Layout user={user.activeUser.Id} logout={logout} isAuthenticating={user.authenticating || recipes.length === 0} />);
  }
}

export default App;
