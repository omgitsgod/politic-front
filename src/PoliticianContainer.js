import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PoliticianList from './PoliticianList';
import Politician from './Politician';
import { isBrowser } from 'react-device-detect';


function PoliticanContainer(props) {
  
  const [feds, setFeds] = useState([]);
  const [fed, setFed] = useState('');
  const { classes, address } = props;
  const gridNum = isBrowser ? 3 : 12;

  const handlePol = (pol) => {

    console.log(pol)
    pol === 'Back' ? setFed('') : setFed(pol);
  }

  const fetchReps = async () => {

    const zip = address || 20001;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/reps/${zip}`).then(r => r.json());
    const officials = json.officials;
    const state = json.normalizedInput.state;
    
    setFeds(officials);
    console.log(officials)
    console.log(state)
  }


  useEffect(() => {

    fetchReps();
  }, []);
  
  return (
    <main className={classes.main}>
      {fed.length === 0 ? (
        <PoliticianList feds={feds} gridNum={gridNum} handlePol={handlePol} />
      ) : (
        <Politician fed={fed} handlePol={handlePol} data={fed.data} />
      )}
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

export default withStyles(styles)(PoliticanContainer);
