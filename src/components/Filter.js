import React from 'react'

function Filter(props) {
  return (
    <div>
      Sort By:  
      <select className="ui dropdown" onChange={(e) => props.handleSort(e)}>
        <option value="nosort">-</option>
        <option value="name">name</option>
        <option value="hp">hp</option>
      </select>
    </div>
  )
}

export default Filter
