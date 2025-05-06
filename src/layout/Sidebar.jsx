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
            <NavLink to="/lab5" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 5
            </NavLink>
            <NavLink to="/lab6" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 6
            </NavLink>
            <NavLink to="/lab7" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 7
            </NavLink>
            <NavLink to="/lab8" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 8
            </NavLink>
            <NavLink to="/lab9" className={({ isActive }) => isActive ? 'active' : ''}>
                Лабораторная 9
            </NavLink>
        </aside>
    )
}

export default Sidebar