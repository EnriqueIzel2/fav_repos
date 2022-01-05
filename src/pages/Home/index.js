import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

import { Container, Form, SubmitButton } from "./styles";

function Home() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar repositório" />

        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Home;
