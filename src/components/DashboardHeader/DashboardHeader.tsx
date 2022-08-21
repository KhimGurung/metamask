import React from 'react'
import styles from "./DashboardHeader.module.scss"

interface IDashboardHeader {
    title: string,
    children?: React.ReactNode
}
const DashboardHeader = ({ title, children }: IDashboardHeader) => {
    return (
        <header className={ styles.dashboard_header }>
            <h1>{ title }</h1>
            <div className={ styles.right_controls }>
                { children }
            </div>
        </header>
    )
}

export default DashboardHeader
