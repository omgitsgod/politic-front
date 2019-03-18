import React, { Component } from 'react';
import { Paper, Typography, Grid, Divider} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Feds from './Feds'
import Pol from './Pol'
import { isBrowser } from "react-device-detect"

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
      marginTop: theme.spacing.unit * 8,
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

    const zip = (this.props.address) ?  this.props.address : '07028'
  fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=${zip}&levels=administrativeArea1&levels=country&key=AIzaSyAXEhp82D0-hWEDCRn6b46cg-lpWCx1bdU`).then(r => r.json()).then(json => {
    const waka = json.officials
    if (waka.length === 9) {
    waka[0].office = json.offices[0]
    waka[1].office = json.offices[1]
    waka[2].office = json.offices[2]
    waka[3].office = json.offices[2]
    waka[4].office = json.offices[3]
    waka[5].office = json.offices[4]
    waka[6].office = json.offices[5]
    waka[7].office = json.offices[6]
    waka[8].office = json.offices[7]
  } else if (waka.length === 7) {
    waka[0].office = json.offices[0]
    waka[1].office = json.offices[1]
    waka[2].office = json.offices[2]
    waka[3].office = json.offices[2]
    waka[4].office = json.offices[3]
    waka[5].office = json.offices[4]
    waka[6].office = json.offices[5]
  }
    this.setState({
      feds: waka,
      state: json.normalizedInput.state
    })


  })

}
handlePol = (pol) => {
  if (pol === "Back") {
    this.setState({fed: ''})
  } else {
this.setState({fed: pol})
}
}
  render() {
    const { classes } = this.props
    let gridNum
    if (isBrowser) {
      gridNum = 3
    } else {
      gridNum = 12
    }
    const x =  this.state.feds.map(fed =>
    <Grid item xs={gridNum}>
    <Feds fed={fed} handlePol={this.handlePol}/>
    </Grid>
  )

  if (this.state.fed.length === 0) {
    return (
      <main className={classes.main}>
      <Paper className={classes.paper} style={{ background: 'transparent', boxShadow: 'none'}}>

    <Typography variant='display2' align='center' gutterBottom>
      Pols
      </Typography>
      <Divider />
      <Grid container spacing={16}>
      <Grid container spacing={32} justify='center'>
      {x}
      </Grid>
      </Grid>
      </Paper>
      </main>
    );
  }
  else {
    return (
    <Pol fed={this.state.fed} handlePol={this.handlePol}/>
  )
  }
  }
}
)
