import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useDetectProvider from '../../hooks/useDetectProvider';
import { registerUser } from '../../slices/user.slice';
import { RootState, AppDispatch } from '../../store';
import styles from "./Register.module.scss";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const provider  = useDetectProvider();
    const { isLoading, isLoggedIn } = useSelector((state: RootState) => state.user);

    const preConditionCheck = () => {
        if(provider)
            dispatch(registerUser());
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if(!isLoading && isLoggedIn && accessToken)
            navigate('/dashboard')
    }, [isLoading, isLoggedIn, navigate])
    
    
    return (
        <section className={ styles.register_container }>
            <div className={ styles.form_container }>
                <button className={ styles.metamask_btn } onClick={preConditionCheck} disabled={ isLoading ? true : false }>
                    <h4>{ isLoading ? "loading..." : "REGISTER WITH METAMASK"}</h4>
                </button>
                <hr />
                <p>or register with your email</p>
                <form>
                    <section>
                        <label>Email</label>
                        <input type="text" required></input>
                    </section>
                    <section>
                        <label>Password</label>
                        <input type="password" required></input>
                    </section>
                    <section>
                        <label>Confirm Password</label>
                        <input type="password" required></input>
                    </section>
                    <section className={ styles.registerbtn_section}>
                        <Link to='/'>
                            <p>I already have an account.</p>
                        </Link>
                        <button type='submit'>REGISTER</button>
                    </section>
                </form>
            </div>
        </section>
    )
}

export default Register;