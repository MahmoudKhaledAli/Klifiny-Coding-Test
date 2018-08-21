import React, { Component } from "react";
import ImageLoader from "react-image-file";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalImage: "",
      selectedFile: "",
      width: 800,
      height: 100
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  resizeCrop(src, width, height) {
    var crop = width == 0 || height == 0;
    // not resize
    if (src.width <= width && height == 0) {
      width = src.width;
      height = src.height;
    }

    // check scale
    var xscale = 1;
    var yscale = 1;
    var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
    // create empty canvas
    var canvas = document.createElement("canvas");
    canvas.width = width ? width : Math.round(src.width * scale);
    canvas.height = height ? height : Math.round(src.height * scale);
    canvas.getContext("2d").scale(scale, scale);
    // crop it top center
    canvas
      .getContext("2d")
      .drawImage(
        src,
        (src.width * scale - canvas.width) * -0.5,
        (src.height * scale - canvas.height) * -0.5
      );
    return canvas;
  }

  createObjectURL(i) {
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return URL.createObjectURL(i);
  }

  fileChangedHandler(event) {
    this.getBase64(event.target.files[0], file => {
      this.setState({ selectedFile: file });
      this.setState({ originalImage: file });
    });
  }

  updatePreview() {
    var mybase64resized = this.resizeCrop(
      this.refs.orgImage,
      this.state.width,
      this.state.height
    ).toDataURL("image/jpg", 90);
    this.setState({ selectedFile: mybase64resized });
  }

  uploadHandler(event) {
    event.preventDefault();
    this.updatePreview();
  }

  widthChange(event) {
    this.setState({ width: event.target.value });
  }

  heightChange(event) {
    this.setState({ height: event.target.value });
  }

  render() {
    console.log("here");

    return (
      <div>
        <input type="file" onChange={this.fileChangedHandler} />
        <form onSubmit={this.uploadHandler}>
          Dimensions: Width
          <input
            type="number"
            max="800"
            onChange={this.widthChange.bind(this)}
          />
          x Height
          <input
            type="number"
            max="100"
            onChange={this.heightChange.bind(this)}
          />
          <button type="submit">Upload!</button>
        </form>
        <br />
        <img
          ref="orgImage"
          src={this.state.originalImage}
          alt="upload"
          style={{ display: "none" }}
        />
        <img
          src={this.state.selectedFile}
          alt="upload"
        />
      </div>
    );
  }
}
