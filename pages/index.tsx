import type { NextPage } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Post } from '../types'


interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {
          posts.map(post => (
            <div key={post.id} style={{ border: "4px solid goldenrod", margin: "20px", padding: '40px', }}>
              <h3>{post.title}</h3>
              <p>{post.body.slice(0, 250)}</p>
              <Link href={`/${post.id}`} passHref>
                <button style={{ cursor: "pointer" }}>See More</button>
              </Link>
            </div>
          ))
        }
      </div>
      <p>{posts.length}</p>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await res.json()
  return {
    props: { posts }
  }
}

export default Home
