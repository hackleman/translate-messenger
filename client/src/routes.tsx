import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from './components';
import { connect } from "react-redux";
import { ReduxState } from "./store";

const AppRouter = (props: any) => {
    console.log(props);
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup/>} />
        </Routes>
    )
};

const mapStateToProps = (state: ReduxState) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(AppRouter);