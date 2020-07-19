import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import BillCard from './BillCard';

function PoliticianBills(props) {

    const { bills, gridNum, handleBillPol } = props;

    return (
      <>
        <Typography variant='h5' align='center'>
          Bills!
        </Typography>
          <Grid container spacing={10}>
            <Grid container spacing={10} justify='center'>
              {bills.map(bill => (
                <Grid item xs={gridNum} key={bill.id}>
                  <BillCard bill={bill} handlePol={handleBillPol} />
                </Grid>
              ))}
            </Grid>
          </Grid>
      </>
    );
}

export default PoliticianBills;
