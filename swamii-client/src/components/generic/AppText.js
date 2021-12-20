import React from 'react';

import styles from "../../css/cssComponents/app-text.module.css"

function AppText({children, extraStyle}) {
    return (
        <h6 className={`${styles.textH6} ${extraStyle}`}>
            {children.toUpperCase()}
        </h6>
    );
}

export default AppText;