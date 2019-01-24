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

function EventCard(props) {
  const { classes } = props;
  console.log(props.article)
  return (

    <Card className={classes.card}
    style={{ opacity: '.7', boxShadow: 'none'}}
    raised='true'>

    <CardActionArea>
    <CardContent>

    <Typography gutterBottom variant="title" component="p">
     {props.event.entertainment}
    </Typography>
    { (props.event.hosts.length > 0) ?
    <Typography gutterBottom variant="title" component="p">
      Hosted by:
    </Typography>
    :
    ''
    }
    {props.event.hosts.map(host => <Typography gutterBottom variant="title" component="p">{host.name}</Typography>)}


    </CardContent>
    <br />
<CardContent >

{(props.event.venue) ?
  <div>
<Typography component="p" align='center'  >
{props.event.venue.address1},
</Typography>
<Typography component="p" align='center'  >
{props.event.venue.city} {props.event.venue.state}
</Typography>
</div>
:
''
}
<Typography variant="h5" align='right'  style={{color: 'green'}}>
on {props.event.start_date}
</Typography>
<br />


  <br />
    </CardContent>
    </CardActionArea>

    </Card>

  );
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);
