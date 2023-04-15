import React, {useState, useEffect} from 'react'

const Fetch = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])

    return (
        <div>
            {props.name}
            <ul>
                {
                    posts.map(post => 
                    <li key={post.id}>{post.title}</li>
                    )
                }
            </ul>

        </div>
    )
}

export default Fetch;