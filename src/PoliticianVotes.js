import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import VoteCard from './VoteCard';


function PoliticianVotes(props) {

    const { votes, gridNum, handleBillPol } = props;

    return (
      <>
        <Typography variant='h5' align='center'>
          Voting!
        </Typography>
        <Grid container spacing={10}>
          <Grid container spacing={10} justify='center'>
            {votes.map(vote => (
              <Grid item xs={gridNum} key={vote.id}>
                <VoteCard vote={vote} handlePol={handleBillPol} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    );
}

export default PoliticianVotes;
