import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Divider} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Feds from './Feds';
import Pol from './Pol';
import { isBrowser } from 'react-device-detect';


function ThePeople(props) {
  
  const [feds, setFeds] = useState([]);
  const [fed, setFed] = useState('');
  const { classes, address } = props;
  const gridNum = isBrowser ? 3 : 12;
  const fedCards = feds ? feds.map(fed => 
    <Grid item xs={gridNum}>
      <Feds fed={fed} handlePol={handlePol}/>
    </Grid>
    ) : null

  const mapOffices = (officials = [], offices) => {
  
    if (officials.length === 9) { 
      officials[0].office = offices[0]
      officials[1].office = offices[1]
      officials[2].office = offices[2]
      officials[3].office = offices[2]
      officials[4].office = offices[3]
      officials[5].office = offices[4]
      officials[6].office = offices[5]
      officials[7].office = offices[6]
      officials[8].office = offices[7]
    } else if (officials.length === 7) {
      officials[0].office = offices[0]
      officials[1].office = offices[1]
      officials[2].office = offices[2]
      officials[3].office = offices[2]
      officials[4].office = offices[3]
      officials[5].office = offices[4]
      officials[6].office = offices[5]
    }
  }

  const handlePol = (pol) => {

    pol === 'Back' ? setFed('') : setFed(pol);
  }

  const fetchReps = async (address) => {

    const zip = address || 20001;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/reps/${zip}`).then(r => r.json());
    const officials = json.officials;
    const offices = json.offices;
    const state = json.normalizedInput.state;
    
    mapOffices(officials, offices);
    setFeds(officials);
  }

  useEffect(() => {

    fetchReps(address);
  }, []);
  
  return (
    (fed.length === 0) ?
      <main className={classes.main}>
        <Paper className={classes.paper} style={{ background: 'transparent', boxShadow: 'none'}}>
          <Typography variant='display2' align='center' gutterBottom>
            Pols
          </Typography>
          <Divider />
          <Grid container spacing={16}>
            <Grid container spacing={32} justify='center'>
              {fedCards}
            </Grid>
          </Grid>
        </Paper>
      </main>
    :
      <Pol fed={fed} handlePol={handlePol}/>
  );
}

const styles = theme => console.log(theme) || ({

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
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  thumbnail: {
    height: 100,
    width: 100,
  },
});

export default withStyles(styles)(ThePeople)
