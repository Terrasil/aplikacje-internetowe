import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import Buttons from '../services/Buttons'
import axios from "axios";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        price:null,
        published: false,
        //here
        upload: [],
        image: null,

      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  /*onChange = e => {
    this.setState(function(prevState){
      const files = Array.from(e.target.files)
      console.log(files)
      return{
        currentTutorial: {
          ...prevState.currentTutorial,
          upload: files[0],
          image: URL.createObjectURL(e.target.files[0])
        }
      };
    });
  }*/
  onChange = e => {
    const files = Array.from(e.target.files)
    console.log(files)
    this.setState({
      upload: files[0],
      image: URL.createObjectURL(e.target.files[0])
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        price: price
      }
    }));
  }
  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      published: status,
    };
    const formData = new FormData()
    formData.append("id",this.state.currentTutorial.id)
    formData.append("title",this.state.currentTutorial.title)
    formData.append("description",this.state.currentTutorial.description)
    formData.append("price",this.state.currentTutorial.price)
    formData.append("published",data.published)
    formData.append("upload",this.state.upload, this.state.upload.name )

    TutorialDataService.update(this.state.currentTutorial.id, formData)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
      const formData = new FormData();
      formData.append("title", this.state.currentTutorial.title);
      formData.append("description", this.state.currentTutorial.description);
      formData.append("price", this.state.currentTutorial.price);
      if (this.state.upload){
        formData.append("upload", this.state.upload, this.state.upload.name);
      }
    TutorialDataService.update(
      this.state.currentTutorial.id,
      formData
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/edytuj')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div class="w-50 mx-auto">
        {currentTutorial ? (
          <div className="edit-form">
            <h4 class="formTitle"><center>Edytuj produkt numer: {currentTutorial.id}</center></h4>
            <form>
              <div className="form-group">
                <label htmlFor="title"><strong>Title</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description"><strong>Description</strong></label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  rows="10"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
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
                  value={currentTutorial.price}
                  onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label htmlFor="zdjecie"><strong>Zdjecie</strong></label>
                <Buttons onChange={this.onChange} />
                <img src={this.state.image}/>
                {(() => {
                  if (this.state.image) {
                      return (
                        <img src={this.state.image}/>
                      )
                  }else{
                      return (
                          <img src={currentTutorial.upload}/>
                      )
                  }
                })()}
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: &nbsp;</strong> 
                </label>
                <font color="gray">
                  {currentTutorial.published ? "Published" : "Pending"}
                </font>
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="btn btn-primary"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            &nbsp;    
            <button
              className="btn btn-danger"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>
            &nbsp;
            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}