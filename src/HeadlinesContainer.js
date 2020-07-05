import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Divider, Tabs, Tab, } from '@material-ui/core';
import { NotificationImportant, AccessTime } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard';
import { isBrowser } from 'react-device-detect';


function HeadlinesContainer(props) {

  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState('Headlines');
  const { classes, user } = props;
  const gridNum = isBrowser ? 3 : 12;
  const articleCards = articles ? articles.map((article, i) =>
    <Grid item xs={gridNum} key={i}>
      <MediaCard save={user ? saveArticle : null} key={i} article={article}/> 
    </Grid>    
  ) : null;

  useEffect(() => {

    fetchArticles();
  }, []);

  const fetchArticles = async (topicArg = topic) => {

    const top = topicArg === 'Recent' ? 'everything' : 'top-headlines';
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/${top}`).then(r => r.json())

    console.log(json.articles)
    setArticles(json.articles)
  }

  const handleChange = async (event, change) => {

    const tempTopic = change === 'Recent' ? 'everything' : 'top-headlines';
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/${tempTopic}`).then(r => r.json());

    setArticles(json.articles);
    setTopic(tempTopic);
  }

  const saveArticle = (article) => {

    const newArticle = {
      title: article.title,
      author: article.author,
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
      description: article.description,
      user_id: user.user.id
    }

    fetch(`${process.env.REACT_APP_API_ROOT}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.jwt}`
      },
      body: JSON.stringify({
        article: newArticle,
        user_id: user.user.id
      }),
    });
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>
        { (user) ?
          <Tabs
            value={topic}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab icon={<NotificationImportant />} value={'Headlines'} label='Headlines' />
            <Tab icon={<AccessTime />} value={'Recent'} label='Recent' />
          </Tabs>
        :
          ''
        }
        <Typography variant='h2' align='center' gutterBottom>
          {topic}
        </Typography>
        <Divider />
        <Grid container spacing={10}>
          <Grid container spacing={10} justify='center'>
            {(articleCards) ? articleCards : null}
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

const styles = theme => console.log(theme) || ({

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
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  thumbnail: {
    height: 100,
    width: 100,
  },
});

export default withStyles(styles)(HeadlinesContainer);
