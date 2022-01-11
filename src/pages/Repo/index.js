import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import api from "../../services/api";
import { BackButton, Container, Loading, Owner } from "./styles";

function Repo() {
  const { repo: repoName } = useParams();
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepo() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepo(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    loadRepo();
  }, [repoName]);

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft size={30} color="#000" />
      </BackButton>
      <Owner>
        <img src={repo.owner.avatar_url} alt="Avatar do repositório" />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>
    </Container>
  );
}

export default Repo;
