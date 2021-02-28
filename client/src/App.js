import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import CommentCreate from './CommentCreate';

const App = () => {
    return (
        <div className='container'>
            <h1>Cretae Post</h1>
            <PostCreate />
            <hr />
            <h1>Posts</h1>
            <PostList />
        </div>
    )
};

export default App;