# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 10

### Django + React (aplikacja typu ToDo)

#### Celem laboratorium było przerobienie tutorialu [Aplikacji typu ToDo](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)
#### Dodatkowo wymagane było wprowadzenie zmian zatem usprawniłem listę o dodatkowe elementy i funkcjonalności

### Rozszerzyłem aplikację z [Lab9](https://github.com/Terrasil/aplikacje-internetowe/tree/main/Lab9) dodając elementy z tutorialu
#### Przygotowanie nowego modelu Todo
```py
class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.title
```
#### Przygotowanie serializera TodoSerializer
```py
class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')
```
#### Rozszerzenie linków
```py
router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [ 
    path('api/tutorials', views.PostView.as_view(), name='posts_list'),
    path('api/tutorials/', views.SearchPostsView.as_view(), ),
    path('api/tutorials/<int:pk>/', PostDetail.as_view()),
    path('api/', include(router.urls)), # <--
    path('admin/', admin.site.urls), # <--
]
```
#### Przygotowanie view'su TodoView
```py

class TodoView(viewsets.ModelViewSet):
  serializer_class = TodoSerializer
  queryset = Todo.objects.all()
```
#### Zmiany w pliku admin dla wgląu w bazie danych
```py
class TodoAdmin(admin.ModelAdmin): # <--
  list_display = ('title', 'description', 'completed') # <--

# Register your models here.
admin.site.register(Tutorial)
admin.site.register(Todo, TodoAdmin) # <--

```
#### Po wszystkim należy przeprowadzić migrację aby zaktualizować struktórę bazy danych

![a](https://i.imgur.com/c5VCVc4.png)

### Zmiany w Frontendzie

#### Zdeklarowanie Modala

*'components/todo-components.js'*

```js
import React, { Component } from "react";
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";

    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem
        };
      }
      handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal className="h-100" isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={this.state.activeItem.title}
                    onChange={this.handleChange}
                    placeholder="Enter Todo Title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={this.state.activeItem.description}
                    onChange={this.handleChange}
                    placeholder="Enter Todo description"
                  />
                </FormGroup>
                <FormGroup check>
                  <Label for="completed">
                    <Input
                      type="checkbox"
                      name="completed"
                      checked={this.state.activeItem.completed}
                      onChange={this.handleChange}
                    />
                    Completed
                  </Label>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }
```
![0](https://i.imgur.com/YCk6Bod.png)
#### Dodanie opcji w menu
```js
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
```
![1](https://i.imgur.com/Fn6R8Pk.png)

#### Statyczna lista na stronie głównej
```js
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
```
![2](https://i.imgur.com/Uuskj6Q.png)

#### Lista zadań (ToDo)
```js
class Lista extends Component {
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
```
![4](https://i.imgur.com/EKHPoFT.png)
Zmiany jakie zastodowałem od siebie to możliwość wyświetlenia wszystkich zadań, tych wykonanych jaki nie (dodatkowo ukrycie wszystkich) 
![5](https://i.imgur.com/EuHENc5.png)
Dodatkowo po naciśnięciu na dane zadanie rozwija się jego opis
![6](https://i.imgur.com/XdsQOm7.png)
Dla estetyki dodałem również ikony z *'@material-ui/icons'*

#### Backend
Zasada działania identyczna jak na poprzednich laboratoriach (lab9)
![7](https://i.imgur.com/tgxElX0.png)

#### Opis aplikacji
Aplikacja pozwala nam zarządzać listą zadać
 - Oznaczać i odznaczać jako wykonane
 - Dodawać zadania
 - Usuwać zadania
 - Edytować (Updateować) zadania [Modal]
