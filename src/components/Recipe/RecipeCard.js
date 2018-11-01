import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = (theme) => ({
  card: {
    transition: 'background .18s ease-in-out',
  },
  cardLink: {
    textDecoration: 'none',
    '&:hover $card': {
      background: theme.palette.grey[200],
    },
  },
  // isFavorite: {
    // color: red[500],
  // },
  pic: {
    height: 0,
    paddingTop: '56.25%',
  },
  goToRecipe: {
    marginLeft: 'auto',
  },
  tags: {
    marginBottom: theme.spacing.unit,
  },
})

const Tags = ({tags, classes}) => tags
  ? (<Grid className={classes.tags} container spacing={8}>
      {tags.map(tag => <Grid item key={tag.label}><Chip className={classes.tag} label={tag.label} /></Grid>)}
    </Grid>)
  : null

class RecipeCard extends React.Component {
  render() {
    const {
      classes,
      // isFavorite,
      recipe,
    } = this.props

    return (
      <Link className={classes.cardLink} to={recipe.recipeUrl}>
        <Card className={classes.card}>
          <CardHeader
            title={recipe.title}
            subheader={recipe.author}
          />
          <CardContent>
            {
              recipe.description
                ? <Typography paragraph>
                    {recipe.description}
                  </Typography>
                : null
            }
            <Tags classes={classes} tags={recipe.tags} />
          </CardContent>
          {/*<CardActions>
            <IconButton
              aria-label="Add To Favorite"
              onClick={() => alert('implement favorite functionality')}
            >
              <FavoriteIcon className={isFavorite ? classes.isFavorite : ''} />
            </IconButton>
          </CardActions>*/}
        </Card>
      </Link>
    )
  }
}

RecipeCard.defaultProps = {
  to: '/'
}

export default withStyles(styles)(RecipeCard)