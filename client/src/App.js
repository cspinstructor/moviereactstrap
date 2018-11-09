import React, { Component } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      movies: [
        { poster: '', title: 'hello world', year: '2018', plot: 'Paul plot' }
      ]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getAllMovies = () => {
    axios
      .get('/getallmovies')
      .then(result => {
        this.setState({ movies: result.data });
        console.log(this.state.movies);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllMovies();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });
    //console.log(this.state.title);

    const query = `/getmovie?title=${this.state.title}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeMovie(title) {
    this.setState({
      movies: this.state.movies.filter(movie => {
        if (movie.title !== title) return movie;
      })
    });
    const query = `/deletemovie?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Jumbotron>
            <h1 className="display-4">Movie Search</h1>
            <p className="lead">Search for movies</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Movie not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Enter movie title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="enter movie title..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>
            <Col sm="4" key={this.state.movies[0].title}>
              <MovieCard
                removeMovie={this.removeMovie.bind(this)}
                movie={this.state.movies[0]}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
