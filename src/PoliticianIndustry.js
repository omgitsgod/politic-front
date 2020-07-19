import React from 'react';
import { Typography } from '@material-ui/core';
import IndustryTable from './IndusTable';

function PoliticianIndustry(props) {

    const { industry } = props;

    return (
      <>
        <Typography variant='h5' align='center'>
          By Industry
        </Typography>
        <IndustryTable industry={industry} />
      </>
    );
}

export default PoliticianIndustry;
