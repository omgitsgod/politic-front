import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography, Icon, Divider } from '@material-ui/core';
import HowToVote from '@material-ui/icons/HowToVote';


function VoteCard(props) {

  const { classes, vote } = props;
  console.log(vote)
  return (
    <Card className={classes.card}
      style={{ opacity: '.7', boxShadow: 'none'}}
      raised={true}
    >
      <CardActionArea>
        <CardContent>
          <a target='blank' href={vote.url ? vote.url : null} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography gutterBottom variant='h5' component='p'>
              {vote.bill.number}
            </Typography>
            <br />
            <Typography gutterBottom variant='h6' component='p'>
              {vote.question}?
            </Typography>
          </a>
        </CardContent>
        <Divider />
        <CardContent >
            <Typography gutterBottom align='right' component='p'>
              {vote.bill.title ? vote.bill.title : null}
            </Typography>
          {(vote.position) ?
            <Typography variant='h6' align='left' color='primary' >
              I voted {vote.position}
            </Typography>
          :
            null
          }
          <Typography variant='h6' align='right' color='white'>
            Yea: {vote.total.yes}
          </Typography>
          <br />
          <Typography variant='h6' align='right' color='primary'>
            Nay: {vote.total.no}
          </Typography>
          <br />
          {(vote.result === 'Passed') || (vote.result === 'Cloture on the Motion to Proceed Passed') || ('Motion to Proceed Agreed to') ?
            <Typography variant='h5' align='center' color='white' >
              {vote.result}
            </Typography>
          :
            <Typography variant='h5' align='center' color='primary' >
              {vote.result}
            </Typography>
          }
          <a target='blank' href={vote.url ? vote.url : null} style={{ textDecoration: 'none', color: 'white' }}>
            <Icon
              color='secondary'
              fontSize='large'
              style={{ padding: 7, color: 'white' }}
            >
              <HowToVote fontSize='large'/>
            </Icon>
          </a>
          <br />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

VoteCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({

  card: {
    maxWidth: 345,
    marginTop: theme.spacing(8)
  },
  media: {
    height: 200,
  },
});

export default withStyles(styles)(VoteCard);
