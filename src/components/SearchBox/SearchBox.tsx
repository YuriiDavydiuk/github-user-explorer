import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSubmit: (newSearchQuery: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    const cleanUsername = username.trim();

    if (cleanUsername) {
      onSubmit(username);
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
