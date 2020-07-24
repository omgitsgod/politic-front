import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Icon, IconButton, MenuItem, Menu, Button, Drawer, List, ListItemText, Divider, ListItem, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import { Home, AccountBalance, LineWeight, Chat, LockOpen, Create, Star, CreditCard, HowToVote, Event, People, AccountCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'


function MenuAppBar(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [left, setLeft] = useState(false);
  const { classes, logged, handleUser } = props;
  const open = Boolean(anchorEl);

  const toggleDrawer = (side, open) => () => {

    setLeft(open);
  };

  const handleMenu = event => {

    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {

    setAnchorEl(null);
  }

  return (
      <div className={classes.root}>
        <AppBar position='fixed' style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>

              <IconButton className={classes.menuButton} onClick={toggleDrawer('left', true)} onMouseOver={toggleDrawer('left', true)}  color='secondary' aria-label='Menu'>
                <AccountBalance />
              </IconButton>
 
            <Typography variant='h6' color='inherit' align='left' className={classes.grow}>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>  politic </Link>
            </Typography>
            {(logged) ? (
              <div>
                <Link to='/savedarts' style={{ textDecoration: 'none', color: 'white' }}>
                  <IconButton
                    aria-haspopup='true'
                    color='secondary'
                  >
                    <Star />
                  </IconButton>
                </Link>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                  <IconButton
                    aria-haspopup='true'
                    color='secondary'
                    disabled
                  >
                    <MailIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='secondary'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
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
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleUser({})}>Logout</MenuItem>
                </Menu>
              </div>) 
            :(
              <div>
                <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
                  <Button>
                    <Icon
                      aria-haspopup='true'
                      color='secondary'
                    >
                      <Create />
                    </Icon>
                    Sign Up
                  </Button>
                </Link>
                <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
                  <Button>
                    <Icon
                      aria-haspopup='true'
                      color='secondary'
                    >
                      <LockOpen />
                    </Icon>
                    Sign In
                  </Button>
                </Link>
              </div>)
            }
          </Toolbar>
        </AppBar>
        <Drawer open={left} onClose={toggleDrawer('left', false)} >
          <div
            tabIndex={0}
            role='button'
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            {(logged) ?
              <div className={classes.list}>
                <ListItem button>
                  <ListItemIcon className={classes.menuButton} onClick={toggleDrawer('left', true)} aria-label='Menu'>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary='politic' />
                </ListItem>
                <Divider />
                <Divider />
                <List>
                  <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary='Home' />
                    </ListItem>
                  </Link>
                  <Link to='/news' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <LineWeight />
                      </ListItemIcon>
                      <ListItemText primary='News' />
                    </ListItem>
                  </Link>
                  <Link to='/bills' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <CreditCard />
                      </ListItemIcon>
                      <ListItemText primary='Bills' />
                    </ListItem>
                  </Link>
                  <Link to='/votes' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <HowToVote />
                      </ListItemIcon>
                      <ListItemText primary='Votes' />
                    </ListItem>
                  </Link>
                  <Link to='/people' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <People />
                      </ListItemIcon>
                      <ListItemText primary='Politicians' />
                    </ListItem>
                  </Link>
                  <Link to='/events' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <Event />
                      </ListItemIcon>
                      <ListItemText primary='Events' />
                    </ListItem>
                  </Link>
                  <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button disabled>
                      <ListItemIcon>
                        <Chat />
                      </ListItemIcon>
                      <ListItemText primary='Chat' />
                    </ListItem>
                  </Link>
                </List>
              </div>
            :
              <div className={classes.list}>
                <ListItem button>
                  <ListItemIcon className={classes.menuButton} onClick={toggleDrawer('left', true)} aria-label='Menu'>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary='politic' />
                </ListItem>
                <Divider />
                <Divider />
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                  <ListItem button>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                  </ListItem>
                </Link>
                <Link to='/news' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <LineWeight />
                      </ListItemIcon>
                      <ListItemText primary='News' />
                    </ListItem>
                  </Link>
                  <Link to='/bills' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <CreditCard />
                      </ListItemIcon>
                      <ListItemText primary='Bills' />
                    </ListItem>
                  </Link>
                  <Link to='/votes' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <HowToVote />
                      </ListItemIcon>
                      <ListItemText primary='Votes' />
                    </ListItem>
                  </Link>
                  <Link to='/people' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <People />
                      </ListItemIcon>
                      <ListItemText primary='Politicians' />
                    </ListItem>
                  </Link>
                  <Link to='/events' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <Event />
                      </ListItemIcon>
                      <ListItemText primary='Events' />
                    </ListItem>
                  </Link>
                  <Divider />
                <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
                  <ListItem button>
                    <ListItemIcon>
                      <LockOpen />
                    </ListItemIcon>
                    <ListItemText primary='Sign In' />
                  </ListItem>
                </Link>
                <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
                  <ListItem button>
                    <ListItemIcon>
                      <Create/>
                    </ListItemIcon>
                    <ListItemText primary='Sign Up' />
                  </ListItem>
                </Link>
              </div>
            }
          </div>
        </Drawer>
      </div>
  );
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default withStyles(styles)(MenuAppBar);
