import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getNews()
  }, [])

  const getNews = async () => {
    setIsLoading(true)
    const res = await fetch(`http://localhost:${process.env.PORT || 3000}/api/news`)
    const data = await res.json()
    console.log(data);
    setNews(data)
    setIsLoading(false)
  }

  if (isLoading) {
    return <p>Buscando as quentinhas do tricolor...</p>
  }
  if (!news) {
    return <p>No news to show</p>
  }

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
