import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, Button, Typography, Paper, Tab, Tabs, Grid } from '@material-ui/core';
import MediaCard from './MediaCard';
import { KeyboardBackspace, Info, LineWeight } from '@material-ui/icons';
import ContriTable from './ContriTable';
import IndusTable from './IndusTable';
import AssetTable from './AssetTable';
import BillCard from './BillCard';
import EventCard from './EventCard';
import Pol2 from './Pol2';
import VoteCard from './VoteCard';
import { isBrowser } from 'react-device-detect';


function Pol(props) {

  const [data, setData] = useState({});
  const [secs, setSecs] = useState({});
  const [tab, setTab] = useState('Data');
  const [articles, setArticles] = useState([]);
  const [display, setDisplay] = useState('');
  const [cycle, setCycle] = useState({});
  const [billPol, setBillPol] = useState('');
  const [vote, setVote] = useState([])
  const [contribs, setContribs] = useState();
  const [industry, setIndustry] = useState();
  const [bills, setBills] = useState();
  const [events, setEvents] = useState();
  const { classes, handlePol, fed } = props;
  const gridNum = isBrowser ? 3 : 12;

  const handleChange = (event, change) => {

    (change === 'Back') ?
      handlePol('Back')
    :
      setTab(change)
  }

  const handleBillPol = (pol) => {

    (pol === 'Back') ?
      setBillPol('')
    :
      setBillPol(pol)
  }

  const handleBills = async () => {

    const id = data.id.bioguide;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/bills/${id}`).then(r => r.json());

    setBills(json.results[0].bills);
    setDisplay('bills');
  }

  const handleVotes = async () => {

    const id = data.id.bioguide;
    const json = await (`${process.env.REACT_APP_BACK_HOST}/votes/${id}`).then(r => r.json());

    setVote(json.results[0].votes);
    setDisplay('votes');
  }

  const handleFinances = async () => {

    const id = data.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/memPFDprofile&year=2020`).then(r => r.json());
    const json2 = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candSummary&output=json`).then(r => r.json());

    setSecs(json.response.member_profile);
    setCycle(json2.response.summary['@attributes']);
    setDisplay('secs');
  }

  const handleEvents = async () => {
    
    const id = data.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/events/${id}`).then(r => r.json());

    setEvents(json.objects);
    setDisplay('events');
  }

  const handleContribs = async () => {

    const id = data.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candContrib&output=json`)

    setContribs(json.response.contributors.contributor);
    setDisplay('contribs');
  }

  const handleIndustry = async () => {

    const id = data.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candIndustry&output=json&cycle=2020`).then(r => r.json());
    setIndustry(json.response.industries.industry);
    setDisplay('industry');
  }

  const fetchCongress = async () => {
    
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/congress`).then(r => r.json());
    const repIDS = (json.filter(rep => rep.id.bioguide === props.id)[0])

    if (repIDS) {
      const name = repIDS.id.wikipedia.split(' ').join('%20')
      const news = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/${name}`).then(r => r.json());

      setData(repIDS);
      setArticles(news.articles);
    } else {
      const name = fed.name.split(' ').join('%20');
      const news = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/${name}`).then(r => r.json());

      setArticles(news);
    }
  }

  useEffect(() => {

    fetchCongress();
  }, [])

  if (tab !== 'News') {
    return (
      <main className={classes.main}>
        <Card 
          className={classes.paper}
          style={{ background: 'transparent', boxShadow: 'none'}}
          raised='true'
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab icon={<KeyboardBackspace />} value={'Back'} label='Back' />
            <Tab icon={<Info />} value={'Data'} label='Info' />
            <Tab icon={<LineWeight />} value={'News'} label='News' />
          </Tabs>
          <CardActionArea>
            {(fed.photoUrl) ?
              <img src={fed.photoUrl} className={classes.media} /> 
            :
              <img src='https://art.sdsu.edu/wp-content/uploads/2015/02/default-user-01.png' className={classes.media} />
            }
            <CardContent>
              <Typography gutterBottom variant='h3' component='h2'>
                {fed.name}
              </Typography>
              <Typography component='p' align='right'>
                {fed.party}
              </Typography>
            </CardContent>
          </CardActionArea>
          {(data.id) ?
            <CardActions>
              <Button size='small' color='primary' onClick={handleFinances}>
                <Typography component='p' color='secondary'>
                  My Finances
                </Typography>
              </Button>
              <Button size='small' color='primary' onClick={handleVotes} >
                How do I vote?
              </Button>
              <Button size='small' color='primary' onClick={handleContribs}>
                <Typography component='p' color='secondary'>
                  Who pays me?
                </Typography>
              </Button>
              <Button size='small' color='primary' onClick={handleBills}>
                Bills Ive Sponsered
              </Button>
              <Button size='small' color='primary' onClick={handleEvents}>
                <Typography component='p' color='secondary'>
                  Events
                </Typography>
              </Button>
              <Button size='small' color='primary' onClick={handleIndustry}>
                <Typography component='p' color='secondary'>
                  Which Industries Own Me
                </Typography>
              </Button>
            </CardActions>
          :
            ''
          }
          <CardActionArea>
            {display === 'secs' ?
              <div>
                <Typography component='p' align='right'>
                  First Elected: {cycle.first_elected}
                </Typography>
                <Typography component='p' align='right'>
                  Cash on hand: ${cycle.cash_on_hand}
                </Typography>
                <Typography component='p' align='right'>
                  {secs['@attributes'].transaction_count} transactions recorded:
                </Typography>
                <Typography component='p' align='right'>
                  Lowest: {secs['@attributes'].tx_low} | Highest: {secs['@attributes'].tx_high}
                </Typography>
                <Typography component='p' align='right'>
                  Networth: ${secs['@attributes'].net_low} - ${secs['@attributes'].net_high}
                </Typography>
                <Typography variant='h5' align='center'>
                  Assets
                </Typography>
                <AssetTable assets={secs.assets.asset}/>
              </div>
            :
              ''
            }
            {display === 'contribs' ?
              <div>
                <Typography variant='h5' align='center'>
                  Contributors
                </Typography>
                <ContriTable contribs={contribs}/>
              </div>
            :
              ''
            }
            {display === 'events' ?
              <div>
                <Typography variant='h5' align='center'>
                  Events
                </Typography>
                <Grid container spacing={16}>
                  <Grid container spacing={32} justify='center'>
                    {events.map(event=> <Grid item xs={gridNum}> <EventCard event={event}/> </Grid>)}
                  </Grid>
                </Grid>
              </div>
            :
              ''
            }
            {display === 'industry' ?
              <div>
                <Typography variant='h5' align='center'>
                  By Industry
                </Typography>
                <IndusTable industry={industry}/>
              </div>
            :
              ''
            }
            {display === 'votes' ?
              <div>
                <Typography variant='h5' align='center'>
                  Voting!
                </Typography>
                <Grid container spacing={16}>
                  <Grid container spacing={32} justify='center'>
                    {vote.map(vote => <Grid item xs={gridNum}> <VoteCard vote={vote} handlePol={handleBillPol} /> </Grid>)}
                  </Grid>
                </Grid>
              </div>
            :
              ''
            }
            {display === 'bills' ?
              <div>
                <Typography variant='h5' align='center'>
                  Bills!
                </Typography>
                {(billPol.length === 0) ?
                  <Grid container spacing={16}>
                    <Grid container spacing={32} justify='center'>
                      {bills.map(bill => <Grid item xs={gridNum}> <BillCard bill={bill} handlePol={handleBillPol} /> </Grid>)}
                    </Grid>
                  </Grid>
                :
                  <Pol2 id={billPol} handlePol={handleBillPol}/>
                }
              </div>
            :
              ''
            }
          </CardActionArea>
          :
        </Card>
      </main>
    );
  } else if (articles.length > 0) {
    return (
      <main className={classes.main}>
        <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab icon={<KeyboardBackspace />} value={'Back'} label='Back' />
            <Tab icon={<Info />} value={'Data'} label='Info' />
            <Tab icon={<LineWeight />} value={'News'} label='News' />
          </Tabs>
          <Grid container spacing={16}>
            <Grid container spacing={32} justify='center'>
              {articles.map(article =>
                <Grid item xs={gridNum}>
                  <MediaCard article={article}/>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </main>
    );
  }
}

Pol.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(8)
  },
  media: {
    height: 200,
  },
});

export default withStyles(styles)(Pol);
