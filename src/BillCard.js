import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography, Icon, Divider } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';


function BillCard(props) {

  const { classes, bill, handlePol } = props;

  return (
    <Card className={classes.card} style={{ opacity: '.7', boxShadow: 'none'}} raised={true}>
      <CardActionArea>
        <CardContent>
          <Typography component='p' align='center' variant='h6'>
            {bill.committees}
          </Typography>
          <Divider />
          <br />
          <Typography component='p' align='right' onClick={()=> handlePol(bill.sponsor_id)}>
            Sponsored By: 
          </Typography>
          <Typography component='p' align='right' onClick={()=> handlePol(bill.sponsor_id)}>
            {bill.sponsor_title} {bill.sponsor_name}
          </Typography>
          {(bill.sponsor_party === 'D') ?
            <Typography component='p' align='right' color='secondary'>
              {bill.sponsor_state} - {bill.sponsor_party}
            </Typography>
          :
            <Typography component='p' align='right' color='error'>
              {bill.sponsor_state} - {bill.sponsor_party}
            </Typography>
          }
          <br />
          <a target='blank' href={bill.govtrack_url} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography gutterBottom  component='p'>
              {bill.short_title.length > 200 ? bill.short_title.slice(0, 199) + '...': bill.short_title}
            </Typography>
            <Icon
              color='secondary'
              fontSize='large'
              style={{ padding: 7 }}
            >
              <SubjectIcon fontSize='large'/>
            </Icon>
          </a>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

BillCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({

  card: {
    maxWidth: 345,
    marginTop: theme.spacing(8),
    border: '2px solid #000',
  },
  media: {
    height: 200,
  },
});

export default withStyles(styles)(BillCard);
