import React from 'react'
import styles from "./DashboardTemplate.module.scss"
import DashboardFooter from '../DashboardFooter'
import DashboardNavbar from '../DashboardNavbar'
import DashboardSidebar from '../DashboardSidebar'

interface IDashboardTemplate {
    children?: React.ReactNode,
    className?: string
}

const DashboardTemplate = ({ children, className} : IDashboardTemplate) => {
    const toggleSidebar = () => {
        const overlay = document.getElementById(styles.toggle_sidebar) as HTMLInputElement
        overlay.checked = false;
    }

    const toggleBodyScroll = (e: React.FormEvent<HTMLInputElement>) => {
        document.body.style.overflow = e.currentTarget.checked ? "hidden" : "auto"
    }

    return (
        <div className={ styles.dashboard_template}>
            <input type="checkbox" id={ styles.toggle_sidebar }  onChange={ toggleBodyScroll } hidden />
            <div className={ styles.sidebar_overlay } onClick={ toggleSidebar } />
            <nav className={ styles.dashboard_sidebar }>
                <DashboardSidebar />
            </nav>
            <div className={ styles.dashboard_content }>
                <DashboardNavbar className={ styles.navbar } />
                <section className={ `container ${styles.dashboard_body}` }>
                    { children }
                </section>
                <DashboardFooter className={ styles.dashboard_footer } />
            </div>
        </div>
    )
}

export default DashboardTemplate
