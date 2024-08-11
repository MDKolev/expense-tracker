import React from 'react'
import './filter.css'

const Filter = () => {
  return (
    <div className='filter-panel'>
      <button>Sort by name</button>
      <button>Sort by amount</button>
      <button>Sort by date</button>
    </div>
  )
}

export default Filter
