import css from './SearchBox.module.css';
import { useEffect, useRef } from 'react';

interface SearchBoxProps {
  onSubmit: (newSearchQuery: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');
    if (user && inputRef.current) {
      inputRef.current.value = user;
      onSubmit(user);
    }
  }, [onSubmit]);

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    const cleanUsername = username.trim();

    if (cleanUsername) {
      onSubmit(cleanUsername);
    }
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Enter GitHub username"
        name="username"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
function userRef<T>(arg0: null) {
  throw new Error('Function not implemented.');
}
