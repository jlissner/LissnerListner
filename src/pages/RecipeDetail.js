import React from 'react';
import ReactDom from 'react-dom';
import EditIcon from '@material-ui/icons/Edit';
import RecipeDetail from '../components/Recipe/RecipeDetailContainer';
import RecipeForm from '../components/Recipe/RecipeForm/RecipeFormContainer';

class RecipeDetailPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.actionRoot = document.getElementById('NavBarAction');
    this.actionRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.actionRoot.removeChild(this.el);
  }

  render() {
    return (
      <React.Fragment>
        {
          ReactDom.createPortal(
            <RecipeForm
              text={<EditIcon />}
              buttonProps={{
                color: 'inherit',
              }}
              isIcon
            />,
            this.el
          )
        }
        <RecipeDetail />
      </React.Fragment>
    )
  }
}

export default RecipeDetailPage;