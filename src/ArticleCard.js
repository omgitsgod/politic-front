import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@material-ui/core';


function ArticleCard(props) {

  const { classes, article, save } = props;

  return (
    <Card className={classes.card}
      style={{opacity: '.7', boxShadow: 'none'}}
      raised={true}
    >
      <CardActionArea>
        <img src={article.urlToImage} className={classes.media} alt='article'/>
        <CardContent>
          <a target='blank' href={article.url} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography gutterBottom variant='h5' component='h2'>
              {article.title}
            </Typography>
          </a>
          <Typography component='p' align='right'>
            {article.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      {(save) ?
      <CardActions>
        <Button size='small' color='primary' onClick={() => save(article)}>
          Save
        </Button>
        <Button size='small' color='primary' disabled={true}>
          Share
        </Button>
      </CardActions>
      :
        null
      }
    </Card>
  );
}

ArticleCard.propTypes = {
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

export default withStyles(styles)(ArticleCard);
