import css from './RepoList.module.css';
import type { Repo } from '../../types/repo.types';

interface RepoListProps {
  repos: Repo[];
}

export default function RepoList({ repos }: RepoListProps) {
  if (repos.length === 0) {
    return <p className={css.noRepos}>This user has no public repositories</p>;
  }

  return (
    <div className={css.reposContainer}>
      <h3 className={css.title}>Latest Repositories</h3>
      <ul className={css.list}>
        {repos.map(repo => (
          <li key={repo.id} className={css.item}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <span className={css.stars}>⭐ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
