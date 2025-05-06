import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside>
            <NavLink to="/lab1" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 1
            </NavLink>
            <NavLink to="/lab2" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 2
            </NavLink>
            <NavLink to="/lab3" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 3
            </NavLink>
            <NavLink to="/lab4" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 4
            </NavLink>
        </aside>
    )
}

export default Sidebar