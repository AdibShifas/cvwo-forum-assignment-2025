import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

interface CreatePostFormProps {
  topicId: number;
  onPostCreated: () => void;
}

function CreatePostForm(props: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPost = {
      topic_id: props.topicId,
      title: title,
      content: content,
      author: author
    };

    fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Post created:', data);
        setTitle('');
        setContent('');
        setAuthor('');
        setIsSubmitting(false);
        props.onPostCreated();
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setIsSubmitting(false);
      });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        ✍️ Create New Post
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
          variant="outlined"
        />
        
        <TextField
          fullWidth
          label="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          margin="normal"
          variant="outlined"
          multiline
          rows={5}
        />
        
        <TextField
          fullWidth
          label="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          margin="normal"
          variant="outlined"
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </Button>
      </Box>
    </Paper>
  );
}

export default CreatePostForm;