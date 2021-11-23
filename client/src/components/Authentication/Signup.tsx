import { useState, ComponentProps } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { register } from "../../store/thunks/user.thunks";
import { connect } from "react-redux";
import { ReduxState } from "../../store";
import { 
    Box, 
    Grid, 
    Typography, 
    Button, 
    FormControl, 
    TextField, 
    FormHelperText 
} from "@mui/material";

const Signup = (props: ComponentProps<any>) => {
    const { user, register } = props;
    const navigate = useNavigate();

    const [formErrorMessage, setFormErrorMessage] = useState({})
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
        <Grid container>
            <Box>
                <Grid container item>
                    <Typography>Need to log in?</Typography>
                    <Button onClick={() => navigate("/login")}> Login </Button>
                </Grid>
            </Box>
            <form onSubmit={handleRegister}>
                <Grid>
                    <Grid>
                        <FormControl>
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
                        <FormControl>
                            <TextField
                                aria-label="email address"
                                label="email address"
                                name="email"
                                type="email"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl error={!!(formErrorMessage as any).confirmPassword}>
                            <TextField
                                aria-label="password"
                                label="password"
                                name="password"
                                inputProps={{minLength: 6}}
                                type="password"
                                required
                            />
                            <FormHelperText>
                                {(formErrorMessage as any).confirmPassword}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl error={!!(formErrorMessage as any).confirmPassword}>
                            <TextField
                                aria-label="confirm password"
                                label="Confirm Password"
                                name="confirmPassword"
                                inputProps={{minLength: 6}}
                                type="password"
                                required
                            />
                            <FormHelperText>
                                {(formErrorMessage as any).confirmPassword}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Button type="submit" variant="contained" size="large" >
                        Create
                    </Button> 
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
        register: (credentials: any) => {
            dispatch(register(credentials));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);