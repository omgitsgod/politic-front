import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, CardActionArea, CardContent, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import unknownPhoto from './unknown-photo.png';


function PoliticianProfile(props) {

  const { classes, fed, data, handleView, handleFinances, handleVotes, handleContribs, handleBills, handleEvents, handleIndustry } = props;

  return (
    <>
      <CardActionArea classes={{ root: classes.actionArea, focusHighlight: classes.focusHighlight }}>
        {fed.photoUrl ? 
          <img src={fed.photoUrl} className={classes.media} alt='Headshot' />
        : 
          <img src={unknownPhoto} className={classes.media} alt='Headshot' />
        }
        <CardContent>
          <Typography gutterBottom variant='h3' component='h2'>
            {fed.search ? fed.name.official_full : fed.name}
          </Typography>
          <Typography component='p' align='right'>
            {fed.search ? fed.terms[fed.terms.length - 1].party : fed.party}
          </Typography>
        </CardContent>
      </CardActionArea>
      {fed.id || data.id ? 
        <CardActions>
          <Button size='small' color='primary' onClick={handleFinances}>
            <Typography component='p' color='secondary'>
              My Finances
            </Typography>
          </Button>
          <Button size='small' color='primary' onClick={handleVotes}>
            How do I vote?
          </Button>
          <Button size='small' color='primary' onClick={handleContribs}>
            <Typography component='p' color='secondary'>
              Contributors
            </Typography>
          </Button>
          <Button size='small' color='primary' onClick={handleBills}>
            Bills Ive Sponsered
          </Button>
          <Button size='small' color='primary' onClick={handleEvents}>
            <Typography component='p' color='secondary'>
              Events
            </Typography>
          </Button>
          <Button size='small' color='primary' onClick={handleIndustry}>
            <Typography component='p' color='secondary'>
              Which Industries Own Me
            </Typography>
          </Button>
        </CardActions>
      : 
        null
      }
      <>
        {handleView()}
      </>
    </>
  );
}

PoliticianProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  media: {
    height: 200,
  },
  actionArea: {
    '&:hover $focusHighlight': {
      opacity: 0,
    },
  },
  focusHighlight: {},
});

export default withStyles(styles)(PoliticianProfile);
