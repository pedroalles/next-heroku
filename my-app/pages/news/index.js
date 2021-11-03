import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function News({ data }) {

    const [news, setNews] = useState([]);

    // const audio_url = "https://protettordelinks.com/wp-content/audiosparazap/hino_do_gremio.mp3"

    // const audio_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

    useEffect(() => {
        setNews(data)
    }, [])

    return (
        <div className={styles.container}>
            {news.map(el => (
                <div key={el.url} className={styles.card}>
                    <a href={el.url} target="_blank" rel="noreferrer">
                        <h6 className={styles.site}>{el.site}</h6>
                        <h4 className={styles.title}>{el.title}</h4>
                    </a>
                </div>
            ))}
        </div>
    )
}

News.getInitialProps = async () => {
    const port = process.env.PORT || 3000;
    const url = `http://localhost:${port}/api/news`
    const res = await fetch(url)
    const data = await res.json()
    return {
        data,
    }
}