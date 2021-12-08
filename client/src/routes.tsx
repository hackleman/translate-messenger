import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from './components';
import { LoginContainer, SignupContainer, SnackbarError } from './components/Authentication';
import { connect } from "react-redux";
import { ReduxState } from "./store";

const AppRouter = (props: any) => {
    const { user } = props;
    const [errorMessage, setErrorMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

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
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/register" element={<SignupContainer/>} />
                {user?.id ?
                    <Route path="/" element={<Home />} /> :
                    <Route path="/" element={<SignupContainer />} />
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

export default connect(mapStateToProps)(AppRouter);