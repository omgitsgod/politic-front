import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import unknownPhoto from './unknown-photo.png'


function PoliticianCard(props) {

  const { classes, fed, handlePol } = props;

  const mapTitle = (type) => {

    let title

    switch (type) {
      case 'rep':
        title = 'Representative';
        break
      case 'sen':
        title = 'Senator'
        break
      default:
        title = ''
        break
    }

    return title;
  }

  return (
    <Card className={classes.card} style={{ opacity: '.7', boxShadow: 'none' }} raised={true}>
      {!fed.search ? (
        <CardActionArea>
          {fed.photoUrl ? (
            <img src={fed.photoUrl} className={classes.media} alt='Headshot' />
          ) : (
            <img src={unknownPhoto} className={classes.media} alt='Headshot' />
          )}
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {fed.name}
            </Typography>
            <Typography gutterBottom component='p' align='right'>
              {fed.office.name}
            </Typography>
            {fed.party === 'Democratic' ? (
              <Typography component='p' align='right' color='secondary'>
                {fed.party}
              </Typography>
            ) : (
              <Typography component='p' align='right' color='error'>
                {fed.party}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      ) : 
        <CardActionArea>
          {fed.photoUrl ? (
            <img src={fed.photoUrl} className={classes.media} alt='Headshot' />
          ) : (
            <img src={unknownPhoto} className={classes.media} alt='Headshot' />
          )}
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {fed.name.official_full}
            </Typography>
            <Typography gutterBottom component='p' align='right'>
              {mapTitle(fed.terms[fed.terms.length - 1].type)} - {fed.terms[fed.terms.length - 1].state}
            </Typography>
            {fed.party === 'Democrat' ? (
              <Typography component='p' align='right' color='secondary'>
                {fed.terms[fed.terms.length - 1].party}
              </Typography>
            ) : (
              <Typography component='p' align='right' color='error'>
                {fed.terms[fed.terms.length - 1].party}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      }
      {fed.data || fed.search ? (
        <CardActions>
          <Button size='small' onClick={() => handlePol(fed)}>
            More Info
          </Button>
          <Button size='small' color='primary'>
            Share
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}

PoliticianCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({

  card: {
    height: 400,
    maxWidth: 345,
    marginTop: theme.spacing(8),
  },
  media: {
    height: 200,
  },
});

export default withStyles(styles)(PoliticianCard);
