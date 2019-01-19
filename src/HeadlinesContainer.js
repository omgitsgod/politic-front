import React, { Component } from 'react';
import { Paper, Typography, Grid, Divider} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MediaCard from './MediaCard'
import { API_ROOT, HEADERS } from './constants';

const styles = theme => console.log(theme) || ({
main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    thumbnail: {
      height: 100,
      width: 100,

    }

})
export default withStyles(styles) (
class HeadlinesContainer extends Component {

  state = {
    articles: []
  }

  saveArticle = (article) => {

    const newArticle = {
      title: article.title,
      author: article.author,
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
      description: article.description,
      user_id: 4
    }

    fetch(`${API_ROOT}/articles`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({newArticle})
    })
  }

  componentDidMount() {
    fetch(`https://newsapi.org/v2/top-headlines?sources=politico&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(json => this.setState({articles: json.articles}))
  }
  render() {
    const { classes } = this.props
  const x =  this.state.articles.map(article =>
    <Grid item xs={3}>
    <MediaCard save={this.saveArticle} article={article}/>
    </Grid>
  )
  console.log(this.props.id)
    return (
      <main className={classes.main}>
      <Paper className={classes.paper}>

    <Typography variant='display2' align='center' gutterBottom>
      Headlines
      </Typography>
      <Divider />
      <Grid container spacing={16}>
      <Grid container spacing={32} justify='center'>
      {x}
      </Grid>
      </Grid>
      </Paper>
      </main>
    );
  }
}
)
