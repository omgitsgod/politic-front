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

function Feds(props) {
  const { classes } = props;

  return (

    <Card className={classes.card}
    raised='true'>
      <CardActionArea>
      {(props.fed.photoUrl) ?
        <img src={props.fed.photoUrl} className={classes.media} /> :
         <img src='https://art.sdsu.edu/wp-content/uploads/2015/02/default-user-01.png' className={classes.media} />
      }
        <CardContent>

          <Typography gutterBottom variant="h5" component="h2">
            {props.fed.name}
          </Typography>

          <Typography component="p" align='right'>
            {props.fed.party}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Save
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>

  );
}

Feds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feds);
