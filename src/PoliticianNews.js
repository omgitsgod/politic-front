import React from 'react';
import { Grid } from '@material-ui/core';
import ArticleCard from './MediaCard';


function PoliticianNews(props) {

  const { articles, gridNum } = props;

  return (
    <Grid container spacing={10}>
      <Grid container spacing={10} justify='center'>
        {articles.map(article => (
          <Grid item xs={gridNum} key={article.title}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default PoliticianNews;
