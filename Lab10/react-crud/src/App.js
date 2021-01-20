import React, { Component }  from 'react';
import {Button, Accordion,Card} from 'react-bootstrap';
import {Footer, Header, Strona} from './components/komponenty'
import Modal from "./components/todo-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {InputAdornment, Grid, TextField, Button as ButtonMUI, IconButton} from "@material-ui/core"
import { AccountCircle, LockRounded ,DeleteForever,Edit,Add,VisibilityOff,Visibility,Search} from '@material-ui/icons';
import axios from "axios";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";


function App() {
    const [theme, setDarkTheme] = React.useState(false)
    return (
        <div class={theme ? 'dark-theme' : 'light-theme'}>
            <Header></Header>
            <div class="sep">
               <Router>{/* <Router> z ModernUI*/}
                    <nav class="menu shadow">
                        <ul>
                            <li>
                                <Link to="/">Strona główna</Link>{/* <Link> z ModernUI*/}
                            </li>
                            <li>
                                <Link to="/tasks">Zadania</Link>
                            </li>
                            <li>
                                <Link to="/produkty">Lista produktów</Link>
                            </li>
                            <li>
                                <Link to="/dodaj">Dodaj produkt</Link>
                            </li>
                            <li id="theme">
                                <Button variant={theme ? 'light' : 'dark'} onClick={() => setDarkTheme(theme => !theme)}>
                                    {theme ? 'Light Mode' : 'Dark Mode'}
                                </Button> 
                            </li>
                        </ul>
                    </nav>
                    <Switch>{/* <Switch> z ModernUI*/}
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/produkty">
                            <TutorialsList />
                        </Route>
                        <Route path="/dodaj">
                            <AddTutorial />
                        </Route>
                        <Route path="/edytuj/:id" component={Tutorial}/>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/tasks" component={Lista} />
                    </Switch>
                </Router>    
            </div>
            <Footer></Footer>
        </div>      
    );
}

function Home(){
  return (
    <div align="center">
        <Card
        className="w-50 p-3 text-gray"
      >
        <List>
          <ListItem >
              <ListItemText
                  primary={
                  <Typography fontWeight="fontWeightBold" variant="h5">
                      <b>Django + React (aplikacja typu ToDo)</b>
                  </Typography>
                  }
              />
          </ListItem>
          <ListItem >
              <ListItemIcon>
                  <FiberManualRecordIcon/>
              </ListItemIcon>
              <ListItemText
                  primary="backend napisany w Django,"
              />
          </ListItem>
          <ListItem >
              <ListItemIcon>
                  <FiberManualRecordIcon/>
              </ListItemIcon>
              <ListItemText
                  primary="frontend napisany za pomocą React.js,"
              />
          </ListItem>
          <ListItem >
              <ListItemIcon>
                  <FiberManualRecordIcon/>
              </ListItemIcon>
              <ListItemText
                  primary="biblioteka ‘axios’ użyta do “konsumowania” API wystawionego np. przez DRF,"
              />
          </ListItem>
          <ListItem >
              <ListItemIcon>
                  <FiberManualRecordIcon/>
              </ListItemIcon>
              <ListItemText
                  primary="przykład aplikacji To-Do z wykorzystaniem Django i React’a,"
              />
          </ListItem>
          <ListItem >
              <ListItemIcon>
                  <FiberManualRecordIcon/>
              </ListItemIcon>
              <ListItemText
                  primary="należy przeanalizować i wdrożyć kod z ww. poradnika,"
              />
          </ListItem>
          <ListItem >
              <ListItemIcon>
                  <FiberManualRecordIcon/>
              </ListItemIcon>
              <ListItemText
                  primary="plusy za własne przemyślenia, analizę dokumentacji i idące za nimi modyfikacje w aplikacji."
              />
          </ListItem>
        </List>
      </Card>  
    </div>
  );
}

class Lista extends Component { // Funkcja która tworzy podstronę ToDo List
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      showAll:false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8080/api/todos/")
      .then(res => {
          this.setState({ todoList: res.data })
        })
      .catch(err => console.log(err));
  };
  displayAllTasks = status => {
    if (status) {
      return this.setState({ viewCompleted: null ,showAll: !this.state.showAll});
    }
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true ,showAll: false});
    }
    return this.setState({ viewCompleted: false ,showAll: false});
  };
  renderTabList = () => {
    return (
      <div class="float-left">
        <Button
          onClick={() => this.displayCompleted(false)}
          variant={this.state.viewCompleted ? "danger" : "danger"}
        >
          Nieukończone
        </Button>{" "}
        <Button
          onClick={() => this.displayCompleted(true)}
          variant={this.state.viewCompleted ? "success" : "success"}
        >
          Ukończone
        </Button>{" "}
      <Button
        onClick={() => this.displayAllTasks(true)}
        variant={this.state.showAll ? "light" : "dark"}
      >
        {this.state.showAll ? <Visibility/> : <VisibilityOff/> }
        {this.state.showAll ? " Pokazane wszystkie" : " Ukryte wszystkie"}
      </Button>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted, showAll } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted || showAll
    );
    return newItems.map(item => (
      <Card className="mb-5">
        <Card.Header>
          <Accordion.Toggle as={Button} 
          className={`float-left w-10 ${item.completed ? "completed" : ""}`} variant="link" eventKey={item.id}>
              {item.title}
          </Accordion.Toggle>
          <Button 
          onClick={() => this.editItem(item)}
          variant="primary"
          >
            <Edit /> Edytuj
          </Button>{" "}
          <Button 
          onClick={() => this.handleDelete(item)}
          className="btn btn-danger"
          >
            <DeleteForever /> Usuń
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey={item.id}>
          <Card.Body class="float-left">{item.description}</Card.Body>
        </Accordion.Collapse>
      </Card>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8080/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8080/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8080/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
           <Card className="mb-5">
                <Card.Header>
                
                <Button onClick={this.createItem} variant="primary">
                 <Add /> Add task
                </Button>
              {this.renderTabList()}
              </Card.Header>
            </Card>
            
					  <Accordion>
              {this.renderItems()}
            </Accordion>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            className="h-100"
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
  
function Login() {
    return (
        <div class="login-panel">
            <Grid container style={{minHeight: '67vh'}}> {/* <Grid> z ModernUI*/}
                <Grid container item xs={12} sm={12} alignItems='center' direction='column' justify="space-between" style={{padding: 10}}>
                    <div/>
                    <div style={{display:'flex', flexDirection:'column', maxWidth:360, minWidth:360}}>
                        <Grid container justify="center">
                            <h2>Panel Logowania</h2>
                        </Grid>
                        <TextField label='Login' margin='normal' InputProps={{startAdornment:<InputAdornment><AccountCircle/></InputAdornment>}}/> {/* <TextField> z ModernUI*/}
                        <TextField label='Hasło' margin='normal' InputProps={{startAdornment:<InputAdornment><LockRounded/></InputAdornment>}}/> {/* Dodatkowo ikony */}
                    <div style={{height:20}}/>
                        <ButtonMUI variant='contained' style={{margin:'auto',display:'flex', flexDirection:'column', maxWidth:240, minWidth:240}}> {/* <Button> z ModernUI*/}
                            Zaloguj
                        </ButtonMUI>
                    </div>
                    <div/>
                </Grid>
            </Grid>
        </div>
    );
}
export default App;