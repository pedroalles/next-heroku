import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

const isProd = process.env.NODE_ENV === 'production'

export default function Home() {

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let url;
    if (isProd) {
      url = `https://gremio-news.herokuapp.com/api/news2`
    } else {
      url = `http://localhost:3000/api/news2`
    }

    const res = await fetch(url)
    const data = await res.json()

    setNews(data)
    setIsLoading(false);
  }

  if (isLoading) return (
    <div className={styles.loading}>
      <div className={styles.loadinglogo}></div>
      <h3 className={styles.loadingmessage}>Aguarde</h3>
    </div>
  )

  const filteredData = news.filter(el => el.title.toLowerCase().includes(filter.toLowerCase())
    || el.site.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className={styles.container}>

      <input
        className={styles.search}
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredData.length > 0 ? filteredData.map(el => (
        <div key={el.url} className={styles.card}>
          <a href={el.url} target="_blank" rel="noreferrer">
            <h6 className={styles.site}>{el.site}</h6>
            <h4 className={styles.title}>{el.title}</h4>
          </a>
        </div>
      ))
        : <h2 className={styles.noresults}>Nenhum resultado.</h2>}

    </div>
  )
}
