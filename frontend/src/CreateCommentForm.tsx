import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

interface CreateCommentFormProps {
  postId: number;
  currentUser: string;
  onCommentCreated: () => void;
}

function CreateCommentForm(props: CreateCommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newComment = {
      post_id: props.postId,
      content: content,
      author: props.currentUser
    };

    fetch('http://localhost:8080/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comment created:', data);
        setContent('');
        setIsSubmitting(false);
        props.onCommentCreated();
      })
      .catch(error => {
        console.error('Error creating comment:', error);
        setIsSubmitting(false);
      });
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        mt: 2, 
        mb: 2,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1
      }}
    >
      <TextField
        fullWidth
        label="Write a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        margin="dense"
        variant="outlined"
        multiline
        rows={3}
        size="small"
      />
      
      <Button
        type="submit"
        variant="contained"
        size="small"
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={16} /> : <SendIcon />}
        sx={{ mt: 1 }}
      >
        {isSubmitting ? 'Adding...' : 'Add Comment'}
      </Button>
    </Box>
  );
}

export default CreateCommentForm;