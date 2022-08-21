import React from 'react';
import { BiBox } from "react-icons/bi";
import styles from "./DashboardSidebar.module.scss";

const menuItems = ["Project", "Inventory", "Finance", "Crypto", "Academy", "Chat", "Contacts","Inventory", "Finance", "Crypto", "Academy", "Chat", "Contacts", "Mailbox", "file Manager"];

const DashboardSidebar: React.FC = () => {
    const username = localStorage.getItem("publicAddress");
    return (
        <>
            <div className={ styles.dashboard_user_profile }>
                <img alt="profile" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" />
                <h4>Khim Bahadur Gurung</h4>
                <p>{ username }</p>
            </div>
            <div className={ styles.dashboard_menu }>
                <div className={ styles.sidebar_title }>
                    <h4>DASHBOARD</h4>
                    <p>Unique dashboard design</p>
                </div>
                <ul>
                    {
                        menuItems.map((item, index) => (
                            <li key={ index }>
                                <BiBox className={ styles.menu_icon } /> {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default DashboardSidebar
