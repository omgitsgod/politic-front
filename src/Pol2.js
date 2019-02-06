import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { Tab, Tabs, Grid } from '@material-ui/core'
import MediaCard from './MediaCard'
import { KeyboardBackspace, Info, LineWeight } from '@material-ui/icons'
import ContriTable from './ContriTable'
import IndusTable from './IndusTable'
import AssetTable from './AssetTable'
import BillCard from './BillCard'
import EventCard from './EventCard'
import VoteCard from './VoteCard'

const styles = (theme) => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  card: {
    maxWidth: 345,
     marginTop: theme.spacing.unit * 8
  },
  media: {
    height: 200,
  },


});

class Pol2 extends Component {

  state = {
    data: {},
    open: {},
    secs: {},
    tab: 'Data',
    articles: [],
    display: '',
    cycle: {},
    billPol: ''
  }

  handleChange = (event, change) => {
    if (change === "Back") {
      this.props.handlePol("Back")
    } else {
    this.setState({
      tab: change
    })
  }
  }

  handleBillPol = (pol) => {
    if (pol === "Back") {
      this.setState({billPol: ''})
    } else {
  this.setState({billPol: pol})
  }
  }

  handleBills = () => {

            fetch(`https://api.propublica.org/congress/v1/members/${this.state.data.id.bioguide}/bills/cosponsored.json`,{
              headers: {
                Accept: "application/json",
                'X-API-KEY': process.env.REACT_APP_PROPUB_API_KEY
              }
            }).then(r => r.json()).then(bills => this.setState({bills: bills.results[0].bills, display: 'bills'}))
}

  handleVotes = () => {

          fetch(`https://api.propublica.org/congress/v1/members/${this.state.data.id.bioguide}/votes.json`,{
            headers: {
              Accept: "application/json",
              'X-API-KEY': process.env.REACT_APP_PROPUB_API_KEY
            }
          }).then(r => r.json()).then(votes => this.setState({vote: votes.results[0].votes, display: 'votes'}))
}

