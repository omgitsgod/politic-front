import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Divider, IconButton } from '@material-ui/core';
import PoliticianCard from './PoliticianCard';
import HighlightOff from '@material-ui/icons/HighlightOff';


function PoliticianList(props) {

  const { classes, feds, handlePol, search, district, setZip } = props;

  return (
    <Paper className={classes.paper} style={{ background: 'transparent', boxShadow: 'none' }}>
      {search ?
        null
      :
        <>
          <Typography variant='h2' align='center' gutterBottom>
            Politicians
          </Typography>
          <Typography variant='body1' align='right'>
            <IconButton
              fontSize='large'
              style={{ color: 'white' }}
              onClick={() => setZip('reset')}
            >
              <HighlightOff />
            </IconButton>    
              District {district}
          </Typography>
        </>
    	}
      <Divider />
      <Grid container spacing={10} justify='center'>
        {feds ? feds.map(fed => (
          <Grid item xs={12} sm={6} md={3} key={fed.search ? fed.name.official_full : fed.name}>
            <PoliticianCard fed={fed} handlePol={handlePol} />
          </Grid>))  
        : 
          null
        }
      </Grid>
  	</Paper>
  );
}

const styles = theme => ({

	paper: {
	marginTop: theme.spacing(8),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
});

export default withStyles(styles)(PoliticianList);
