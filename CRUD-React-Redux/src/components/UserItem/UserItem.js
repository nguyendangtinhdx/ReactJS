import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { actUpdateUserRequest } from '../../actions/index';
import { connect } from 'react-redux';
import * as Config from '../../constants/Config';

class UserItem extends Component {

    onDelete = (id) => {
        if (confirm(Config.alertConfirmDelete)) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }

    onUpdateAge = (id, age) => {
        age++;
        var user = {
            id: id,
            age: age
        };
        this.props.onUpdateUser(user);
    }

    render() {
        var { user } = this.props;
        return (
            <tr>
                <td width='410px'>{user.name} ({user.age})</td>
                <td width='615px' className="comment">{user.comment}</td>
                <td width='340px' className="text-right">
                    {/* <Link
                        to={`/user/${user.id}/edit`}
                        className="btn btn-primary btn-sm mr-10"
                    >
                        {Config.buttonUpdate}
                    </Link> */}
                    <button
                        type="button"
                        className="btn btn-primary btn-sm mr-10"
                        onClick={() => this.onUpdateAge(user.id, user.age)}
                    >
                        {Config.buttonUpdateAge}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.onDelete(user.id)}
                    >
                        {Config.buttonDelete}
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateUser: (user) => {
            dispatch(actUpdateUserRequest(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
