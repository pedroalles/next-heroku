import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Home({ data }) {

  const [news, setNews] = useState([]);

  const audio_url = "https://protettordelinks.com/wp-content/audiosparazap/hino_do_gremio.mp3"

  // const audio_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

  useEffect(() => {
    setNews(data)
  }, [])

  return (
    <div>
      <div>
        <ReactAudioPlayer
          src={audio_url}
          autoPlay
          controls
        />
      </div>
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

Home.getInitialProps = async () => {
  const port = process.env.PORT || 3000;
  const url = `http://localhost:${port}/api/news2`
  const res = await fetch(url)
  const data = await res.json()
  return {
    data,
  }
}
