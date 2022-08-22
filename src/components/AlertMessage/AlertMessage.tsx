import React, { useEffect } from 'react';
import { BiError } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toggleAlert } from '../../slices/alertMessage.slice';
import { AppDispatch } from '../../store';
import styles from './AlertMessage.module.scss';

interface AlertMessageProps{
    message?: string | Array<string>;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message = "" }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const timeId = setTimeout(() => {
          dispatch(toggleAlert(""));
        }, 4000)
        return () => {
          clearTimeout(timeId)
        }
    }, []);
    return (
        <section className={ styles.alert_container }>
            <div className={ styles.message_container }>
                <div className={ styles.icon_container }>
                    <BiError />
                </div>
                <div>
                    {   
                        typeof message === "string"
                        ?   <p>{ message }</p>
                        :  (message as Array<string>).map((item, index) => <p key={ index }>{item}</p>)
                    }
                </div>
            </div>
            <RiCloseLine onClick={() => dispatch(toggleAlert(""))} />
        </section>
    );
}

export default AlertMessage;