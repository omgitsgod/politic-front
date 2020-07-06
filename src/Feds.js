import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import unknownPhoto from './unknown-photo.png'


function Feds(props) {

  const [data, setData] = useState('');
  const { classes, fed, handlePol } = props;

  const fetchCongress = async () => {

    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/congress`).then(r => r.json());
    const filtered = json.filter(rep => rep.name.official_full === fed.name)[0]

    setData(filtered);
  }

  useEffect(() => {

    fetchCongress();
  }, [])

  return (
    <Card className={classes.card} style={{ opacity: '.7', boxShadow: 'none'}} raised='true'>
      <CardActionArea>
        {(fed.photoUrl) ?
          <img src={fed.photoUrl} className={classes.media} /> 
        :
          <img src={unknownPhoto} className={classes.media} />
        }
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2' >
            {fed.name}
          </Typography>
          <Typography gutterBottom component='p' align='right'>
            {fed.office.name}
          </Typography>
          {(this.props.fed.party === 'Democratic') ?
            <Typography component='p' align='right' color='secondary'>
              {fed.party}
            </Typography>
          :
            <Typography component='p' align='right' color='error'>
              {fed.party}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' onClick={() => handlePol(fed)}>
          More Info
        </Button>
        <Button size='small' color='primary' >
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

Feds.propTypes = {
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

export default withStyles(styles)(Feds);