  handleFinances = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=memPFDprofile&year=2019&cid=${this.state.data.id.opensecrets}&output=json&apikey=${process.env.REACT_APP_SECRETS_API_KEY}`)
      .then(r => r.json()).then(moneys =>
        fetch(`https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=candSummary&output=json&cid=${this.state.data.id.opensecrets}&apikey=${process.env.REACT_APP_SECRETS_API_KEY}`)
        .then(r => r.json()).then(cycle => this.setState({secs: moneys.response.member_profile, cycle: cycle.response.summary["@attributes"], display: 'secs'})) )

  }
  handleEvents = () => {
    fetch(`https://cors-anywhere.herokuapp.com/http://politicalpartytime.org/api/v1/event/?beneficiaries__crp_id=${this.state.data.id.opensecrets}&format=json`)
    .then(r => r.json()).then(events => this.setState({events: events.objects, display: 'events'}))
  }

  handleContribs = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=candContrib&cid=${this.state.data.id.opensecrets}&output=json&apikey=${process.env.REACT_APP_SECRETS_API_KEY}`)
    .then(r => r.json()).then(contribs => this.setState({contribs: contribs.response.contributors.contributor, display: 'contribs'}))
  }

  handleIndustry = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=candIndustry&cid=${this.state.data.id.opensecrets}&output=json&cycle=2018&apikey=${process.env.REACT_APP_SECRETS_API_KEY}`)
    .then(r => r.json()).then(industry => this.setState({industry: industry.response.industries.industry, display: 'industry'}))
  }

  componentDidMount() {
    fetch('https://theunitedstates.io/congress-legislators/legislators-current.json').then(r => r.json()).then(x => {
      const repIDS = (x.filter(z => z.id.bioguide === this.props.id)[0])
      if (repIDS) {

              const namey = repIDS.id.wikipedia.split(" ").join("%20")
            fetch(`https://newsapi.org/v2/everything?sources=politico&q=${namey}&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(news => {
              this.setState({
                data: repIDS,
                articles: news.articles,
                name: repIDS.name.official_full})})}

              }
              )
}
  render() {
  const { classes } = this.props;
  console.log(this.state.data)
  console.log(this.state);
  console.log(this.state.name);
  if (this.state.tab !== "News") {

  return (
    <main className={classes.main}>

    <Card className={classes.paper}
    style={{ background: 'transparent', boxShadow: 'none'}}
    raised='true'>
    <Tabs
      value={this.state.tab}
     onChange={this.handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<KeyboardBackspace />} value={"Back"} label="Back" />
      <Tab icon={<Info />} value={"Data"} label="Info" />
      <Tab icon={<LineWeight />} value={"News"} label="News" />

    </Tabs>

      <CardActionArea>
      {(this.props.fed) ?
        <img src={this.props.fed.photoUrl} className={classes.media} /> :
         <img src='https://art.sdsu.edu/wp-content/uploads/2015/02/default-user-01.png' className={classes.media} />
      }

      <CardContent>
      <Typography gutterBottom variant="h3" component="h2">
        {this.state.name}

      </Typography>
      {(this.state.cycle.party === "D") ?
      <Typography component="p" align='right'>

        Democratic
      </Typography>
      :
      <Typography component="p" align='right'>

        Republican
      </Typography>
    } {(this.state.data.terms) ?
    <Typography component="p" align='right'>
    {this.state.data.terms[0].type} from {this.state.data.terms[0].state}
    </Typography>
    :
    null
}
      </CardContent>
      </CardActionArea>

        {(this.state.data.id) ?
        <CardActions>
        <Button size="small" color="primary" onClick={this.handleFinances}>
        <Typography component="p" color="secondary">
          My Finances
          </Typography>
        </Button>
          <Button size="small" color="primary" onClick={this.handleVotes} >
            How do I vote?
          </Button>
          <Button size="small" color="primary" onClick={this.handleContribs}>
          <Typography component="p" color="secondary">
            Who pays me?
            </Typography>
          </Button>
          <Button size="small" color="primary" onClick={this.handleBills}>
            Bills Ive Sponsered
          </Button>
          <Button size="small" color="primary" onClick={this.handleEvents}>
          <Typography component="p" color="secondary">
            Events
            </Typography>
          </Button>
          <Button size="small" color="primary" onClick={this.handleIndustry}>
          <Typography component="p" color="secondary">
            Which Industries Own Me
            </Typography>
          </Button>
        </CardActions>
        :
        ''
      }
          <CardActionArea>
        {this.state.display === "secs" ?
        <div>
        <Typography component="p" align='center'>
        First Elected: {this.state.cycle.first_elected}
        </Typography>
        <Typography component="p" align='center'>
            Cash on hand: ${this.state.cycle.cash_on_hand}
            </Typography>
        <Typography component="p" align='center'>
            {this.state.secs["@attributes"].transaction_count} transactions recorded:
            </Typography>
            <Typography component="p" align='center'>
            Lowest: {this.state.secs["@attributes"].tx_low} | Highest: {this.state.secs["@attributes"].tx_high}
            </Typography>
            <Typography component="p" align='center'>
            Networth: ${this.state.secs["@attributes"].net_low} - ${this.state.secs["@attributes"].net_high}
            </Typography>
            <Typography variant="h5" align='center'>
            Assets
            </Typography>
          <AssetTable assets={this.state.secs.assets.asset}/>
            </div>
      :
    ''}
    {this.state.display === "contribs" ?
    <div>
    <Typography variant="h5" align='center'>
            Contributors
            </Typography>
              <ContriTable contribs={this.state.contribs}/>
    </div>
    :
    ''}
    {this.state.display === "events" ?
    <div>
    <Typography variant="h5" align='center'>
            Events
            </Typography>
            <Grid container spacing={16}>
            <Grid container spacing={32} justify='center'>
            {this.state.events.map(event=> <Grid item xs={3}> <EventCard event={event}/> </Grid>)}
              </Grid>
              </Grid>
    </div>
    :
    ''}
    {this.state.display === "industry" ?
    <div>
    <Typography variant="h5" align='center'>
            By Industry
            </Typography>
              <IndusTable industry={this.state.industry}/>
    </div>
    :
    ''}
    {this.state.display === "votes" ?
    <div>
    <Typography variant="h5" align='center'>
              Voting!
              </Typography>
              <Grid container spacing={16}>
              <Grid container spacing={32} justify='center'>
                {this.state.vote.map(vote => <Grid item xs={3}> <VoteCard vote={vote} handlePol={this.handleBillPol} /> </Grid>)}
                </Grid>
                </Grid>

    </div>
    :
    ''}
    {this.state.display === "bills" ?
    <div>
    <Typography variant="h5" align='center'>
                  Bills!
                  </Typography>
                  {(this.state.billPol.length === 0) ?
                  <Grid container spacing={16}>
                  <Grid container spacing={32} justify='center'>


                {this.state.bills.map(bill => <Grid item xs={3}> <BillCard bill={bill} handlePol={this.handleBillPol} /> </Grid>)}
                </Grid>
                </Grid>
                :
                <Pol2 id={this.state.billPol} handlePol={this.handleBillPol}/>
              }
    </div>
    :
    ''}
      </CardActionArea>
      :


    </Card>

    </main>
  );
} else if (this.state.articles.length > 0) {
  return (
    <main className={classes.main}>
    <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
    <Tabs
      value={this.state.tab}
     onChange={this.handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<KeyboardBackspace />} value={"Back"} label="Back" />
      <Tab icon={<Info />} value={"Data"} label="Info" />
      <Tab icon={<LineWeight />} value={"News"} label="News" />

    </Tabs>
    <Grid container spacing={16}>
    <Grid container spacing={32} justify='center'>
    {this.state.articles.map(article =>
    <Grid item xs={3}>
    <MediaCard  save={this.saveArticle} article={article}/>
    </Grid>
  )}

    </Grid>
    </Grid>
    </Paper>
    </main>

  )

}
}
}

Pol2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pol2);
