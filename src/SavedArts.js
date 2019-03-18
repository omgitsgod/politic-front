import React, { Component } from 'react';
import { Paper, Typography,  Grid, Divider} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import MediaCard from './MediaCard'
import { API_ROOT } from './constants';
import { isBrowser, isMobile } from "react-device-detect"

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
class SavedArts extends Component {

  state = {
    articles: []
  }

  componentDidMount() {
    fetch(`${API_ROOT}/articles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.EJP9HEoZEPuBcc_wTncwkS_4T7yYO4wnd8wF2Zyo6Mg`
      }
    })
      .then(res => res.json())
      .then(x => {
        if (this.props.user) {
        const articles = x.filter(y => y.user_id === this.props.user.user.id)
        this.setState({ articles })}
      } )

  }
  render() {
    const { classes } = this.props
    let gridNum
    if (isBrowser) {
      gridNum = 3
    } else {
      gridNum = 12
    }
    const x =  this.state.articles.map(article =>
       <Grid item xs={gridNum}>
       <MediaCard article={article}/>
       </Grid>
     )
    return (
      <main className={classes.main}>
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>

    <Typography variant='display2' align='center' gutterBottom>
      Saved Articles
      </Typography>
      <Divider />
      <Grid container spacing={16}>
      <Grid container spacing={32} justify='center'>
      {(this.state.articles) ? x : ""}
      </Grid>
      </Grid>
      </Paper>
      </main>
    );
  }
}
)
