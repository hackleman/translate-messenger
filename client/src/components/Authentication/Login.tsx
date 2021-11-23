import { ComponentProps } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../store/thunks";
import { connect } from "react-redux";
import { ReduxState } from "../../store";
import { 
    Box, 
    Grid, 
    Typography, 
    Button, 
    FormControl, 
    TextField
} from "@mui/material";

const Login = (props: ComponentProps<any>) => {
    const { user, login } = props;
    const navigate = useNavigate();

    const handleLogin = async (ev: any) => {
        ev.preventDefault();
        const username = ev.target.username.value;
        const password = ev.target.password.value;

        await login({ username, password });
    }

    if (user?.id) {
        return <Navigate replace to="/home" />;
    }

    return (
        <Grid container>
            <Box>
                <Grid container item>
                    <Typography>Need to Register?</Typography>
                    <Button onClick={() => navigate("/register")}> Register </Button>
                </Grid>
            </Box>
            <form onSubmit={handleLogin}>
                <Grid>
                    <Grid>
                        <FormControl margin="normal" required>
                            <TextField
                                aria-label="username"
                                label="username"
                                name="username"
                                type="text"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl margin="normal" required>
                            <TextField
                                aria-label="password"
                                label="password"
                                name="password"
                                inputProps={{minLength: 6}}
                                type="password"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" size="large" >
                            Login
                        </Button> 
                    </Grid>
                </Grid>
            </form>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);