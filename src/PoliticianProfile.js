import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardActions, CardActionArea, CardContent, Typography, Button, Backdrop, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import unknownPhoto from './unknown-photo.png';
import SpeedDial from './PoliticianSpeedDial';


function PoliticianProfile(props) {

  const { classes, fed, data, handleView, handleFinances, handleVotes, handleContribs, handleBills, handleEvents, handleIndustry } = props;
  const [open, setOpen] = useState(false);
  const onClickActions = { handleView, handleFinances, handleVotes, handleContribs, handleBills, handleEvents, handleIndustry }

  const handleBackdrop = (bool) => {

    setOpen(bool);
  }

  return (
    <>
      <Backdrop open={open} />
      <CardActionArea classes={{ root: classes.actionArea, focusHighlight: classes.focusHighlight }}>
        {fed.photoUrl ? 
          <img src={fed.photoUrl} className={classes.media} alt='Headshot' />
        : 
          <img src={unknownPhoto} className={classes.media} alt='Headshot' />
        }
        <CardContent>
          <Typography gutterBottom variant='h3' component='h2' color={open ? 'secondary' : 'primary'}>
            {fed.search ? fed.name.official_full : fed.name}
          </Typography>
          <Typography component='p' align='right'>
            {fed.search ? fed.terms[fed.terms.length - 1].party : fed.party}
          </Typography>
        </CardContent>
      </CardActionArea>
      {fed.id || data.id ? 
        <Paper>
          <SpeedDial onClickActions={onClickActions} handleBackdrop={handleBackdrop} mr={-5}/>
        </Paper>
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
