import React, {useState} from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        });
        setContent('')
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div class="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} type="text" class="form-control" />
                </div>
                <button class="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}