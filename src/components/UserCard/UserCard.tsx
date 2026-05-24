import css from './UserCard.module.css';
import type { User } from '../../types/user.types';

interface UserProfileProps {
  user: User;
}

export default function UserCard({ user }: UserProfileProps) {
  return (
    <div className={css.userCard}>
      <img src={user.avatar_url} alt={user.name} className={css.avatar} />
      <h2 className={css.userName}>{user.name}</h2>
      {user.bio && <p className={css.userBio}>{user.bio}</p>}
      <ul className={css.stats}>
        <li>Repos: {user.public_repos}</li>
        <li>Followers: {user.followers}</li>
        <li>Following: {user.following}</li>
      </ul>
    </div>
  );
}
