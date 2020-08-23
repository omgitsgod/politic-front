import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Tab, Tabs, Grid, Paper } from '@material-ui/core';
import { isBrowser} from 'react-device-detect';
import { Info } from '@material-ui/icons';
import EventCard from './EventCard';
import Politician from './Politician';


function EventContainer(props) {

  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState('Recent');
  const [fed, setFed] = useState('');
  const {classes} = props;
  const gridNum = isBrowser ? 3 : 12;

  const handlePol = (pol) => {

    (pol === 'Back') ? setFed('') : setFed(pol);
  }

  const handleChange = (event, change) => {

    if (change !== 'Back') setTab(change);
  }

  const fetchEvents = async () => {
    
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/events`).then(r => r.json());

    setEvents(json.objects)
  }

  useEffect(() => {

    fetchEvents();
  }, []);

  return (
    <main className={classes.main}>
      {(fed.length === 0) ?
        <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab icon={<Info />} value={'Recent'} label='Most Recent Events' />
          </Tabs>
          <Grid container spacing={10}>
            <Grid container spacing={10} justify='center'>
              {events && events.length > 0 ? events.map(event => 
                <Grid item xs={gridNum} key={event.id}> 
                  <EventCard event={event} /> 
                </Grid>) 
              : 
                <CircularProgress className={classes.loading}size={200} />
              }
            </Grid>
          </Grid>
        </Paper>
      :
        <Paper>
          <Politician fed={fed} data={fed.data} handlePol={handlePol}/>
        </Paper>
      }
    </main>
  );
}

EventContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({

  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(8)
  },
  media: {
    height: 200,
  },
  loading: {
    marginTop: '20%',
  },
});

export default withStyles(styles)(EventContainer);
