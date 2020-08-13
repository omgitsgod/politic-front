import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import IndustryTable from './IndustryTable';


function PoliticianIndustry(props) {

  const { industry } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography variant='h5' align='center'>
        By Industry
      </Typography>
      <IndustryTable industry={industry} />
    </Paper>
  );
}

export default PoliticianIndustry;
