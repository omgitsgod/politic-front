import React, { Component } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Grid, Divider, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import MediaCard from './MediaCard'
import Feds from './Feds'

const styles = theme => console.log(theme) || ({
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
      marginTop: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    contain: {
      marginTop: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    thumbnail: {
      height: 100,
      width: 100,

    }

})
export default withStyles(styles) (
class HeadlinesContainer extends Component {

  state = {
    feds: [],
    state: '',
  }

  componentDidMount() {

    const zip = (this.props.zip) ?  this.props.zip : '10009'
  fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=${zip}&includeOffices=true&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=legislatorUpperBody&prettyPrint=true&key=${process.env.REACT_APP_CIVIC_API_KEY}`).then(r => r.json()).then(json => {

    this.setState({
      feds: json.officials,
      state: json.normalizedInput.state
    })
      console.log(this.state)

  });
  debugger
  }
  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
      <Paper className={classes.paper}>

    <Typography variant='display2' align='center' gutterBottom>
      Your District in {this.state.state} State
      </Typography>
      <Divider />

      <Paper className={classes.contain}>

      <Typography variant='display2' align='center' gutterBottom>
        Executive
        </Typography>
        <Grid container spacing={16}>
        <Grid container spacing={32} justify='center'>
        <Paper className={classes.paper}>
        <Typography variant='display2' align='center' gutterBottom>
          Federal
          </Typography>


            {(this.state.feds.length> 0) ? <div><Feds fed={this.state.feds[0]}/> <Feds fed={this.state.feds[1]}/>  </div>: ''}

          </Paper>
          <Paper className={classes.paper}>
          <Typography variant='display2' align='center' gutterBottom>
            {this.state.state} State
            </Typography>
            {(this.state.feds.length> 0) ? <div><Feds fed={this.state.feds[4]}/> <Feds fed={this.state.feds[5]}/>  </div>: ''}
            </Paper>
            </Grid>
            </Grid>
        </Paper>

        <Paper className={classes.paper}>
        <Typography variant='display2' align='center' gutterBottom>
          Congress
          </Typography>
          <Paper className={classes.paper}>
          <Typography variant='display2' align='center' gutterBottom>
            Senate
            </Typography>
            {(this.state.feds.length> 0) ? <div><Feds fed={this.state.feds[3]}/> <Feds fed={this.state.feds[2]}/>  </div>: ''}
            </Paper>
            <Paper className={classes.paper}>
            <Typography variant='display2' align='center' gutterBottom>
              House
              </Typography>
              </Paper>
          </Paper>

      </Paper>
      </main>
    );
  }
}
)
