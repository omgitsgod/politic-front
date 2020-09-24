import React from 'react';
import { Grid } from '@material-ui/core';
import ArticleCard from './ArticleCard';


function PoliticianNews(props) {

  const { articles } = props;

  return (
    <Grid container spacing={10} justify='center'>
      {articles.map(article => (
        <Grid item xs={12} sm={6} md={3} key={article.title}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PoliticianNews;
