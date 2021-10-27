import React from 'react'

export default function TopSearch(props) {
    const { top, handleTopQuery } = props;
    return (
        <li onMouseEnter={() => handleTopQuery(top.suggestion)}>{top.suggestion}</li>
    )
}
