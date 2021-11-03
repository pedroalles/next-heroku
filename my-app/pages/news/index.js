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
        <div>
            {news.map(el => (
                <a key={el.url} href={el.url} target="_blank" rel="noreferrer">
                    <div className={styles.card}>
                        <h4>{el.site}</h4>
                        <h3>{el.title}</h3>
                    </div>
                </a>
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
