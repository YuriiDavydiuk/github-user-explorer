// Style
import css from './App.module.css';

// Standart & types
import { useState } from 'react';

// Components
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearch = (username: string) => {
    setSearchQuery(username);
    console.log('Searching for:', username);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>{<SearchBox onSubmit={handleSearch} />}</header>
    </div>
  );
}
