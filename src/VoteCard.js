import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';


function VoteCard(props) {

  const { classes, vote } = props;

  return (
    <Card className={classes.card}
      style={{ opacity: '.7', boxShadow: 'none'}}
      raised={true}
    >
      <CardActionArea>
        <CardContent>
          {(vote.url) ?
            <a target='blank' href={vote.url} style={{ textDecoration: 'none', color: 'white' }}>
              <Typography gutterBottom variant='h5' component='p'>
                {vote.bill.title}
              </Typography>
              <Typography gutterBottom variant='h6' component='p'>
                {vote.question}?
              </Typography>

            </a>
          :
            <div>
              <Typography gutterBottom variant='h5' component='p'>
                {vote.bill.title}
              </Typography>
              <Typography gutterBottom variant='h6' component='p'>
                {vote.question}?
              </Typography>
            </div>
          }
        </CardContent>
        <br />
        <CardContent >
          {(vote.democratic) ?
            <div>
              <Typography component='p' align='right' color='secondary'>
                    Democrates Voted: {vote.democratic.majority_position}
              </Typography>
              <Typography component='p' align='right' color='error'>
                  Republicans Voted: {vote.republican.majority_position}
              </Typography>
            </div>
          :
            null
          }
          {(vote.position) ?
            <Typography variant='h6' align='right' color='secondary' >
              I voted {vote.position}
            </Typography>
          :
            null
          }
          <Typography variant='h5' align='right'  style={{color: 'green'}}>
            Yay: {vote.total.yes}
          </Typography>
          <br />
          <Typography variant='h5' align='right' color='error'>
            Nay: {vote.total.no}
          </Typography>
          <br />
          {(vote.result === 'Passed') || (vote.result === 'Cloture on the Motion to Proceed Passed') || ('Motion to Proceed Agreed to') ?
            <Typography variant='h5' align='center' color='secondary' >
              {vote.result}
            </Typography>
          :
            <Typography variant='h5' align='center' color='error' >
              {vote.result}
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
