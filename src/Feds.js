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

const styles = (theme) => ({
  card: {
    height: 400,
    maxWidth: 345,
     marginTop: theme.spacing.unit * 8,

  },
  media: {
    height: 200,
  },


});

class Feds extends Component {

  state = {
    data: ''
  }

  componentDidMount() {
    fetch('https://theunitedstates.io/congress-legislators/legislators-current.json').then(r => r.json()).then(x => this.setState({data: (x.filter(z => z.name.official_full === this.props.fed.name)[0])}))
  }
  render() {
  const { classes } = this.props;
  return (

    <Card className={classes.card}
    style={{ opacity: '.7', boxShadow: 'none'}}
    raised='true'>
      <CardActionArea>
      {(this.props.fed.photoUrl) ?
        <img src={this.props.fed.photoUrl} className={classes.media} /> :
         <img src='https://art.sdsu.edu/wp-content/uploads/2015/02/default-user-01.png' className={classes.media} />
      }
        <CardContent>

          <Typography gutterBottom variant="h5" component="h2" >
            {this.props.fed.name}
          </Typography>
          <Typography gutterBottom component="p" align='right'>
            {this.props.fed.office.name}
          </Typography>
          { (this.props.fed.party === "Democratic") ?
          <Typography component="p" align='right' color="secondary">
            {this.props.fed.party}
          </Typography>
          :
          <Typography component="p" align='right' color="error">
            {this.props.fed.party}
          </Typography>
        }
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" onClick={()=>this.props.handlePol(this.props.fed)}>
          More Info
        </Button>
        <Button size="small" color="primary" >
          Share
        </Button>
      </CardActions>

    </Card>

  );
}
}

Feds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feds);
