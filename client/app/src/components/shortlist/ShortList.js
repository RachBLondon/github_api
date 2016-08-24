import React, {Component} from 'react'

export default class ShortList extends Component {
    buildShortList(users) {
        return users.map(function (user, i) {
           return( <tr key={i}>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                    </tr>)
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.buildShortList(this.props.shortlist)}
                    </tbody>
                </table>
            </div>
        )
    }
}
