import React, { Component } from "react";
import Buttons from '../services/Buttons'
import axios from "axios";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      price: null, 
      published: false,
      upload: [],
      submitted: false,
      image: null,
    };
  }


  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
    console.log(this.state)
  }

  saveTutorial() {
      const formData = new FormData();
      console.log(this.state.upload)
      console.log(this.state.upload.name)
      formData.append("title", this.state.title);
      formData.append("description", this.state.description);
      formData.append("price", this.state.price);
      formData.append("upload", this.state.upload, this.state.upload.name);

      axios.post("http://127.0.0.1:8080/api/tutorials", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        } 
    });
      this.setState({
        submitted:true
      })
  }
 
  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      price: null,
      published: false,
      //here
      upload: null,
      image: null,
      submitted: false
    });
    console.log(this.state.file)
  }
  onChange = e => {
    console.log(this.state.file)
    const files = Array.from(e.target.files)
    this.setState({
      upload: files[0],
      image: URL.createObjectURL(e.target.files[0])
    });
  }

  render() {
    return (
      <div class="w-50 mx-auto">
        <div className="submit-form">
          <h4 class="formTitle"><center>Dodaj nowy produkt</center></h4>
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newTutorial}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title"><strong>Title</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description"><strong>Description</strong></label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  rows="10"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price"><strong>Price</strong></label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  min="0"
                  step="0.01"
                  required
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
                />
              </div>

              <div className="form-group">
                <Buttons onChange={this.onChange} />
                <img src={this.state.image}/>
              </div>

              <button onClick={this.saveTutorial} className="btn btn-success">
                Zapisz
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}