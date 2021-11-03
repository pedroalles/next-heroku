import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home({ data }) {

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getNews()
    // setNews(data)
  }, [])

  const getNews = async () => {
    setIsLoading(true)
    const url = `http://localhost:${process.env.PORT || 3000}/api/news2`
    // const url = 'http://gremio-news.herokuapp.com/api/news2'
    console.log('url', url);
    const res = await fetch(url)
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

// Home.getInitialProps = async () => {
//   console.log('fetching data...');
//   const url = `http://localhost:${process.env.PORT || 3000}/api/news`
//   // const url = 'https://gremio-news.herokuapp.com/api/news2'
//   // const url = 'http://localhost:3000/api/news2'
//   const res = await fetch(url)
//   const data = await res.json()
//   console.log(data.length);
//   return {
//     data,
//   }
// }