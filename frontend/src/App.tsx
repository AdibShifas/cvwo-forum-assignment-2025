import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TopicCard from './TopicCard';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import '@fontsource/inter/400.css'; // Regular
import '@fontsource/inter/700.css'; // Bold
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    // Set the global font family
    fontFamily: [
      'Inter',         // Your custom font
      'sans-serif',    // Fallback
    ].join(','),
  },
});

interface Topic {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/topics')
      .then(response => response.json())
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
        setLoading(false);
      });
  }, []);

  const handlePostCreated = () => {
    setRefreshCounter(prev => prev + 1);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Posts view
  if (selectedTopicId) {
    const selectedTopic = topics.find(t => t.id === selectedTopicId);
    
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => setSelectedTopicId(null)}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          Back to Topics
        </Button>
        
        <Typography variant="h3" component="h1" gutterBottom>
          📝 {selectedTopic?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {selectedTopic?.description}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <CreatePostForm 
          topicId={selectedTopicId} 
          onPostCreated={handlePostCreated}
        />
        
        <Typography variant="h5" gutterBottom>
          Posts
        </Typography>
        <PostList 
          topicId={selectedTopicId} 
          refreshTrigger={refreshCounter}
        />
      </Container>
    );
  }

  // Topics view
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography sx={{ fontFamily: 'monospace' }} variant="h2" component="h1" gutterBottom fontWeight={700} >
          🚀 CVWO Forum
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Built by Adib Shifas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ✅ Go Backend + React Frontend + PostgreSQL
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h4" gutterBottom>
        Topics ({topics.length})
      </Typography>
      
      {topics.length === 0 ? (
        <Typography color="text.secondary">No topics yet!</Typography>
      ) : (
        <Box>
          {topics.map(topic => (
            <div 
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              style={{ cursor: 'pointer' }}
            >
              <TopicCard 
                name={topic.name}
                description={topic.description}
                postCount={0}
              />
            </div>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default App;