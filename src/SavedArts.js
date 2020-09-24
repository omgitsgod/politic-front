import React, { useState, useEffect } from 'react';
import { Paper, Typography,  Grid, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArticleCard from './ArticleCard';


function SavedArticles(props) {

  const [articles, setArticles] = useState([]);
  const { classes, user } = props;

  const fetchSavedArticles = async () => {

    if (user) {
      const json = await fetch(`${process.env.REACT_APP_API_ROOT}/articles`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      }).then((r) => r.json());
      const filteredArticles = json.filter(
        (article) => article.user_id === user.user.id
      );

      setArticles(filteredArticles);
    }
  }

  useEffect(() => {

    fetchSavedArticles()
  }, []);

  return (
    <main className={classes.main}>
      <Paper
        className={classes.paper}
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Typography variant='h5' align='center' gutterBottom>
          Saved Articles
        </Typography>
        <Divider />
        <Grid container spacing={10} justify='center'>
          {articles ? articles.map((article) => (
            <Grid item xs={12} sm={6} md={3} >
              <ArticleCard article={article} />
            </Grid>))
          : 
            null
          }
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

export default withStyles(styles)(SavedArticles);
