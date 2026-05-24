import css from './RepoList.module.css';
import type { Repo } from '../../types/repo.types';

interface RepoListProps {
  repos: Repo[];
}

function sortByLatestFn(a: Repo, b: Repo) {
  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
}

function getLatestRepos(repos: Repo[], limit: number = 5) {
  return [...repos].sort(sortByLatestFn).slice(0, limit);
}

export default function RepoList({ repos }: RepoListProps) {
  const latestRepos = getLatestRepos(repos);

  if (latestRepos.length === 0) {
    return <p className={css.noRepos}>This user has no public repositiries</p>;
  }

  return (
    <div className={css.reposContainer}>
      <h3 className={css.title}>Latest Repositories</h3>
      <ul className={css.list}>
        {latestRepos.map(repo => (
          <li key={repo.id} className={css.item}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer ">
              {repo.name}
            </a>
            <span className={css.stars}>⭐ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
