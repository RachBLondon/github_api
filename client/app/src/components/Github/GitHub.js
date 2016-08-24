import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {colors} from '../../constants/colors_blue'

import * as actions from '../../actions'

import UserCard from './UserCard'
import Pager from '../nav/pager'

let numberUsersDisplayed = 0;

const colorScheme = [ colors.c1, colors.c2, colors.c3, colors.c5, colors.c5]

class GitHub extends Component {

    handleFormSubmit({ language, location}){
        this.props.fetchGithubMessage({language, location});
    }

    pagingation(){
        return this.props.usersDetails.length === 30 ? <Pager pagination={actions.fetchPagination} paginationCall={this.props.fetchPagination} pages={this.props.pagination.links} /> : null;
    }

    showUsers(){

        let count = 0;
        return this.props.usersDetails.map(user =>{
            const displayUserName = user.name ? user.name : user.login;
            const hireStatus = user.hireable? "fa fa-check-circle": "fa fa-times"
            const textColor = colors.black
            const divStyle = {backgroundColor : colorScheme[count%5], color : textColor}
            count ++;

            return (
                <UserCard
                    addToShortList={this.props.addToShortList}
                    key={count}
                    displayUserName={displayUserName}
                    textColor={textColor}
                    divStyle={divStyle}
                    user={user}
                    repos={user.public_repos}
                    shortlisted={user.shortlisted}
                />
            )
        });
    }

    render() {

        const { handleSubmit , fields :{ language, location }} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label> language: </label>
                        <input { ...language } className="form-control" />
                    </fieldset>

                    <fieldset className="form-group">
                        <label> Location: </label>
                        <input { ...location } className="form-control" />
                    </fieldset>
                    <button action="submit" className="btn btn-primary">Sign in </button>
                </form>
                {this.pagingation()}
                <div className="row">
                    {this.showUsers()}
                </div>
                {this.pagingation()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        usersDetails : state.usersDetails,
        pagination   : state.langLoc.pagination
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGithubMessage : ({language, location }) => {
            dispatch(actions.fetchGithubMessage({language, location}) )
        },
        fetchPagination : (url)=>{
            dispatch(actions.fetchPagination(url))
        },
        addToShortList : (userName, email)=>{
            dispatch(actions.addToShortlist(userName, email))
        }

    }
}

export default reduxForm({
    form: 'search',
    fields: ['language', 'location']
}, mapStateToProps, mapDispatchToProps)(GitHub);