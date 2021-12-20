import React from 'react';

import styles from "../../css/cssComponents/app-button.module.css"

function AppButton({title, onClick, extraStyle}) {
    return (
        <div className={`${styles.button} ${extraStyle}`} onClick={onClick}>
            {title}
        </div>
    );
}

export default AppButton;