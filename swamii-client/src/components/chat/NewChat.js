import React, { useState, useContext } from "react";
import { Container } from "react-bootstrap";
import ReactSelect from "react-select";
import AuthContext from "../../auth/context";

import styles from "../../css/cssComponents/new-chat.module.css";

function NewChat({ allUsers }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useContext(AuthContext);

  //options for the autocomplete
  let options = allUsers.map((thisUser) => {
    return { value: thisUser.username, label: thisUser.username };
  });
  options = options.filter((thisUser)=> thisUser.label !== user.username)

  const handleSearchChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <Container className={styles.mainContainer}>
      <div className={styles.new}>
        <ReactSelect
          value={selectedOption}
          onChange={handleSearchChange}
          options={options}
          placeholder={"To: Username..."}
        />
      </div>
    </Container>
  );
}

export default NewChat;
