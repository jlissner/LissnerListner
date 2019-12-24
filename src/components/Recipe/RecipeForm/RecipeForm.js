import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Fab,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
}  from '@material-ui/core';
import _find from 'lodash/find';
import _get from 'lodash/get';
import LoaderButton from '../../LoaderButton/LoaderButton';
import SectionListsForm from '../../SectionListsForm/SectionListsFormContainer';
import RecipeTagsForm from '../RecipeTagsForm/RecipeTagsFormContainer';
import * as tags from  '../../../data/recipeTagOptions';

const styles = (theme) => ({
  form: {
    paddingTop: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
});

function RecipeForm ({ classes, recipes, recipeForm, closeForm, saveForm, setValue }) {
  const {
    idPk,
    author,
    cookTime,
    description,
    directions,
    ingredients,
    open,
    note,
    serves,
    saving,
    name,
    tags: recipeTags,
  } = recipeForm;
  const currentRecipe = _find(recipes, { idPk });
  const hasError = Boolean((_find(recipes, { name }) && _get(currentRecipe, 'name') !== name));
  const disabled = Boolean(
    hasError
    || !name // recipe must have a title
    || !_find(recipeTags, { category: 'Section' }) // recipe must have a Section tag
  );
  const handleFieldChange = (evt) => {
    setValue({
      key: evt.target.name,
      value: evt.target.value,
    })
  }

  useEffect(() => {
    if (!saving) {
      closeForm();
    }
  }, [ saving, closeForm ]);

  return (
    <Dialog onClose={closeForm} open={open} maxWidth="lg">
      <DialogTitle>{idPk ? 'Edit' : 'New'} Recipe</DialogTitle>
      <DialogContent className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={hasError}
              variant="outlined"
              name="name"
              label="Name"
              value={name}
              onChange={handleFieldChange}
              required
              fullWidth
              placeholder="Deep Fried Chicken"
              helperText={hasError ? 'Name Must Be Unique' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="author"
              label="Author"
              value={author}
              onChange={handleFieldChange}
              required
              fullWidth
              placeholder="Connie"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="serves"
              label="Portion Size"
              value={serves}
              onChange={handleFieldChange}
              fullWidth
              placeholder="Makes 64 cookies"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              name="cookTime"
              label="Time"
              value={cookTime}
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
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
        <Button onClick={closeForm}>Close</Button>
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
  )
};

RecipeForm.defaultProps = {
  text: 'Add New Recipe',
  Component: Fab,
}

export default withStyles(styles)(RecipeForm);
