import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Paper } from '@material-ui/core';
import PoliticianContributions from './PoliticianContributions';
import PoliticianFinances from './PoliticianFinances';
import PoliticianEvents from './PoliticianEvents';
import PoliticianVotes from './PoliticianVotes';
import PoliticianIndustry from './PoliticianIndustry';
import PoliticianBills from './PoliticianBills';
import PoliticianNews from './PoliticianNews';
import PoliticianProfile from './PoliticianProfile';
import PoliticianTabs from './PoliticianTabs';
import { isBrowser } from 'react-device-detect';


function Politician(props) {

  const [finance, setFinance] = useState({});
  const [tab, setTab] = useState('Data');
  const [articles, setArticles] = useState([]);
  const [view, setView] = useState('');
  const [cycle, setCycle] = useState({});
  const [billPol, setBillPol] = useState('');
  const [vote, setVote] = useState([])
  const [contribs, setContribs] = useState();
  const [industry, setIndustry] = useState();
  const [bills, setBills] = useState();
  const [events, setEvents] = useState();
  const { classes, handlePol, fed, data } = props;
  const gridNum = isBrowser ? 3 : 12;

  const handleChange = (event, change) => {

    (change === 'Back') ?
      handlePol('Back')
    :
      setTab(change)
  }

  const handleView = () => {
    
    let display;

    switch(view){
      case 'votes':
        display = <PoliticianVotes votes={vote} gridNum={gridNum} handleBillPol={handleBillPol} />
        break
        case 'finance': 
          display = <PoliticianFinances finance={finance} cycle={cycle} />
          break
        case 'bills':
          display = <PoliticianBills bills={bills} gridNum={gridNum} handleBillPol={handleBillPol} />
          break
        case 'industry':
          display = <PoliticianIndustry industry={industry} />
          break
        case 'events':
          display = <PoliticianEvents events={events} gridNum={gridNum} />
          break
        case 'contribs':
          display = <PoliticianContributions contributions={contribs} />;
          break
      default: display = null
    }
    return display
  }

  const handleBillPol = (pol) => {

    (pol === 'Back') ?
      setBillPol('')
    :
      setBillPol(pol)
  }

  const handleBills = async () => {

    const id = data ? data.id.bioguide : fed.id.bioguide;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/bills/${id}`).then(r => r.json());

    setBills(json.results[0].bills);
    setView('bills');
  }

  const handleVotes = async () => {

    const id = data ? data.id.bioguide : fed.id.bioguide;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/votes/${id}`).then(r => r.json());

    setVote(json.results[0].votes);
    setView('votes');
  }

  const handleFinances = async () => {

    const id = data ? data.id.opensecrets : fed.id.opensecrets;
    console.log(id)
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/memPFDprofile&year=2014&output=json`).then(r => r.json());
    const json2 = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candSummary&output=json`).then(r => r.json());

    console.log(json)
    setFinance(json.response.member_profile);
    setCycle(json2.response.summary['@attributes']);
    setView('finance');
  }

  const handleEvents = async () => {
    
    const id = data ? data.id.opensecrets : fed.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/events/${id}`).then(r => r.json());

    setEvents(json.objects);
    setView('events');
  }

  const handleContribs = async () => {

    const id = data ? data.id.opensecrets : fed.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candContrib&output=json`).then(r => r.json());

    console.log(json)
    setContribs(json.response.contributors.contributor);
    setView('contribs');
  }

  const handleIndustry = async () => {

    const id = data ? data.id.opensecrets : fed.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candIndustry&output=json&cycle=2020`).then(r => r.json());
    setIndustry(json.response.industries.industry);
    setView('industry');
  }

  const fetchCongress = async () => {
    
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/congress`).then(r => r.json());
    const repIDS = json.filter(rep => rep.id.bioguide === (fed.id.bioguide || data.id.bioguide))[0]
    console.log(json)
    console.log(repIDS)
    if (repIDS) {
      const name = repIDS.id.wikipedia.split(' ').join('%20')
      const news = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/pol/${name}`).then(r => r.json());

     // setData(repIDS);
      setArticles(news.articles);
    } else {
      const name = fed.name.split(' ').join('%20');
      console.log(fed.name)
      console.log(name);
      const news = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/pol/${name}`).then(r => r.json());

      setArticles(news);
    }
  }
  console.log(data)
  useEffect(() => {

    fetchCongress();
  }, [])

  return (
    <main className={classes.main}>
      {tab === 'News' && articles.length > 0 ?
        <Paper className={classes.paper} style={{ background: 'transparent', boxShadow: 'none' }}>
          <PoliticianTabs tab={tab} handleChange={handleChange} />
          <PoliticianNews articles={articles} gridNum={gridNum} />
        </Paper>
      :
        <Card className={classes.paper} style={{ background: 'transparent', boxShadow: 'none' }} raised={true}>
          <PoliticianTabs tab={tab} handleChange={handleChange} />
          <PoliticianProfile fed={fed} data={data} handleView={handleView} handleFinances={handleFinances} handleVotes={handleVotes} handleContribs={handleContribs} handleBills={handleBills} handleEvents={handleEvents} handleIndustry={handleIndustry} />
        </Card>
      }
    </main>
  );
}

Politician.propTypes = {
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

export default withStyles(styles)(Politician);
