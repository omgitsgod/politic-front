import React, { useState, useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import PoliticianList from './PoliticianList';
import Politician from './Politician';
import ZipCodeModal from './ZipCodeModal';


function PoliticanContainer(props) {
  
  const [feds, setFeds] = useState([]);
  const [openZip, setOpenZip] = useState(true);
  const [zip, setZip] = useState(localStorage.getItem('zip'));
  const [fed, setFed] = useState('');
  const { classes } = props;

  const handlePol = (pol) => {

    pol === 'Back' ? setFed('') : setFed(pol);
  }

  const fetchReps = useCallback(async () => {

    const actionZip = zip || 10005;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/reps/${actionZip}`)
      .then(r => r.json())
      .catch(() => console.log("error"))

    if (json?.officials) {
      const officials = json.officials;
    
      setFeds(officials);
    }
  }, [zip])

  const handleSetZip = (inputedZip) => {
    if (inputedZip === 'reset') {
      localStorage.removeItem('zip')
      setZip(undefined);
    } else {
      localStorage.setItem('zip', inputedZip)
      setZip(inputedZip)
    }
  }

  useEffect(() => {

    fetchReps();
  }, [fetchReps, zip, fed]);

  return (
    <main className={classes.main}>
      {zip ?
        fed.length === 0 && feds.length > 0 ? 
          <PoliticianList feds={feds} handlePol={handlePol} district='' setZip={handleSetZip}/>
        : 
          fed && fed.name.length > 0 ?
            <Politician fed={fed} handlePol={handlePol} data={fed.data} />
          :
            <CircularProgress className={classes.loading}size={200} />
      :
        <ZipCodeModal open={openZip} setOpen={setOpenZip} setZip={handleSetZip} fetchReps={fetchReps} />
      }
    </main>
  );
}

const styles = theme => ({

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
  loading: {
    marginTop: '20%',
  },
});

export default withStyles(styles)(PoliticanContainer);
