import React, {useState} from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://posts.com/posts/create', {
                title
            }); 
        } catch (e) {
            alert('You post didnt get posted!')
        };
        setTitle('');
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group row">
                    <label for="exampleFormControlInput1" className="form-label">title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        className="form-control" 
                        id="exampleFormControlInput1" />
                </div>
                <div className="row">
                    <button class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
};

export default PostCreate;