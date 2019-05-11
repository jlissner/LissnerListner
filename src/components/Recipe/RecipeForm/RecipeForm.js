import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import _find from 'lodash/find';
import _get from 'lodash/get';
import LoaderButton from '../../LoaderButton/LoaderButton';
import SectionListsForm from '../../SectionListsForm/SectionListsFormContainer';
import RecipeTagsForm from '../RecipeTagsForm/RecipeTagsFormContainer';
import * as tags from  '../../../data/recipeTagOptions';

const styles = (theme) => ({
  form: {
    paddingTop: theme.spacing.unit,
  },
  divider: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
});

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { recipeForm, resetForm } = this.props;
    if(prevProps.recipeForm.saving && !recipeForm.saving) {
      this.setState({
        open: false,
      });

      if (!prevProps.recipeForm.Id) {
        resetForm();
      }
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleFieldChange = (evt) => {
    this.props.setValue({
      key: evt.target.name,
      value: evt.target.value,
    })
  }

  render() {
    const { open } = this.state;
    const {
      classes,
      recipes,
      recipeForm,
      saveForm,
      text,
      Component,
      ...props
    } = this.props;
    const {
      Id,
      title,
      author,
      description,
      note,
      saving,
      serves,
      cookTime,
      ingredients,
      directions,
    } = recipeForm;
    const currentRecipe = _find(recipes, { Id });
    const hasError = Boolean(
      (_find(recipes, { title }) && _get(currentRecipe, 'title') !== title)
    );
    const disabled = Boolean(
      hasError
      || !title // recipe must have a title
      || !_find(recipeForm.tags, { category: 'Section' }) // recipe must have a Section tag
    );

    return (
      <React.Fragment>
        <Component onClick={this.handleOpen} {...props}>{text}</Component>
        <Dialog onClose={this.handleClose} open={open} maxWidth="lg">
          <DialogTitle>{Id ? 'Edit' : 'New'} Recipe</DialogTitle>
          <DialogContent className={classes.form}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={hasError}
                  variant="outlined"
                  name="title"
                  label="Title"
                  value={title}
                  onChange={this.handleFieldChange}
                  required
                  fullWidth
                  placeholder="Deep Fried Chicken"
                  helperText={hasError ? 'Title Must Be Unique' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  name="author"
                  label="Author"
                  value={author}
                  onChange={this.handleFieldChange}
                  required
                  fullWidth
                  placeholder="Connie"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  name="serves"
                  label="Serves"
                  value={serves}
                  onChange={this.handleFieldChange}
                  fullWidth
                  placeholder="6-8"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  name="cookTime"
                  label="Time"
                  value={cookTime}
                  onChange={this.handleFieldChange}
                  fullWidth
                  placeholder="45min"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  name="description"
                  label="Description"
                  value={description}
                  onChange={this.handleFieldChange}
                  placeholder="A simple recipe for delicious fried chicken"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  name="note"
                  label="Note"
                  value={note}
                  onChange={this.handleFieldChange}
                  placeholder="Make multiple batches to feed a party"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}><Divider className={classes.divider} /></Grid>
              <Grid item xs={12} sm={6}>
                <SectionListsForm
                  category="ingredients"
                  data={ingredients}
                  newSubItemTitle="New Ingredient"
                  title="Ingredients"
                  titlePlaceholder="Ingredient Section Title"
                  subSection='ingredients'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SectionListsForm
                  category="directions"
                  data={directions}
                  newSubItemTitle="New Direction"
                  title="Directions"
                  titlePlaceholder="Direction Section Title"
                  subSection='steps'
                />
              </Grid>
              <Grid item xs={12}><Divider className={classes.divider} /></Grid>
              <Grid item xs={4}>
                <RecipeTagsForm
                  title="Difficulty"
                  options={tags.difficulty}
                  radio
                />
                <RecipeTagsForm
                  title="Dietary Preference"
                  options={tags.diet}
                />
                <RecipeTagsForm
                  title="Cooking Style"
                  options={tags.style}
                />
              </Grid>
              <Grid item xs={4}>
                <RecipeTagsForm
                  title="Section"
                  options={tags.section}
                  radio
                />
              </Grid>
              <Grid item xs={4}>
                <RecipeTagsForm
                  title="Ethnicity"
                  options={tags.ethnicity}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Close</Button>
            <LoaderButton
              variant="contained"
              color="primary"
              onClick={saveForm}
              disabled={disabled}
              text="Save"
              loadingText="Saving..."
              isLoading={saving}
            />
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
};

RecipeForm.defaultProps = {
  text: 'Add New Recipe',
  Component: Fab,
}

export default withStyles(styles)(RecipeForm);
