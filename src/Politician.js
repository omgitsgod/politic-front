import React, { useState, useEffect, useCallback } from 'react';
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
        display = <PoliticianVotes votes={vote} pol={billPol} handleBillPol={handleBillPol} />
        break
        case 'finance': 
          display = <PoliticianFinances finance={finance} cycle={cycle} />
          break
        case 'bills':
          display = <PoliticianBills bills={bills} handleBillPol={handleBillPol} />
          break
        case 'industry':
          display = <PoliticianIndustry industry={industry} />
          break
        case 'events':
          display = <PoliticianEvents events={events} />
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
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/memPFDprofile&year=2014&output=json`).then(r => r.json());
    const json2 = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candSummary&output=json`).then(r => r.json());

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

    setContribs(json.response.contributors.contributor);
    setView('contribs');
  }

  const handleIndustry = async () => {

    const id = data ? data.id.opensecrets : fed.id.opensecrets;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/finance/${id}/candIndustry&output=json&cycle=2020`).then(r => r.json());
    setIndustry(json.response.industries.industry);
    setView('industry');
  }

  const fetchCongress = useCallback(async () => {
    
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/congress`).then(r => r.json());
    const repIDS = json.filter(rep => rep.id.bioguide === (data ? data.id.bioguide : fed.id.bioguide))[0]
    if (repIDS) {
      const name = repIDS.id.wikipedia.split(' ').join('%20')
      const news = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/pol/${name}`).then(r => r.json());

     // setData(repIDS);
      setArticles(news.articles);
    } else {
      const name = fed.name.split(' ').join('%20');
      const news = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/pol/${name}`).then(r => r.json());

      setArticles(news);
    }
  }, [data, fed.id.bioguide, fed.name])

  const profileOnClickActions = {
    handleFinances,
    handleVotes,
    handleContribs,
    handleBills,
    handleEvents,
    handleIndustry,
  };

  useEffect(() => {

    fetchCongress();
  }, [fetchCongress])

  return (
    <main className={classes.main}>
      {tab === 'News' && articles.length > 0 ? (
        <Paper
          className={classes.paper}
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <PoliticianTabs tab={tab} handleChange={handleChange} />
          <PoliticianNews articles={articles} />
        </Paper>
      ) : (
        <Card
          className={classes.paper}
          style={{ background: 'transparent', boxShadow: 'none' }}
          raised={true}
        >
          <PoliticianTabs tab={tab} handleChange={handleChange} />
          <PoliticianProfile
            fed={fed}
            data={data}
            handleView={handleView}
            onClickActions={profileOnClickActions}
          />
        </Card>
      )}
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
