import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';


function EventCard(props) {

  const { classes, event } = props;

  return (
    <Card 
      className={classes.card}
      style={{ opacity: '.7', boxShadow: 'none'}}
      raised={true}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h6' component='p'>
            {event.entertainment}
          </Typography>
          {(event.hosts.length > 0) ?
            <Typography gutterBottom variant='body2' component='p'>
              Hosted by:
            </Typography>
          :
            ''
          }
          {event.hosts.map(host => <Typography gutterBottom variant='body1' component='p' key={host.name}>{host.name}</Typography>)}
        </CardContent>
        <br />
        <CardContent>
          {(event.venue) ?
            <div>
              <Typography component='p' align='center'  >
                {event.venue.address1},
              </Typography>
              <Typography component='p' align='center'  >
                {event.venue.city} {event.venue.state}
              </Typography>
            </div>
          :
            ''
          }
          <Typography variant='h5' align='right'  style={{color: 'green'}}>
            on {event.start_date}
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

const styles = (theme) => ({

  card: {
    maxWidth: 345,
    marginTop: theme.spacing(8)
  },
  media: {
    height: 200,
  },
});

export default withStyles(styles)(EventCard);
