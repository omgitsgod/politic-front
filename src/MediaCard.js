import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  card: {
    maxWidth: 345,
     marginTop: theme.spacing.unit * 8
  },
  media: {
    height: 200,
  },


});

function MediaCard(props) {
  const { classes } = props;
  console.log(props.article)
  return (

    <Card className={classes.card}
    raised='true'>
      <CardActionArea>

        <img src={props.article.urlToImage} className={classes.media} />
        <CardContent>
        <a target='blank' href={props.article.url} style={{ textDecoration: 'none', color: 'white' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.article.title}
          </Typography>
          </a>
          <Typography component="p" align='right'>
            {props.article.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => props.save(props.article)}>
          Save
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>

  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
