import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import EventCard from './EventCard';


function PoliticianEvents(props) {

  const { events, gridNum } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography variant='h5' align='center'>
        Events
      </Typography>
      <Grid container spacing={10}>
        <Grid container spacing={10} justify='center'>
          {events.map((event) => (
            <Grid item xs={gridNum} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PoliticianEvents;
