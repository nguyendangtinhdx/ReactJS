import React, { Component } from 'react';

class UserList extends Component {
    render() {
        return (
            <table className="table-sm table-hover">
                <thead>

                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default UserList;
