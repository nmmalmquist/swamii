import React from 'react';

import styles from "../../css/cssComponents/app-button.module.css"

function AppButton({title, onClick, extraStyle,type, ...otherProps}) {
    return (
        <button type={type} className={`${styles.button} ${extraStyle}`} onClick={onClick} {...otherProps} >
            {title}
        </button>
    );
}

export default AppButton;