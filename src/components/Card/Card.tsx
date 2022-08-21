import React from 'react'
import styles from "./Card.module.scss"

const Card = ({children, title}: any) => {
    return (
        <div className={styles.card}>
            {
                title &&
                    <div className={ styles.card_title }>
                        <h3>{ title }</h3>
                    </div>
            }
            <div className={ styles.card_body }>
                { children }
            </div>
        </div>
    )
}

export default Card
