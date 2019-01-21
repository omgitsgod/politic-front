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

const styles = (theme) => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
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
    secs: {}
  }

  componentDidMount() {
    fetch('https://theunitedstates.io/congress-legislators/legislators-current.json').then(r => r.json()).then(x => {
      const repIDS = (x.filter(z => z.name.official_full === this.props.fed.name)[0])
      const id = process.env.REACT_APP_SECRETS_API_KEY
      if (repIDS) {
      const url = `https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=memPFDprofile&year=2019&cid=${repIDS.id.opensecrets}&output=json&apikey=${id}`
      fetch(url).then(r => r.json()).then(moneys => {
        const statey = {
          data: repIDS,
          secs: moneys.response.member_profile
        }
        const urly = `https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=candSummary&output=json&cid=${repIDS.id.opensecrets}&apikey=${id}`
        fetch(urly).then(r => r.json()).then(cycle => {
          statey.cycle = cycle.response.summary["@attributes"]
        const nextUrl = `https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=candContrib&cid=${repIDS.id.opensecrets}&output=json&apikey=${id}`
          fetch(nextUrl).then(r => r.json()).then(contribs => {
            statey.contribs = contribs.response.contributors.contributor
          const newyUrl = `https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=candIndustry&cid=${repIDS.id.opensecrets}&output=json&cycle=2018&apikey=${id}`
          fetch(newyUrl).then(r => r.json()).then(industry => {
            statey.industry = industry.response.industries.industry
          const  nowUrl = `https://api.propublica.org/congress/v1/members/${repIDS.id.bioguide}/votes.json`
          fetch(nowUrl,{
            headers: {
              Accept: "application/json",
              'X-API-KEY': "KG6Q8QpzWKZGgegNhwqsOOAIx3WqOLgVU4moQ7VO"
            }
          }).then(r => r.json()).then(votes => {
            statey.vote = votes.results[0].votes
            const lalaurl = `https://api.propublica.org/congress/v1/members/${repIDS.id.bioguide}/bills/cosponsored.json`
            fetch(lalaurl,{
              headers: {
                Accept: "application/json",
                'X-API-KEY': "KG6Q8QpzWKZGgegNhwqsOOAIx3WqOLgVU4moQ7VO"
              }
            }).then(r => r.json()).then(bills => {
              statey.bills = bills.results[0].bills
                this.setState(statey)
            })

          })

          })
          })

        })
        }) }

    })
  //  .then(fetch(`https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=memPFDprofile&year=2016&cid=N00007360&output=json&apikey=${process.env.REACT_APP_SECRETS_API_KEY}`).then(console.log))
  //const id = '8c4d690fde5d6a3a92a09231a877210d'
  //const url = `https://cors-anywhere.herokuapp.com/https://www.opensecrets.org/api/?method=memPFDprofile&year=2019&cid=N00027658&output=json&apikey=${id}`
  //fetch(url).then(r => r.json()).then(console.log)
  }
  render() {
  const { classes } = this.props;
  console.log(this.state.data)
  console.log(this.state);
  return (
    <main className={classes.main}>

    <Card className={classes.paper}
    raised='true'>
    <Button align='left' onClick={()=>this.props.handlePol("Back")}>
    Back
    </Button>
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
          {(this.state.secs.assets) ?
            <div>
            <Typography component="p" align='left'>
            Cash on hand: ${this.state.cycle.cash_on_hand}
            </Typography>
            <Typography component="p" align='left'>
            First Elected: ${this.state.cycle.first_elected}
            </Typography>
            <Typography component="p" align='left'>
            {this.state.secs["@attributes"].transaction_count} transactions recorded:
            </Typography>
            <Typography component="p" align='left'>
            Lowest: {this.state.secs["@attributes"].tx_low} | Highest: {this.state.secs["@attributes"].tx_high}
            </Typography>
            <Typography component="p" align='left'>
            Networth: ${this.state.secs["@attributes"].net_low} - ${this.state.secs["@attributes"].net_high}
            </Typography>
            <Typography variant="h5" align='left'>
            Assets
            </Typography>
            {this.state.secs.assets.asset.map(x => <div><Typography component="p" align='left'>{x["@attributes"].name}:</Typography><Typography component="p" align='left'>${x["@attributes"].holdings_low} - ${x["@attributes"].holdings_high}</Typography></div>)}
            <Typography variant="h5" align='left'>
            Contributors
            </Typography>
              {this.state.contribs.map(x => <div><Typography component="p" align='left'>{x["@attributes"].org_name}:</Typography><Typography component="p" align='left'>${x["@attributes"].total}</Typography></div>)}
              <Typography variant="h5" align='left'>
              By Industry
              </Typography>
                {this.state.industry.map(x => <div><Typography component="p" align='left'>{x["@attributes"].industry_name}:</Typography><Typography component="p" align='left'>${x["@attributes"].total}</Typography><Typography component="p" align='left'>Individuals: ${x["@attributes"].indivs} | PACS: ${x["@attributes"].pacs}</Typography></div>)}
                <Typography variant="h5" align='left'>
                Voting!
                </Typography>
                  {this.state.vote.map(x => <div><Typography component="p" align='left'>{x.bill.bill_id}: {x.description} </Typography><br /><br /><Typography component="p" align='left'>{x.question} | Voted: {x.position}</Typography><br /><Typography component="p" align='left'>Total: yes: {x.total.yes}/no: {x.total.no}/not voting:{x.total.not_voting}</Typography></div>)}
                  <Typography variant="h5" align='left'>
                  Bills!
                  </Typography>
                    {this.state.bills.map(x => <div><Typography component="p" align='left'>{x.bill_id}: {x.short_title} </Typography><br/></div>)}
            </div>
          :
        ""}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" >
          How do I vote?
        </Button>
        <Button size="small" color="primary">
          Who pays me?
        </Button>
      </CardActions>
    </Card>

    </main>
  );
}
}

Pol.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pol);
