import './GitHubRepos.css';
import { github, featuredRepos } from '../portfolioData';

const GithubRepos = () => {
  const GITHUB_USERNAME = github.username;

  return (
    <section id="github-repos">
      <div className="github-container">
        <h2>Featured GitHub Repositories</h2>
          <ul className="repos-list">
            {featuredRepos.map(repo => (
              <li key={repo.id} className="repo-item">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                  <span className="repo-name">{repo.name}</span>
                </a>
                <p className="repo-description">{repo.description}</p>
              </li>
            ))}
          </ul>
      </div>
    </section>
  );
};

export default GithubRepos;