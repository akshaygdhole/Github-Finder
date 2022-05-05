import React, { userReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_REPOS
} from '../types'

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = userReducer(GithubReducer, initialState);
    
    //search users

    
    //Get User



    //Get Repos


    //Clear Users 

    
    //Set Loading
    
    
    
    return <GithubContext.provider  
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading:state.loading
        }} {...props.children}
    >     </GithubContext.provider>

}
export default GithubState;
