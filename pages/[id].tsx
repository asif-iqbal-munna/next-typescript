import { GetStaticPaths } from 'next';
import React from 'react';
import { Post } from '../types';
interface Props {
    post: Post;
}
const singlePost = ({ post }: Props) => {
    const { title, body } = post
    return (
        <div style={{ margin: "100px auto", width: "500px" }}>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json()
    const paths = posts.map((post: Post) => ({
        params: {
            id: post.id.toString(),
        },
    }));
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        paths,
        fallback: false,
    };
}


export const getStaticProps = async ({ params }: { params: { id: string } }) => {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()

    // Pass post data to the page via props 
    return { props: { post } }
}

export default singlePost;