import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home({ port }) {

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const audio_url = "https://protettordelinks.com/wp-content/audiosparazap/hino_do_gremio.mp3"

  // const audio_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true);
    const url = `https://gremio-news.herokuapp.com/api/news2`
    const res = await fetch(url)
    const data = await res.json()
    setNews(data)
    setIsLoading(false);
    console.log(data);
  }

  if (isLoading) return <p>Buscando as quentinhas do tricolor...</p>

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

// Home.getInitialProps = async () => {
//   const port = process.env.PORT || 3000;
//   console.log('port on getInitialProps', port);
//   const url = `http://localhost:${port}/api/news2`
//   const res = await fetch(url)
//   const data = await res.json()
//   return {
//     data,
//   }
// }

// Home.getInitialProps = async () => {
//   const port = process.env.PORT || 3000;
//   console.log('port on getInitialProps', port);
//   return {
//     port,
//   }
// }