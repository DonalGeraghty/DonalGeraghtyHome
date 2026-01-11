import React from 'react'

const NumberList = () => {
    const numbers = [1, 2, 3, 4, 5]
    return (
        <ul className="number-list">
            {numbers.map(num => (
                <li key={num}>{num}</li>
            ))}
        </ul>
    )
}

export default NumberList
