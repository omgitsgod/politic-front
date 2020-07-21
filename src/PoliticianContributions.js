import React from 'react';
import { Typography } from '@material-ui/core';
import ContributionTable from './ContributionTable';


function PoliticianContributions(props) {

    const { contributions } = props;

    return (
        <>
            <Typography variant='h5' align='center'>
                Top Contributors
            </Typography>
            <ContributionTable contribs={contributions} />
        </>
    );
}

export default PoliticianContributions;
