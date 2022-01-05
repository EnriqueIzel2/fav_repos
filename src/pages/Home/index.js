import React, { useState } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

import { Container, Form, SubmitButton } from "./styles";

function Home() {
  const [newRepo, setNewRepo] = useState("");

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={() => {}}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Home;
