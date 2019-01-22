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

class Pol extends Component {

  state = {
    data: {},
    open: {},
    secs: {},
    tab: 'Data',
    articles: [],
    display: '',
    cycle: {}
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
      const repIDS = (x.filter(z => z.name.official_full === this.props.fed.name)[0])
      if (repIDS) {

              const namey = repIDS.id.wikipedia.split(" ").join("%20")
            fetch(`https://newsapi.org/v2/everything?sources=politico&q=${namey}&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(news => {
              this.setState({
                data: repIDS,
                articles: news.articles})})}
                else {
                  const namey = this.props.fed.name.split(" ").join("%20")
                fetch(`https://newsapi.org/v2/everything?sources=politico&q=${namey}&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(news => {
                  this.setState({
                    articles: news.articles})})
                }
              }
              )
}
  render() {
  const { classes } = this.props;
  console.log(this.state.data)
  console.log(this.state);
  if (this.state.tab !== "News") {
  return (
    <main className={classes.main}>

    <Card className={classes.paper}
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
      {(this.props.fed.photoUrl) ?
        <img src={this.props.fed.photoUrl} className={classes.media} /> :
         <img src='https://art.sdsu.edu/wp-content/uploads/2015/02/default-user-01.png' className={classes.media} />
      }
        <CardContent>

          <Typography gutterBottom variant="h3" component="h2">
            {this.props.fed.name}
          </Typography>

          <Typography component="p" align='right'>
            {this.props.fed.party}
          </Typography>
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
            {this.state.secs.assets.asset.map(x => <div><Typography component="p" align='center'>{x["@attributes"].name}:</Typography><Typography component="p" align='center'>${x["@attributes"].holdings_low} - ${x["@attributes"].holdings_high}</Typography></div>)}
            </div>
      :
    ''}
    {this.state.display === "contribs" ?
    <div>
    <Typography variant="h5" align='center'>
            Contributors
            </Typography>
              {this.state.contribs.map(x => <div><Typography component="p" align='center'>{x["@attributes"].org_name}:</Typography><Typography component="p" align='center'>${x["@attributes"].total}</Typography></div>)}
    </div>
    :
    ''}
    {this.state.display === "industry" ?
    <div>
    <Typography variant="h5" align='center'>
            By Industry
            </Typography>
              {this.state.industry.map(x => <div><Typography component="p" align='center'>{x["@attributes"].industry_name}:</Typography><Typography component="p" align='center'>Total: ${x["@attributes"].total}</Typography><Typography component="p" align='center'>Individuals: ${x["@attributes"].indivs} | PACS: ${x["@attributes"].pacs}</Typography></div>)}
    </div>
    :
    ''}
    {this.state.display === "votes" ?
    <div>
    <Typography variant="h5" align='center'>
              Voting!
              </Typography>
                {this.state.vote.map(x => <div><br /><Typography component="p" align='center'>{x.bill.bill_id}: {x.description} </Typography><br /><Typography component="p" align='center'>{x.question} | Voted: {x.position}</Typography><br /><Typography component="p" align='center'>Total: yes: {x.total.yes}/no: {x.total.no}/not voting:{x.total.not_voting}</Typography></div>)}

    </div>
    :
    ''}
    {this.state.display === "bills" ?
    <div>
    <Typography variant="h5" align='center'>
                  Bills!
                  </Typography>
                    {this.state.bills.map(x => <div><Typography component="p" align='center'>{x.bill_id}: {x.short_title} </Typography><br/></div>)}
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
    <Paper className={classes.paper}>
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

Pol.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pol);
