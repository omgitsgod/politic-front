import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import ContributionTable from './ContributionTable';


function PoliticianContributions(props) {

  const { contributions } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography variant='h5' align='center'>
        Top Contributors
      </Typography>
      <ContributionTable contribs={contributions} />
    </Paper>
  );
}

export default PoliticianContributions;
