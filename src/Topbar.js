import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';



import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MailIcon from '@material-ui/icons/Mail';
import { Home, AccountBalance, LineWeight, Chat, LockOpen, Create, Star } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import SavedArts from './SavedArts'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    left: false,
    anchorHuh: null,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      left: open,
    });
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMaybe = event => {
    this.setState({ anchorHuh: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
      (this.props.logged) ?
      <div className={classes.list}>


      <ListItem button>

      <ListItemIcon className={classes.menuButton} onClick={this.toggleDrawer('left', true)} aria-label="Menu">
        <MenuIcon />
      </ListItemIcon>
      <ListItemText primary="politic" />
      </ListItem>
        <Divider />
        <Divider />
        <List>

        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
        <ListItem button>

        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
          </ListItem></Link>
          <Link to='/news' style={{ textDecoration: 'none', color: 'white' }}>
          <ListItem button>

          <ListItemIcon>
            <LineWeight />
          </ListItemIcon>
          <ListItemText primary="News" />
            </ListItem></Link>
            <Link to='/chat' style={{ textDecoration: 'none', color: 'white' }}>
            <ListItem button>

            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Chat" />
              </ListItem></Link>

          </List>
      </div>
      :
      <div className={classes.list}>
      <ListItem button>

      <ListItemIcon className={classes.menuButton} onClick={this.toggleDrawer('left', true)} aria-label="Menu">
        <MenuIcon />
      </ListItemIcon>
      <ListItemText primary="politic" />
      </ListItem>
        <Divider />
        <Divider />
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
        <ListItem button>

        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
          </ListItem></Link>
          <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
          <ListItem button>

          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
            </ListItem></Link>
            <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
            <ListItem button>

            <ListItemIcon>
              <Create/>
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
              </ListItem></Link>
      </div>

    );



    return (
      <div className={classes.root}>

        <AppBar position="static">
          <Toolbar>
            {(this.props.logged) ? <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)}  color="inherit" aria-label="Menu">
              <AccountBalance />
            </IconButton>
            :
            ''
          }
            <Typography variant="h6" color="inherit" align='left' className={classes.grow}>

            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>  politic </Link>
            </Typography>

            {(this.props.logged) ? (
              <div>
              <Link to='/savedarts' style={{ textDecoration: 'none', color: 'white' }}>
              <IconButton
                aria-haspopup="true"
                color="secondary"
              >
                <Star />
              </IconButton>
              </Link>
              <Link to='/chat' style={{ textDecoration: 'none', color: 'black' }}>
              <Badge className={classes.margin} badgeContent={25} color="primary">
                <MailIcon />
              </Badge>
              </Link>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}><Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>Profile </Link></MenuItem>
                  <MenuItem onClick={this.handleClose}><Link to='/editprofile' style={{ textDecoration: 'none', color: 'white' }}>Edit Profile</Link></MenuItem>
                  <MenuItem onClick={() => this.props.handleUser({})}>Logout</MenuItem>

                </Menu>
              </div>
            ) : (
              <div>
              <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>

              <Button>
              <Icon
                aria-haspopup="true"
                color="secondary"
              >
                <Create />
              </Icon>
              Sign Up
              </Button>
              </Link>
              <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
              <Button>
              <Icon
                aria-haspopup="true"
                color="secondary"
              >
                <LockOpen />
              </Icon>
              Sign In
              </Button>
              </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>

      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
