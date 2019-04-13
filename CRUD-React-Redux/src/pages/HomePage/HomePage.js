import React, { Component } from 'react';
import UserList from './../../components/UserList/UserList';
import UserItem from './../../components/UserItem/UserItem';
import { connect } from 'react-redux';
import { actFetchUsersRequest, actAddUserRequest, actUpdateUserRequest, actDeleteUserRequest } from './../../actions/index';
import loading from '../../images/loading.gif';
import * as Config from '../../constants/Config';

class HomePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtAge: '',
            txtComment: '',
            itemsToShow: Config.itemsToShowChange,
            errors: {}
        };
    }

    enableButton = true;
    
    componentDidMount() {
        this.props.fetchAllUsers();
    }

    onDelete = (id) => {
        this.props.onDeleteUser(id);
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        this.handleValidation();
    }

    handleValidation() {
        var { txtName, txtAge, txtComment } = this.state;
        let errors = {};
        let formIsValid = true;
        if (txtName === '') {
            formIsValid = false;
            errors["txtName"] = Config.errorName;
        }
        if (!txtAge.match(/^[0-9]+$/)) {
            formIsValid = false;
            errors["txtAge"] = Config.errorAgeNumber;
        }
        if (txtAge === '') {
            formIsValid = false;
            errors["txtAge"] = Config.errorAge;
        }
        if (txtComment === '') {
            formIsValid = false;
            errors["txtComment"] = Config.errorComment;
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    onAdd = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            var { id, txtName, txtAge, txtComment } = this.state;
            var user = {
                id: id,
                name: txtName,
                age: txtAge,
                comment: txtComment,
                date_created: new Date()
            };
            this.props.onAddUser(user);
            this.cancelUser();
        }
    }

    cancelUser() {
        this.setState({
            txtName: '',
            txtAge: '',
            txtComment: ''
        });
    }

    showImage() {
        var img = document.createElement("img");
        img.src = loading;
        img.width = '100';
        img.height = '100';
        document.getElementById('showImage').appendChild(img);
        setTimeout(function () { img.parentNode.removeChild(img); }, 800);
    }
    showMore() {
        var { users } = this.props;
        if (this.state.itemsToShow < users.length) {
            this.showImage();
            this.setState({
                itemsToShow: this.state.itemsToShow + Config.itemsToShowChange
            })
        }
    }

    render() {
        var { txtName, txtAge, txtComment } = this.state;
        var { users } = this.props;
        return (
            <div className="form">
                <form onSubmit={this.onAdd}>
                    <div className="row">
                        <label htmlFor="Name" className="col-md-2 col-form-label-sm">{Config.labelName}</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="txtName"
                                value={txtName}
                                onChange={this.onChange}
                                maxLength="10"
                            />
                            <span className="error">{this.state.errors["txtName"]}</span>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="Age" className="col-md-2 col-form-label-sm">{Config.labelAge}</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="txtAge"
                                value={txtAge}
                                onChange={this.onChange}
                                maxLength="3"
                            />
                            <span className="error">{this.state.errors["txtAge"]}</span>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="Comment" className="col-md-2 col-form-label-sm">{Config.labelComment}</label>
                        <div className="col-md-10">
                            <textarea
                                type="text"
                                className="form-control form-control-sm"
                                name="txtComment"
                                value={txtComment}
                                onChange={this.onChange}
                            />
                            <span className="error">{this.state.errors["txtComment"]}</span>
                        </div>
                    </div>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-success btn-sm mr-10">{Config.buttonAdd}</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={this.cancelUser.bind(this)}>{Config.buttonCancel}</button>
                    </div>
                </form>
                <hr />
                <UserList>
                    {this.showUsers(users)}
                </UserList>
                <br />
                <div className="text-center">
                    <div id="showImage"></div>
                    <button type="button" className="btn btn-info btn-sm" onClick={this.showMore.bind(this)} disabled={!this.enableButton}>{Config.buttonShowMore}</button>
                </div>
            </div>
        );
    }

    showUsers(users) {
        var result = null;
        if (users.length > 0) {
            if (this.state.itemsToShow >= users.length) {
                this.enableButton = false;
            } else {
                this.enableButton = true;
            }
            result = users.slice(0, this.state.itemsToShow).map((user, index) => {
                return (
                    <UserItem
                        key={index}
                        user={user}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        }
        return result;
    }

}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllUsers: () => {
            dispatch(actFetchUsersRequest());
        },
        onAddUser: (user) => {
            dispatch(actAddUserRequest(user));
        },
        onUpdateUser: (user) => {
            dispatch(actUpdateUserRequest(user));
        },
        onDeleteUser: (id) => {
            dispatch(actDeleteUserRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
