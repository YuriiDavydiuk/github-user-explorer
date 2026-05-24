import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>CitHub User Explorer {new Date().getFullYear()}</p>
    </footer>
  );
}
