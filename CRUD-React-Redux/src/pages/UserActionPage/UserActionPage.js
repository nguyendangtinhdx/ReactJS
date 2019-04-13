import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddUserRequest, actGetUserRequest, actUpdateUserRequest } from '../../actions/index';
import { connect } from 'react-redux';

class UserActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtAge: '',
            txtComment: ''
        };
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditUser(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtAge: itemEditing.age,
                txtComment: itemEditing.comment
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) => {
        e.preventDefault();
        var { id, txtName, txtAge, txtComment } = this.state;
        var { history } = this.props;
        var user = {
            id: id,
            name: txtName,
            age: txtAge,
            comment: txtComment
        };
        if (id) {
            this.props.onUpdateUser(user);
        } else {
            this.props.onAddUser(user);
        }
        history.goBack();
    }

    render() {
        var { txtName, txtAge, txtComment } = this.state;
        return (
            <div className="form">
                <form onSubmit={this.onSave}>
                    <div className="row">
                        <label htmlFor="Name" className="col-md-2 col-form-label-sm">Name</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="txtName"
                                value={txtName}
                                onChange={this.onChange}
                                maxLength="10"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="Age" className="col-md-2 col-form-label-sm">Age</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="txtAge"
                                value={txtAge}
                                onChange={this.onChange}
                                maxLength="3"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="Comment" className="col-md-2 col-form-label-sm">Comment</label>
                        <div className="col-md-10">
                            <textarea
                                type="text"
                                className="form-control form-control-sm"
                                name="txtComment"
                                value={txtComment}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="text-center">
                        <Link to="/" className="btn btn-danger btn-sm mr-10">Back</Link>
                        <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    </div>
                </form>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddUser: (user) => {
            dispatch(actAddUserRequest(user));
        },
        onEditUser: (id) => {
            dispatch(actGetUserRequest(id));
        },
        onUpdateUser: (user) => {
            dispatch(actUpdateUserRequest(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActionPage);
