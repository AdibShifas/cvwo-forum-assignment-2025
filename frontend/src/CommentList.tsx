import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommentCard from './CommentCard';

interface Comment {
  id: number;
  post_id: number;
  content: string;
  author: string;
  created_at: string;
}

interface CommentListProps {
  postId: number;
  refreshTrigger?: number;
}

function CommentList(props: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const url = `http://localhost:8080/comments?post_id=${props.postId}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setLoading(false);
      });
  }, [props.postId, props.refreshTrigger]);

  if (loading) {
    return <Typography variant="body2">Loading comments...</Typography>;
  }

  if (comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', ml: 4 }}>
        No comments yet. Be the first to comment!
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        💬 {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </Typography>
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          content={comment.content}
          author={comment.author}
          createdAt={comment.created_at}
        />
      ))}
    </Box>
  );
}

export default CommentList;