import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import api from "../../services/api";
import {
  BackButton,
  Container,
  FilterList,
  IssuesList,
  Loading,
  Owner,
  PageActions,
} from "./styles";

function Repo() {
  const { repo: repoName } = useParams();
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [issuesFilter] = useState([
    { state: "all", label: "Todas", active: false },
    { state: "open", label: "Abertas", active: true },
    { state: "closed", label: "Fechadas", active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(1);

  useEffect(() => {
    async function loadRepo() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: issuesFilter.find((i) => i.active).state,
            per_page: 5,
          },
        }),
      ]);

      setRepo(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    loadRepo();
  }, [repoName, issuesFilter]);

  useEffect(() => {
    async function loadIssues() {
      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issuesFilter[filterIndex].state,
          per_page: 5,
          page,
        },
      });

      setIssues(response.data);
    }

    loadIssues();
  }, [page, repoName, filterIndex, issuesFilter]);

  function handlePage(action) {
    setPage(action === "prev" ? page - 1 : page + 1);
  }

  function handleIssuesFilter(index) {
    setFilterIndex(index);
  }

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

      <FilterList active={filterIndex}>
        {issuesFilter.map((filter, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleIssuesFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url} target="_blank" rel="noreferrer">
                  {issue.title}
                </a>

                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          disabled={page < 2}
          type="button"
          onClick={() => handlePage("prev")}
        >
          voltar
        </button>

        <button type="button" onClick={() => handlePage("next")}>
          próxima
        </button>
      </PageActions>
    </Container>
  );
}

export default Repo;
