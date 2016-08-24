import React, { Component } from 'react';
import * as actions from '../../actions'
import { connect } from 'react-redux';

class UserCard extends Component {
    handleClick(user){
        this.props.addToShortList(user)
    }

    renderButton(){

    }

    render(){
        console.log("props in user card", this.props)
        return(<div>
            <div  className="col-md-4  c-user_cell" style={this.props.divStyle}>
                <div className="row">
                    <div className="col-xs-6">
                        <img src={this.props.user.avatar_url} className="c-user_cell__img" />
                        <h4>{this.props.displayUserName}</h4>
                        <p>{this.props.user.location}</p>
                        <p>Hireable: <i className={this.props.user.hireStatus}></i> </p>
                    </div>
                    <div className="col-xs-6">
                        <p>Follwers : {this.props.user.followers}</p>
                        <p>Repos : {this.props.user.repos}</p>
                        {this.props.shortlisted ? null: <button onClick={this.handleClick.bind( this, this.props.user)} className="btn btn-default" type="submit">Add to short list</button>}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default UserCard