import '../App.css';

const Header = () => {
  const logout = () => {
      localStorage.removeItem('user');
      window.location = '/';
  }
  return (
    <div className="header">
        <button className="header-button" onClick={logout}>
            logout
        </button>
    </div>
  )
}

export default Header;
