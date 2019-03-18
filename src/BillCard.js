import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
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
  return (

    <Card className={classes.card}
    style={{ opacity: '.7', boxShadow: 'none'}}
    raised='true'>

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
    <Typography component="p" align='right' onClick={()=> props.handlePol(props.bill.sponsor_id)}>
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
