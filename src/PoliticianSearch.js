import React, { useState, useEffect } from 'react';
import { Paper, Typography, FormControl, InputLabel, Input,  Button } from '@material-ui/core';
import  { GpsFixedTwoTone as LocationIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { isBrowser } from 'react-device-detect';
import PoliticianList from './PoliticianList';
import Politician from './Politician';


function PoliticianSearch(props) {

    const [results, setResults] = useState([]);
    const [fed, setFed] = useState('');
    const { classes } = props;
    const gridNum = isBrowser ? 3 : 12;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.politician.value;
        const clean = name.replace(/[^a-zA-Z ]/g, "");
        const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/congress/search/${clean}`).then(r => r.json());

        setResults(json);
    }

    const handlePol = (pol) => {

        pol === 'Back' ? setFed('') : setFed(pol);
    }

    useEffect(() => {

    }, [results])

    return (
        <main className={classes.main}>
            {!fed.id ?
                <Paper className={classes.paper} style={{ background: 'transparent', boxShadow: 'none' }}>
                    <Typography variant='h5'>
                        Politician Search
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='politician'>Politician Name</InputLabel>
                            <Input
                                id='politician'
                                name='politician'
                                autoFocus
                                autoComplete='off'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='secondary'
                                style={{ background: 'transparent', boxShadow: 'none' }}
                            >
                                Search
                            </Button>
                        </FormControl>
                    </form>
                </Paper>
            :
                null
            }   
            {results.length > 0 && fed.length === 0 ? 
                <PoliticianList feds={results} handlePol={handlePol} gridNum={gridNum} search={true} />
            : 
                null
            }
            {fed.id  ? 
                <Politician fed={fed} handlePol={handlePol} />
            :
                null
            }
        </main>
    );
}

const styles = (theme) => ({
    
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
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
});

export default withStyles(styles)(PoliticianSearch);
