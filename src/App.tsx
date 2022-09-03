import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import styles from './App.module.css';
import { AiOutlineFileText } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

function App() {
  const nav = useNavigate()
  const [files, setFiles] = useState<string[]>([]);
  const [showBox, setShowBox] = useState(false);
  const [filename, setFilename] = useState('')
  const [search, setSearch] = useState('');
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [searchedFiles, setSearchedFiles] = useState<string[]>([]);

  const fetchAllDirNames = async () => {
    const f = await fetch('https://fs-node-crud.herokuapp.com/')
    const res: string[] = await f.json();
    setFiles([...res])

  }


  useEffect(() => {

    fetchAllDirNames();

  }, [])

  const createFile = async () => {
    const d = await fetch(`https://fs-node-crud.herokuapp.com/createFile?filename=${filename}`)
    const res = await d.text();

    if (res === "This named File already exist") {
      alert(res);
    } else {
      setShowBox(false)
      fetchAllDirNames();
    }
    console.log(res);
  }

  const del = async (filename: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");


    await fetch(`https://fs-node-crud.herokuapp.com/${filename}`, {
      method: 'DELETE',
      headers: myHeaders,
    })
      .then(response => response.text())
      .then(result => fetchAllDirNames())
      .catch(error => console.log('error', error));
  }

  const startSearch = () => {
    setIsSearchOn(true)
    console.log(search)
    const filteredFiles = files.filter((file) => (file.toLowerCase() === `${search.toLowerCase()}.txt`) || (file.toLowerCase() === search.toLowerCase()))
    setSearchedFiles(filteredFiles)
  }

  return (
    <div className="app">
      <Header search={search} setSearch={setSearch} startSearch={startSearch} />

      <div className={styles.content}>
        {isSearchOn ? searchedFiles.map(file =>
          <div onClick={() => nav(`/edit/${file}`)} className={styles.file} key={file}>

            <AiOutlineFileText size={30} color="rgb(28, 27, 83)" />
            <p>{file}</p>
            <MdDelete onClick={(e) => { e.stopPropagation(); del(file) }} size={20} className={styles.del} />
          </div>
        ) :
          files.map(file =>
            <div onClick={() => nav(`/edit/${file}`)} className={styles.file} key={file}>

              <AiOutlineFileText size={30} color="rgb(28, 27, 83)" />
              <p>{file}</p>
              <MdDelete onClick={(e) => { e.stopPropagation(); del(file) }} size={20} className={styles.del} />
            </div>
          )}
      </div>
      {
        showBox &&
        <div className={styles.showbox}>
          <AiOutlineClose
            color="black"
            size={25}
            className={styles.close}
            onClick={() => setShowBox(false)}
          />
          <p>File Name </p>
          <input
            type="text"
            placeholder='filename'
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <button onClick={createFile}>Create</button>
        </div>
      }

      <div
        onClick={() => setShowBox(true)}
        className={styles.create}>
        +
      </div>
    </div>
  );
}

export default App;
