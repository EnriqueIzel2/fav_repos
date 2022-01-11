import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { Container } from "./styles";

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

  return <Container></Container>;
}

export default Repo;
