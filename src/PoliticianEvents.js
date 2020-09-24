import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import EventCard from './EventCard';


function PoliticianEvents(props) {

  const { events } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography variant='h5' align='center'>
        Events
      </Typography>
      <Grid container spacing={10} justify='center'>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={3}  key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default PoliticianEvents;
