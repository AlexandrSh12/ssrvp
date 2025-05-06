const Button = ({ onClick, children, type = "button" }) => {
    return (
        <button type={type} onClick={onClick} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
            {children}
        </button>
    )
}
export default Button
