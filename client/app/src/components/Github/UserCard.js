import React, { Component } from 'react'


class UserCard extends Component {
    handleClick(user){
        this.props.addToShortList(user)
    }


    handleShortList(shortlisted){
        if(!shortlisted){
            return (<button onClick={this.handleClick.bind(this, this.props.user)} className="btn btn-default" type="submit">Add to short list</button>)
        }
    }

    render(){
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
                        <p>Repos : {this.props.user.public_repos}</p>
                        {this.handleShortList(this.props.user.shortlist)}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default UserCard