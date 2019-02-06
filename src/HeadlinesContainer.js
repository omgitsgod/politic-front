import React, { Component } from 'react';
import { Paper, Typography, Grid, Divider, Tabs, Tab, } from '@material-ui/core'
import { NotificationImportant, Favorite, AccessTime } from '@material-ui/icons'
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
    articles: [],
    topic: 'Headlines'
  }
  handleChange = (event, change) => {

    if (change === "Recent") {
  fetch(`https://newsapi.org/v2/everything?sources=politico&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(json => this.setState({articles: json.articles, topic: change}))
} else if ( change === "Headlines") {
  fetch(`https://newsapi.org/v2/top-headlines?sources=politico&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(json => this.setState({articles: json.articles, topic: change}))
}
}

  saveArticle = (article) => {

    const newArticle = {
      title: article.title,
      author: article.author,
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
      description: article.description,
      user_id: this.props.user.user.id
    }
    HEADERS.Authorization = `Bearer ${this.props.user.jwt}`
    fetch(`${API_ROOT}/articles`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({article: newArticle, user_id: this.props.user.user.id}),
    })
  }

  componentDidMount() {
    if (this.state.topic === "Headlines") {
    fetch(`https://newsapi.org/v2/top-headlines?sources=politico&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(json => this.setState({articles: json.articles}))
  } else if (this.state.topic === "Recent") {
   fetch(`https://newsapi.org/v2/everything?sources=politico&apiKey=${process.env.REACT_APP_POLITICO_API_KEY}`).then(r => r.json()).then(json => this.setState({articles: json.articles}))
 }
  }
  render() {
    const { classes } = this.props
    let x
  if  (this.props.user) {
   x =  this.state.articles.map(article =>
    <Grid item xs={3}>
    <MediaCard  save={this.saveArticle} article={article}/>
    </Grid>
  )
} else if (!this.props.user && this.state.articles[0]) {
   x =  this.state.articles.map(article =>
    <Grid item xs={3}>
    <MediaCard article={article}/>
    </Grid>
  )
}
  console.log(this.props.id)
    return (
      <main className={classes.main}>
      <Paper className={classes.paper} style={{background: 'transparent', boxShadow: 'none'}}>{
        (this.props.user) ?
      <Tabs
        value={this.state.topic}
       onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<NotificationImportant />} value={"Headlines"} label="Headlines" />
        <Tab icon={<AccessTime />} value={"Recent"} label="Recent" />

      </Tabs>
      :
      ''
    }
    <Typography variant='display2' align='center' gutterBottom>
      {this.state.topic}
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
