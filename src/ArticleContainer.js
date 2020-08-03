import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Divider, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArticleCard from './ArticleCard';
import { isBrowser } from 'react-device-detect';


function ArticleContainer(props) {

  const [articles, setArticles] = useState([]);
  const { classes, user } = props;
  const gridNum = isBrowser ? 3 : 12;

  useEffect(() => {

    fetchArticles();
  }, []);

  const fetchArticles = async () => {

    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/news/everything`).then(r => r.json());

    setArticles(json.articles)
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
        <Typography variant='h2' align='center' gutterBottom>
          Recent News
        </Typography>
        <Divider />
        <Grid container spacing={10}>
          <Grid container spacing={10} justify='center'>
            {articles && articles.length > 0 ? articles.map((article, i) =>
              <Grid item xs={gridNum} key={i}>
                <ArticleCard save={user ? saveArticle : null} key={i} article={article}/> 
              </Grid>) 
            :
              <CircularProgress className={classes.loading}size={200} />
            }
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

const styles = theme => ({

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
  loading: {
    marginTop: '20%',
  },
});

export default withStyles(styles)(ArticleContainer);
