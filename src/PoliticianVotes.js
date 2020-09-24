import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import VoteCard from './VoteCard';


function PoliticianVotes(props) {

  const { votes, handleBillPol } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography variant='h5' align='center'>
        Votes
      </Typography>
      <Grid container spacing={10} justify='center'>
        {votes.map((vote, i) => (
          <Grid item xs={12} sm={6} md={3}  key={i}>
            <VoteCard vote={vote} handlePol={handleBillPol} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default PoliticianVotes;
