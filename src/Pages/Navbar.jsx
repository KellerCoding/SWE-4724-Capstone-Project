import "./Navbar.css"

export function Navbar() {
    // Green top bar with back link and brand
    return (
        <nav className="navbar">
            <div className="back-to-gwatch"><a href="https://georgiawatch.org/">Back to Georgia Watch</a></div>
            <div className="navbar-brand">
               <strong>PROTECTING CONSUMERS SINCE 2002 </strong>
            </div>
        </nav>
    )
}
