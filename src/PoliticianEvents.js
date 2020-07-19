import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import EventCard from './EventCard';


function PoliticianEvents(props) {

  const { events, gridNum} = props;

  return (
    <>
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
    </>
  );
}

export default PoliticianEvents;
