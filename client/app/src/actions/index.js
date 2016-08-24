import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    SHOW_USER_DATA,
    SET_LOCATION_LANG,
    SHOW_SHORTLIST,
    LOAD_PROFILE,
    ADD_TO_SHORTLIST_IN_CLIENT
} from './types'
import {ROOT_URL} from './../constants/host_url'




//TODO rename this function
export function fetchGithubMessage({location, language}) {
    return function (dispatch) {
        dispatch({
            type: SET_LOCATION_LANG,
            location,
            language
        })
        axios.get(ROOT_URL + '/github/search',
            {
                headers: {location: location, language: language}
            }).then(response => {
            const pagination = response.data.shift()
            //TODO Write a test for this
            const lastPage = pagination.links.last.split('page=')[1]
            dispatch({
                type: SHOW_USER_DATA,
                pagination: pagination,
                payload: response.data,
                lastPage: lastPage
            });

        }).catch(function (response) {
            console.log(response);
        });
    }
}

export function fetchPagination(data) {
    return function (dispatch) {
        axios.get(ROOT_URL + '/github/pagination', {
            headers: {url: data.url}
        }).then(response => {
            dispatch({
                type: SHOW_USER_DATA,
                pagination: response.data.shift(),
                payload: response.data
            })
        }).catch(function (response) {
            console.log(response)
        });
    }
}

export function addToShortlist(user) {
    return function (dispatch) {

        axios.post("/addToShortList", {
            userName: user.login,
            email: user.email,
            githubId:user.id
        }).then(function (response) {
            //TODO notify user of success
            dispatch({
                type: ADD_TO_SHORTLIST_IN_CLIENT,
                githubId :user.id
            })
            console.log(response)
        }).catch(function (error) {
            //TODO notify user of error
            console.log(error);
        })
    }
}

export function getShortList() {
    return function(dispatch){
        axios.get('/getshortlist')
            .then(response=>{
                dispatch({
                    type : SHOW_SHORTLIST,
                    shortlist : response
                })
            }).catch(function (error) {
            //TODO notify user of error
            console.log(error)
        })
    }
}

export function getProfile(){
    return function(dispatch){
        axios.get('/getprofile')
            .then(response =>{
                dispatch({
                    type: LOAD_PROFILE,
                    payload : response.data
                })
            })
    }
}

