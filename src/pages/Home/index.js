import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

import api from "../../services/api";

import { Container, Form, SubmitButton } from "./styles";

function Home() {
  const [newRepo, setNewRepo] = useState("");
  const [repos, setRepos] = useState([]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };

        setRepos([...repos, data]);
        setNewRepo("");
      }

      submit();
    },
    [newRepo, repos]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
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
