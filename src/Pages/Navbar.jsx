import "./Navbar.css"
export function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                PROTECTING CONSUMERS SINCE 2002
            </div>
            <label htmlFor='menu' tabIndex="0">
               ☰
            </label>
            <input id='menu' type='checkbox' />
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="" className="nav-link">ABOUT</a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">MEDIA</a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">CONTACT</a>
                </li>
            </ul>
            <div className="search-container">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
            </div>
        </nav>
    )
}