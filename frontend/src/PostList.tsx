import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
  topicId?: number;
  currentUser: string;
  refreshTrigger?: number;
}

function PostList(props: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
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
    return <Typography variant="body2">Loading posts...</Typography>;
  }

  if (posts.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        No posts yet. Be the first to post!
      </Typography>
    );
  }

  return (
    <Box>
      {posts.map(post => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          createdAt={post.created_at}
          currentUser={props.currentUser}
        />
      ))}
    </Box>
  );
}

export default PostList;