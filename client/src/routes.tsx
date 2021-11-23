import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from './components';
import { Login, Signup, SnackbarError } from './components/Authentication';
import { connect } from "react-redux";
import { ReduxState } from "./store";
import { fetchUser } from "./store/thunks";

const AppRouter = (props: any) => {
    const { user, fetchUser } = props;
    const [errorMessage, setErrorMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [fetchUser])

    useEffect(() => {
        if(user?.error) {
            setSnackBarOpen(true);
            if(typeof user.error === "string") {
                setErrorMessage(user.error);
            } else {
                setErrorMessage("Internal Server Error.  Please try again");
            }
        }
    }, [user?.error]);

    if (user?.isFetchingUser) {
        return <div>Loading.... </div>
    }

    return (
        <>
            {snackBarOpen && (
                <SnackbarError
                    setSnackBarOpen={setSnackBarOpen}
                    errorMessage={errorMessage}
                    snackBarOpen={snackBarOpen}
                />
            )}
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup/>} />
                {user?.id ?
                    <Route path="/" element={<Home />} /> :
                    <Route path="/" element={<Signup />} />
                }
            </Routes>
        </>
    )
};

const mapStateToProps = (state: ReduxState) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUser() {
            dispatch(fetchUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);