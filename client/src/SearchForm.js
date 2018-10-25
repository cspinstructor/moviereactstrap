import React, { Component } from 'react';
import {
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

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: 'ok'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ alertVisible: false });
  }

  onSubmit = e => {
    e.preventDefault();

    console.log(this.state.title);
    this.setState({ alertVisible: true });
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}

export default SearchForm;
