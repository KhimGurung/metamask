import React from 'react'

interface IDashboardFooter {
    children?: React.ReactNode,
    className?: string
}

const DashboardFooter = ({ children, className }: IDashboardFooter) => {
    return (
        <footer className={ `container ${className}` }>
            DashboardFooter
        </footer>
    )
}

export default DashboardFooter
