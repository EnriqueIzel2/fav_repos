import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";

import api from "../../services/api";

import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";

function Home() {
  const [newRepo, setNewRepo] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);

        try {
          if (newRepo === "") {
            throw new Error("Digite um repositório válido");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repos.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositório já adicionado");
          }

          const data = {
            name: response.data.full_name,
          };

          setRepos([...repos, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repos]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleDeleteRepo = useCallback(
    (repo) => {
      const findRepo = repos.filter((r) => r.name !== repo);
      setRepos(findRepo);
    },
    [repos]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repos.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDeleteRepo(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <a href="#">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Home;
