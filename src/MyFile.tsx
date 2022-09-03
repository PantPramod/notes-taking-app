import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from './MyFile.module.css'

const MyFile = () => {
    const [data, setData] = useState('');
    const { filename } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const d = await fetch(`https://fs-node-crud.herokuapp.com/read/${filename}`)
            const da = await d.text()
            setData(da)
        }

        fetchData()
    }, [filename])

    return (
        <div className={styles.myfile}>
            <h1>{filename}</h1>
            <Link to={`/edit/${filename}`} className={styles.edit}>Edit File</Link>
            <div className={styles.content}>
                <p>{data}</p>
            </div>
        </div>
    )
}

export default MyFile
