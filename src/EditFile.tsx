import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './EditFile.module.css'
import { AiOutlineSave } from 'react-icons/ai'
const EditFile = () => {
    // const [data, setData] = useState('');
    const { filename } = useParams()
    const [text, setText] = useState('')
    
    const url = `https://fs-node-crud.herokuapp.com/read/${filename}`

    useEffect(() => {
        const fetchData = async () => {
            const d = await fetch(url)
            const da = await d.text()
            console.log(da)
            setText((prev)=>da)
        }
               
        fetchData()
    }, [url])

    const save = async () => {

        //   ========================================================================
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const res=   await fetch(`https://fs-node-crud.herokuapp.com/write/${filename}`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                data: text
            })
        })

            const result =  await res.text();
            setText(result)
            result && alert("saved")
        //   ==========================================================================
    }

    return (
        <div className={styles.editfile}>
            <h1>{filename}</h1>
            <div className={styles.content}>

                <textarea placeholder='write text here' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <div className={styles.save} onClick={save}>
                    <AiOutlineSave color='white' size={25} />
                </div>

            </div>

        </div>
    )
}

export default EditFile
