import React, { Component } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Grid, Divider, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import MediaCard from './MediaCard'
import ConversationsList from './components/ConversationsList'

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
    articles: []
  }


  render() {
    const { classes } = this.props
  const x =  this.state.articles.map(article =>
    <Grid item xs={3}>
    <MediaCard article={article}/>
    </Grid>
  )

    return (
      <main className={classes.main}>
      <Paper className={classes.paper}>


      <Divider />
      <ConversationsList user={this.props.user}/>
      </Paper>
      </main>
    );
  }
}
)
