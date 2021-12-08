import { ComponentProps } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../../store/thunks";
import { connect } from "react-redux";
import { ReduxState } from "../../store";
import { Login } from './index';
import { useNavigate } from "react-router-dom";

const LoginContainer = (props: ComponentProps<any>) => {
    const { user, login } = props;
    const navigate = useNavigate();

    const handleLogin = async (ev: any) => {
        ev.preventDefault();
        const username = ev.target.username.value;
        const password = ev.target.password.value;
        console.log(username, password);
        await login({ username, password });
    }

    const navigateToRegister = () => {
        navigate("/register")
    }

    if (user?.id) {
        return <Navigate replace to="/home" />;
    }

    return (
        <Login 
            handleLogin={handleLogin} 
            navigateToRegister={navigateToRegister}
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
        login: (credentials: any) => {
            dispatch(login(credentials));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);