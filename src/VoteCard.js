import React from 'react';
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
    maxWidth: 345,
     marginTop: theme.spacing.unit * 8
  },
  media: {
    height: 200,
  },


});

function VoteCard(props) {
  const { classes } = props;
  console.log(props.article)
  return (

    <Card className={classes.card}
    style={{ opacity: '.7', boxShadow: 'none'}}
    raised='true'>

    <CardActionArea>
    <CardContent>
    {(props.vote.url) ?
    <a target='blank' href={props.vote.url} style={{ textDecoration: 'none', color: 'white' }}>
    <Typography gutterBottom variant="title" component="p">
    Bill:  {props.vote.bill.title}
    </Typography>
    <Typography gutterBottom variant="title" component="p">
      {props.vote.question}?
    </Typography>

    </a>
    :
    <div>
    <Typography gutterBottom variant="title" component="p">
    Bill:  {props.vote.bill.title}
    </Typography>
    <Typography gutterBottom variant="title" component="p">
      {props.vote.question}?
    </Typography>
    </div>
  }
    </CardContent>
    <br />
<CardContent >
{(props.vote.democratic) ?
  <div>
<Typography component="p" align='right' color='secondary'>
      Democrates Voted: {props.vote.democratic.majority_position}
</Typography>
<Typography component="p" align='right' color='error'>
    Republicans Voted: {props.vote.republican.majority_position}
</Typography>
</div>
:
''
}
<Typography component="p" align='center'  >
Didnt Bother To Vote: {props.vote.total.not_voting}
</Typography>

<Typography variant="h5" align='right'  style={{color: 'green'}}>
Yay: {props.vote.total.yes}
</Typography>
    <Typography variant="h5" align='right' color="center" color="error">
    Nay: {props.vote.total.no}
    </Typography>
    <br />

  {  (props.vote.result === "Passed") || (props.vote.result === "Cloture on the Motion to Proceed Passed") || ("Motion to Proceed Agreed to")?
    <Typography variant="h5" align='center' color="secondary" >
      {props.vote.result}
    </Typography>
    :
    <Typography variant="h5" align='center' color="error" >
        {props.vote.result}
    </Typography>
  }

  <br />
    </CardContent>
    </CardActionArea>

    </Card>

  );
}

VoteCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VoteCard);
