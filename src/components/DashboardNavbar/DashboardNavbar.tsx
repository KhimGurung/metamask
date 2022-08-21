import React, { useEffect } from 'react'
import styles from "./DashboardNavbar.module.scss"
import templateStyles from "../DashboardTemplate/DashboardTemplate.module.scss"
import { BsMenuButtonWide } from "react-icons/bs"
import { FaRegEnvelope } from "react-icons/fa"
import { BiLogOut, BiSearch } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { logoutUser } from '../../slices/auth.slice'
import { useNavigate } from 'react-router-dom'

interface IDashboardNavbar {
    children?: React.ReactNode,
    className?: string
}

const DashboardNavbar = ({ children, className }: IDashboardNavbar) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isLoggedIn } = useSelector((state: RootState) => state.authentication);

    const logout = () => {
        dispatch(logoutUser());
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(!token)
            navigate("/");
    }, [isLoading, isLoggedIn])
    
    return (
        <section className={`container ${styles.dashboard_navbar} ${className}`}>
            <label htmlFor={ templateStyles.toggle_sidebar }>
                <BsMenuButtonWide className={ styles.navbar_icon } />
            </label>
            <div className={ styles.left_icons }>
                <BiSearch className={ styles.navbar_icon } />
                <FaRegEnvelope className={ styles.navbar_icon } />
                <BiLogOut className={ styles.navbar_icon } onClick={ logout }/>
                {/* <img alt="profile" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" /> */}
            </div>
        </section>
    )
}

export default DashboardNavbar
