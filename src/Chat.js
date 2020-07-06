import React from 'react';
import { Paper, Divider} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ConversationsList from './ConversationsList'


function Chat(props) {

  const { classes, user } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
        <Divider />
        <ConversationsList user={user}/>
      </Paper>
    </main>
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

export default withStyles(styles)(Chat);
