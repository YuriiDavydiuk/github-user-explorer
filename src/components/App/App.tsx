// Style
import css from './App.module.css';

// HTTP & Services
import { getUserRepos, getUsers } from '../../services/userService';

// Standart & types
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Components
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBox from '../SearchBox/SearchBox';
import UserCard from '../UserCard/UserCard';
import RepoList from '../RepoList/RepoList';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (username: string) => {
    setSearchQuery(username);
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    isSuccess: isUserSuccess,
  } = useQuery({
    queryKey: ['user', searchQuery],
    queryFn: () => getUsers(searchQuery),
    placeholderData: keepPreviousData,
    enabled: searchQuery !== '',
    retry: false,
  });

  const { data: reposData, isLoading: isReposLoading } = useQuery({
    queryKey: ['repos', searchQuery],
    queryFn: () => getUserRepos(searchQuery),
    placeholderData: keepPreviousData,
    enabled: searchQuery !== '',
    retry: false,
  });

  const isLoading = isUserLoading || isReposLoading;
  const isError = isUserError;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>{<SearchBox onSubmit={handleSearch} />}</header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isUserSuccess && userData && <UserCard user={userData} />}
      {reposData && <RepoList repos={reposData} />}
    </div>
  );
}
