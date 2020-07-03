import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Grid, Paper } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { isBrowser } from 'react-device-detect';
import VoteCard from './VoteCard';
import Pol2 from './Pol2';


function Votes(props) {

  const [votes, setVotes] = useState([]);
  const [tab, setTab] = useState('Recent');
  const [fed, setFed] = useState('');
  const { classes } = props;
  const gridNum = isBrowser ? 3 : 12;
  const voteCards = votes ? votes.map(vote => 
    <Grid item xs={gridNum}> 
      <VoteCard vote={vote} handlePol={handlePol} /> 
    </Grid>
  ) : null

  useEffect(()=> {

    fetchVotes();
  }, []);

  const fetchVotes = async () => {

    const json = fetch(`${process.env.REACT_APP_BACK_HOST}/news/recent`).then(r => r.json());

    setVotes(json.results.votes);
  }

  const handlePol = (pol) => {
  
    pol === 'Back' ? setFed('') : setFed(pol);
  }

  const handleChange = (event, change) => {
    
    change === 'Back' ? handlePol('Back') : setTab(change);
  }

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
            <Tab icon={<Info />} value={'Recent'} label='Recently Voted' />
          </Tabs>
          <Grid container spacing={16}>
            <Grid container spacing={32} justify='center'>
              {voteCards}
            </Grid>
          </Grid>
        </Paper>
      :
        <Paper>
          <Pol2 id={fed} handlePol={handlePol}/>
        </Paper>
      }
    </main>
  );
}

Votes.propTypes = {
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
});

export default withStyles(styles)(Votes);
