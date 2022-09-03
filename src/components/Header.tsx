import React from 'react'
import { MdSearch } from 'react-icons/md'
import styles from './Header.module.css'

type prototype = {
  search: string,
  setSearch: (arg0: string) => void,
  startSearch:()=>void
}
const Header = ({ search, setSearch , startSearch}: prototype) => {
  return (
    <div className={styles.header}>
      
      <h1>Notes</h1>
      <div className={styles.search}>
        <input type="text" placeholder='Search file' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type='button' onClick={()=>startSearch()}><MdSearch /></button>
      </div>
    </div>
  )
}

export default Header
