import { useState, ComponentProps } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { register } from "../../store/thunks";
import { connect } from "react-redux";
import { ReduxState } from "../../store";
import { Signup } from './index';

const SignupContainer = (props: ComponentProps<any>) => {
    const { user, register } = props;
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const [formErrorMessage, setFormErrorMessage] = useState({});

    const handleRegister = async (ev: any) => {
        ev.preventDefault();
        const username = ev.target.username.value;
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const confirmPassword = ev.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setFormErrorMessage({ confirmPassword: "Passwords must match!"})
            return;
        }

        await register({ username, email, password });
    }

    if (user?.id) {
        return <Navigate replace to="/home" />;
    }

    return (
        <Signup 
            navigateToLogin={navigateToLogin}
            formErrorMessage={formErrorMessage}
            handleRegister={handleRegister}
        />
    )
}

const mapStateToProps = (state: ReduxState) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        register: (credentials: any) => {
            dispatch(register(credentials));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);