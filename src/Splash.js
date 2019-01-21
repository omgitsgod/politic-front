import React, { Component } from 'react';
import { Paper, Typography, Grid, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import MediaCard from './MediaCard'
import Feds from './Feds'
import Pol from './Pol'
import ThePeople from './ThePeople'

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
    fed: ''
  }

  componentDidMount() {

    const zip = (this.props.address) ?  this.props.zip : '07028'
  fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=${zip}&includeOffices=true&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=legislatorUpperBody&prettyPrint=true&key=${process.env.REACT_APP_CIVIC_API_KEY}`).then(r => r.json()).then(json => {

    this.setState({
      feds: json.officials,
      state: json.normalizedInput.state
    })
      console.log(this.state)

  })

}
handlePol = (pol) => {
this.setState({fed: pol})
}
  render() {
    const { classes } = this.props

    return (
      <main className={classes.main}>
      <Paper>
    <Typography variant='display2' align='center' gutterBottom>
      Your District in {this.state.state} State
      </Typography>
      <Divider />
      <ThePeople user={this.props.user} handleUser={this.props.handleUser} address={this.props.address} zip={this.props.zip}/>
      </Paper>
      </main>
    );
  }


}
)
