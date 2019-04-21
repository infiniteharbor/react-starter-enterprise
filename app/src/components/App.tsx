import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class App extends Component<any, any> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <>
        <h1>Hello World!</h1>
        <p>This is a react starter application</p>
      </>
    );
  }
}