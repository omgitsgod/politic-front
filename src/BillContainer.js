import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Tab, Tabs, Grid, Paper } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import BillCard from './BillCard';
import Politician from './Politician';


function BillContainer(props) {

  const [bills, setBills] = useState([]);
  const [tab, setTab] = useState('Recent');
  const [fed, setFed] = useState('');
  const {classes} = props;

  const fetchBills = async () => {

    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/bills`).then(r => r.json());

    setBills(json.results[0].bills);
  }

  const handlePol = (pol) => {

    (pol === 'Back') ? setFed('') : setFed(pol);
  }

  const handleChange = (event, change) => {

    (change !== 'Back') ? setTab(change) : console.log('Back');
  }

  useEffect(() => {

    fetchBills();
  }, []);

  return (
    <main className={classes.main}>
      {(fed.length === 0) ?
        <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab icon={<Info />} value={'Recent'} label='Recently Introduced' />
          </Tabs>
          <Grid container spacing={10} justify='center'>
            {bills && bills.length > 0 ? bills.map(bill => 
              <Grid item xs={12} sm={6} md={3}  key={bill.bill_id}> 
                <BillCard bill={bill} handlePol={handlePol} /> 
              </Grid>) 
            : 
              <CircularProgress className={classes.loading}size={200} />
            }
          </Grid>
        </Paper>
      :
        <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
          <Politician fed={fed} data={fed.data} handlePol={handlePol}/>
        </Paper>
      }
    </main>
  );
}

BillContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({

  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(8)
  },
  media: {
    height: 200,
  },
  loading: {
    marginTop: '20%',
  },
});

export default withStyles(styles)(BillContainer);
