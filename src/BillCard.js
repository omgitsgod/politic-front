import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

function BillCard(props) {
  const { classes } = props;
  console.log(props.article)
  return (

    <Card className={classes.card}
    raised='true'>
      {(props.article) ?
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
       (props.save) ?
      <CardActions>
        <Button size="small" color="primary" onClick={() => props.save(props.article)}>
          Save
        </Button>
        <Button size="small" color="primary" disabled="true">
          Share
        </Button>
      </CardActions>
      :
      ''

    :
    <CardActionArea>
    <CardContent>
    <a target='blank' href={props.bill.govtrack_url} style={{ textDecoration: 'none', color: 'white' }}>
    <Typography gutterBottom variant="title" component="p">
      {props.bill.short_title}
    </Typography>
    </a>
    </CardContent>
    <br />
<CardContent >
    <Typography component="p" align='right'>
          {props.bill.sponsor_title} {props.bill.sponsor_name}
    </Typography>
    {(props.bill.sponsor_party === "D") ?
    <Typography component="p" align='right' color="secondary">
          {props.bill.sponsor_state} - {props.bill.sponsor_party}
    </Typography>
    :
    <Typography component="p" align='right' color="error">
          {props.bill.sponsor_state} - {props.bill.sponsor_party}
    </Typography>
  }
  <br />
  <Typography component="p" align='center'>
        {props.bill.committees}
  </Typography>
    </CardContent>
    </CardActionArea>
  }
    </Card>

  );
}

BillCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BillCard);
