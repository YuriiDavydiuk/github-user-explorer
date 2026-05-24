// Style
import css from './App.module.css';

// HTTP & Services
import { getUsers } from '../../services/userService';

// Standart & types
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Components
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBox from '../SearchBox/SearchBox';
import UserCard from '../UserCard/UserCard';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (username: string) => {
    setSearchQuery(username);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user', searchQuery],
    queryFn: () => getUsers(searchQuery),
    placeholderData: keepPreviousData,
    enabled: searchQuery !== '',
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>{<SearchBox onSubmit={handleSearch} />}</header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data && <UserCard user={data} />}
    </div>
  );
}
