import React, { useState, useEffect } from 'react';
import './GitHubRepos.css';
import { github } from '../portfolioData';

const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_USERNAME = github.username;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRepos(data.slice(0, 4));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [GITHUB_USERNAME]);

  return (
    <section id="github-repos">
      <div className="github-container">
        <h2>Latest on GitHub</h2>
        {loading && <p>Loading repositories...</p>}
        {error && <p>Error fetching repositories: {error}</p>}
        {!loading && !error && (
          <ul className="repos-list">
            {repos.map(repo => (
              <li key={repo.id} className="repo-item">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                  <span className="repo-name">{repo.name}</span>
                </a>
                <p className="repo-description">{repo.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GithubRepos;