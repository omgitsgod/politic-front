import React from 'react';
import { Typography } from '@material-ui/core';
import ContributorTable from './ContriTable';


function PoliticianContributions(props) {

    const { contributions } = props;

    return (
      <>
        <Typography variant='h5' align='center'>
          Top Contributors
        </Typography>
        <ContributorTable contribs={contributions} />
      </>
    );
}

export default PoliticianContributions;
