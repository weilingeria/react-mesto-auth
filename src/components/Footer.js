export default function Footer() {
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; {getYear()} Валерочка</p>
    </footer>
  );
}
