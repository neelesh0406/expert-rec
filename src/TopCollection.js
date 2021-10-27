import React from 'react'

export default function TopCollection(props) {
    const { top, handleTopQuery } = props;
    return (
        <li onMouseEnter={() => handleTopQuery(top.name)} >{top.name}</li>
    )
}
