import React, { Component } from "react";
import ImageLoader from 'react-image-file';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedFile: null };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileChangedHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  uploadHandler(event) {
    console.log(this.state.selectedFile);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler}>Upload!</button>
        <br />
        <ImageLoader type="img" file={this.state.selectedFile} alt="upload an image" />
      </div>
    );
  }
}
