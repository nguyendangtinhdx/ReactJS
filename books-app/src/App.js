import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    books: [],
    newBookData: {
      name: '',
      description: '',
      content: '',
      created_date: '',
      category: '',
      city: '',
      address: '',
      images: ''
    },
    editBookData: {
      id: '',
      name: '',
      description: '',
      content: '',
      created_date: '',
      category: '',
      city: '',
      address: '',
      images: ''
    },
    newBookModal: false,
    editBookModal: false
  }
  componentWillMount() {
    this._refreshBooks();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }
  addBook() {
    axios.post('http://localhost:3200/api/travel/page', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);
      this._refreshBooks();

      this.setState({
        books, newBookModal: false, newBookData: {
          name: '',
          description: '',
          content: '',
          created_date: '',
          category: '',
          city: '',
          address: '',
          images: ''
        }
      });
    });
  }
  updateBook() {
    let { name, description, content, created_date, category, city, address, images } = this.state.editBookData;

    axios.put('http://localhost:3200/api/travel/page/' + this.state.editBookData.id, {
      name, description, content, created_date, category, city, address, images
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { id: '', name: '', description: '', content: '', created_date: '', category: '', city: '', address: '', images: '' }
      })
    });
  }
  editBook(id, name, description, content, created_date, category, city, address, images) {
    this.setState({
      editBookData: { id, name, description, content, created_date, category, city, address, images }, editBookModal: !this.state.editBookModal
    });
  }
  deleteBook(id) {
    axios.delete('http://localhost:3200/api/travel/page/' + id).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:3200/api/travel/page').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.name}</td>
          <td>{book.description}</td>
          <td>{book.content}</td>
          <td>{book.created_date}</td>
          <td>{book.category}</td>
          <td>{book.city}</td>
          <td>{book.address}</td>
          <td>{book.images}</td>
          <td width='10%'>
            <Button color="primary" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.name, book.description, book.content, book.created_date, book.category, book.city, book.address, book.images)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App">

        <h1 className="text-center">List travel</h1>

        <Button className="my-3" color="success" onClick={this.toggleNewBookModal.bind(this)}>Add new</Button>

        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add new</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input id="Name" value={this.state.newBookData.name} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.name = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input id="Description" value={this.state.newBookData.description} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.description = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Content">Content</Label>
              <Input id="Content" value={this.state.newBookData.content} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.content = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Created_date">Created_date</Label>
              <Input id="Created_date" value={this.state.newBookData.created_date} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.created_date = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Category">Category</Label>
              <Input id="Category" value={this.state.newBookData.category} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.category = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="City">City</Label>
              <Input id="City" value={this.state.newBookData.city} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.city = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Address">Address</Label>
              <Input id="Address" value={this.state.newBookData.address} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.address = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Images">Images</Label>
              <Input id="Images" value={this.state.newBookData.images} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.images = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.addBook.bind(this)}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input id="Name" value={this.state.editBookData.name} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.name = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input id="Description" value={this.state.editBookData.description} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.description = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Content">Content</Label>
              <Input id="Content" value={this.state.editBookData.content} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.content = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Created_date">Created_date</Label>
              <Input id="Created_date" value={this.state.editBookData.created_date} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.created_date = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Category">Category</Label>
              <Input id="Category" value={this.state.editBookData.category} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.category = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="City">City</Label>
              <Input id="City" value={this.state.editBookData.city} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.city = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Address">Address</Label>
              <Input id="Address" value={this.state.editBookData.address} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.address = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="Images">Images</Label>
              <Input id="Images" value={this.state.editBookData.images} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.images = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>content</th>
              <th>created_date</th>
              <th>category</th>
              <th>city</th>
              <th>address</th>
              <th>images</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
