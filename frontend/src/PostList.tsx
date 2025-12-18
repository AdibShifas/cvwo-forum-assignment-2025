import { useState, useEffect } from 'react';
import PostCard from './PostCard';
interface Post {
    id: number;
    topic_id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

interface PostListProps {
  topicId?: number;  // Optional: filter by topic
  refreshTrigger?: number; //trigger to refresh the list
}

function PostList(props: PostListProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
    // Build URL with optional topic filter
    let url = 'http://localhost:8080/posts';
    if (props.topicId) {
      url += `?topic_id=${props.topicId}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, [props.topicId, props.refreshTrigger]); 

    if (loading) {
    return <div style={{ padding: '20px' }}>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#888'
      }}>
        No posts yet. Be the first to post!
      </div>
    );
  }
  return (
    <div>
      {posts.map(post => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          createdAt={post.created_at}
        />
      ))}
    </div>
  );
}

export default PostList;