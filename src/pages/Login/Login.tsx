import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import useDetectProvider from '../../hooks/useDetectProvider';
import { loginUser } from '../../slices/auth.slice';
import { RootState, AppDispatch } from '../../store';
import styles from "./Login.module.scss";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const provider = useDetectProvider();
    const { isLoading, isLoggedIn } = useSelector((state: RootState) => state.authentication);

    const preConditionCheck = () => {
        if(provider)
            dispatch(loginUser());
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if(!isLoading && isLoggedIn && accessToken){
            navigate('dashboard')
        }
    }, [isLoading, isLoggedIn, navigate])
    
    return (
        <section className={ styles.login_container }>
            <div className={ styles.form_container }>
                <button className={ styles.metamask_btn } 
                        onClick={ preConditionCheck }
                        disabled={ isLoading ? true : false } >
                    <h4>{ isLoading ? "loading..." : "LOGIN WITH METAMASK"}</h4>
                </button>
                <hr />
                <p>or login with your credentials</p>
                <section>
                    <label>Email</label>
                    <input type="text"></input>
                </section>
                <section>
                    <label>Password</label>
                    <input type="password"></input>
                </section>
                <section className={ styles.loginbtn_section}>
                    <Link to="register">
                        <p>You dont have an account?</p>
                    </Link>
                    <button>LOG IN</button>
                </section>
            </div>
        </section>
    )
}

export default Login;