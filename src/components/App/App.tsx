// Style
import css from './App.module.css';

// HTTP & Services
import { getUserRepos, getUsers } from '../../services/userService';

// Standart & types
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Components
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBox from '../SearchBox/SearchBox';
import UserCard from '../UserCard/UserCard';
import RepoList from '../RepoList/RepoList';
import Footer from '../Footer/Footer';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return 'User not found. Please check the username';
  }
  return 'Network error. Please check your connection';
};

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
    error: userError,
  } = useQuery({
    queryKey: ['user', searchQuery],
    queryFn: () => getUsers(searchQuery),
    enabled: searchQuery !== '',
    retry: false,
    networkMode: 'always',
  });

  const { data: reposData, isLoading: isReposLoading } = useQuery({
    queryKey: ['repos', searchQuery],
    queryFn: () => getUserRepos(searchQuery),
    enabled: searchQuery !== '' && isUserSuccess,
    retry: false,
    networkMode: 'always',
  });

  const isLoading = isUserLoading || isReposLoading;

  return (
    <div className={css.wrapper}>
      <header className={css.toolbar}>
        <SearchBox onSubmit={handleSearch} />
      </header>
      <main className={css.app}>
        {isLoading && <Loader />}
        {isUserError && <ErrorMessage message={getErrorMessage(userError)} />}
        {isUserSuccess && userData && (
          <div className={css.content}>
            <UserCard user={userData} />
            {reposData && <RepoList repos={reposData} />}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
