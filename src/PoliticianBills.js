import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import BillCard from './BillCard';


function PoliticianBills(props) {

  const { bills, handleBillPol } = props;

  return (
    <Paper style={{background: 'transparent', boxShadow: 'none', width: '100%'}}>
      <Typography variant='h5' align='center'>
        Bills
      </Typography>
      <Grid container spacing={10} justify='center'>
        {bills.map(bill => (
          <Grid item xs={12} sm={6} md={3}  key={bill.bill_id}>
            <BillCard bill={bill} handlePol={handleBillPol} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default PoliticianBills;
