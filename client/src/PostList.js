import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        // local test: localhost:4002
        // ingress: posts.com
        const res = await axios.get('http://posts.com/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts)
        .map(post => {
            return <div 
                className='card' 
                style={{ width:"30%", marginBottom: '20px'}}
                key={post.id}
                >
                    <div class="card-body">
                        <h3>{post.title}</h3>
                        <CommentList comments={post.comments} />
                        <CommentCreate postId={post.id} />
                    </div>
            </div>
        });

    return (
        <div className='d-flex flex-row justify-content-between flex-wrap'>
            {renderedPosts}
        </div>
    )
}