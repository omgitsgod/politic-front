import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { Tab, Tabs, Grid } from '@material-ui/core'
import VoteCard from './VoteCard'
import Pol2 from './Pol2'
import { isBrowser, isMobile } from "react-device-detect"

import { KeyboardBackspace, Info, LineWeight } from '@material-ui/icons'

const styles = (theme) => ({

    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  card: {
    maxWidth: 345,
     marginTop: theme.spacing.unit * 8
  },
  media: {
    height: 200,
  },


});

class Votes extends Component {

  state = {
    votes : [],
    tab: 'Recent',
    fed: ''
  }

  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/both/votes/recent.json',{
      headers: {
        Accept: "application/json",
        'X-API-KEY': process.env.REACT_APP_PROPUB_API_KEY
      }
    }).then(r => r.json())
    .then(votes => this.setState({votes: votes.results.votes}))
  }

  handlePol = (pol) => {
    if (pol === "Back") {
      this.setState({fed: ''})
    } else {
  this.setState({fed: pol})
  }
  }

  handleChange = (event, change) => {
    if (change === "Back") {
    //  this.props.handlePol("Back")
    } else {
    this.setState({
      tab: change
    })
  }
  }

  render() {
      console.log(this.state)
      const { classes } = this.props;
      let gridNum
      if (isBrowser) {
        gridNum = 3
      } else {
        gridNum = 12
      }
      const x = this.state.votes.map(vote => <Grid item xs={gridNum}> <VoteCard vote={vote} handlePol={this.handlePol} /> </Grid>)
    return (
      <main className={classes.main}>
      { (this.state.fed.length === 0) ?
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
      <Tabs
        value={this.state.tab}
       onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >

        <Tab icon={<Info />} value={"Recent"} label="Recently Voted" />


      </Tabs>
      <Grid container spacing={16}>
      <Grid container spacing={32} justify='center'>
      {x}
      </Grid>
      </Grid>
      </Paper>
      :
      <Paper>
      <Pol2 id={this.state.fed} handlePol={this.handlePol}/>
      </Paper>
    }
      </main>
    )
  }
}

Votes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Votes);
