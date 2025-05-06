import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const linkStyle = ({ isActive }) => ({
        display: 'block',
        margin: '0.5rem 0',
        color: isActive ? 'blue' : 'black',
        fontWeight: isActive ? 'bold' : 'normal'
    })

    return (
        <aside style={{ width: '200px', padding: '1rem', background: '#f0f0f0' }}>
            <NavLink to="/lab1" style={linkStyle}>Лабораторная 1</NavLink>
            <NavLink to="/lab2" style={linkStyle}>Лабораторная 2</NavLink>
            <NavLink to="/lab3" style={linkStyle}>Лабораторная 3</NavLink>
            <NavLink to="/lab4" style={linkStyle}>Лабораторная 4</NavLink>
        </aside>
    )
}

export default Sidebar
