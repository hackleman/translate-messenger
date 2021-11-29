import React, { useState } from "react";
import { connect } from 'react-redux';
import { searchUsers, clearUsers } from "../../store/thunks";
import { Sidebar } from './index';

const SidebarContainer = (props: any) => {
    const { searchUsers, clearSearchedUsers } = props;
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = async (event: any) => {
        if (event.target.value === "") {
            clearSearchedUsers();
            setSearchTerm("");
            return;
        }

        if (searchTerm.includes(event.target.value)) {
            setSearchTerm(event.target.value);
            return;
        }

        await searchUsers(event.target.value);
        setSearchTerm(event.target.value);
    }
    return <Sidebar handleChange={handleChange} searchTerm={searchTerm} />
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        searchUsers: (username: string) => {
            dispatch(searchUsers(username));
        },
        clearSearchedUsers: () => {
            dispatch(clearUsers());
        }
    }
}

export default connect(null, mapDispatchToProps)(SidebarContainer)