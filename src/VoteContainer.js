import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Tab, Tabs, Grid, Paper } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import VoteCard from './VoteCard';
import Politician from './Politician';


function VoteContainer(props) {

  const [votes, setVotes] = useState([]);
  const [tab, setTab] = useState('Recent');
  const [fed, setFed] = useState('');
  const { classes } = props;

  useEffect(()=> {

    fetchVotes();
  }, []);

  const fetchVotes = async () => {

    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/votes/recent`)
      .then((r) => r.json())
      .catch(() => console.log('error'));

    if (json?.results) setVotes(json.results.votes);
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
          <Grid container spacing={10} justify='center'>
            {votes && votes.length > 0 ? votes.map((vote, i) => 
              <Grid item xs={12} sm={6} md={3}  key={i}> 
                <VoteCard vote={vote} handlePol={handlePol} /> 
              </Grid>) 
            : 
              <CircularProgress className={classes.loading}size={200} />
            }
          </Grid>
        </Paper>
      :
        <Paper>
          <Politician fed={fed} data={fed.data} handlePol={handlePol}/>
        </Paper>
      }
    </main>
  );
}

VoteContainer.propTypes = {
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

export default withStyles(styles)(VoteContainer);
