import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true);
    const url = `https://gremio-news.herokuapp.com/api/news`
    const res = await fetch(url)
    const data = await res.json()
    setNews(data)
    setIsLoading(false);
    console.log(data);
  }

  if (isLoading) return (
    <div className={styles.loading}>
      <div className={styles.loadinglogo}></div>
      <h3 className={styles.loadingmessage}>Aguarde</h3>
    </div>
  )

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
