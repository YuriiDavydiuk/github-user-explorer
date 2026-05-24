import css from './UserCard.module.css';
import type { User } from '../../types/user.types';
import { useState } from 'react';

interface UserProfileProps {
  user: User;
}

export default function UserCard({ user }: UserProfileProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}?user=${user.login}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
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
      <button className={css.shareButton} onClick={handleShare}>
        {copied ? 'Copied' : 'Share'}
      </button>
    </div>
  );
}
