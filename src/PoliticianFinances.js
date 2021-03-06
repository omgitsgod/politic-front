import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import FinanceTable from './FinanceTable';


function PoliticianFinances(props) {

  const { finance, cycle } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography component='p' align='right'>
        First Elected: {cycle.first_elected}
      </Typography>
      <Typography component='p' align='right'>
        Cash on hand: ${cycle.cash_on_hand}
      </Typography>
      <Typography component='p' align='right'>
        {finance['@attributes'].transaction_count} transactions recorded:
      </Typography>
      <Typography component='p' align='right'>
        Lowest: {finance['@attributes'].tx_low} | Highest:{' '}
        {finance['@attributes'].tx_high}
      </Typography>
      <Typography component='p' align='right'>
        Networth: ${finance['@attributes'].net_low} - $
        {finance['@attributes'].net_high}
      </Typography>
      <Typography variant='h5' align='center'>
        Assets
      </Typography>
      <FinanceTable assets={finance.assets.asset} />
    </Paper>
  );
}

export default PoliticianFinances;
