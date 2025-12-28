import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TopicCard from './TopicCard';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import Login from './Login';

interface Topic {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUsername = localStorage.getItem('cvwo_username');
    if (savedUsername) {
      setCurrentUser(savedUsername);
    }
    setLoading(false);
  }, []);

  // Fetch topics when user is logged in
  useEffect(() => {
    if (currentUser) {
      fetch('http://localhost:8080/topics')
        .then(response => response.json())
        .then(data => {
          setTopics(data);
        })
        .catch(error => {
          console.error('Error fetching topics:', error);
        });
    }
  }, [currentUser]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('cvwo_username', username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cvwo_username');
    setSelectedTopicId(null);
  };

  const handlePostCreated = () => {
    setRefreshCounter(prev => prev + 1);
  };

  // Show login screen if not logged in
  if (!currentUser) {
    if (loading) {
      return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Container>
      );
    }
    return <Login onLogin={handleLogin} />;
  }

  // Posts view
  if (selectedTopicId) {
    const selectedTopic = topics.find(t => t.id === selectedTopicId);
    
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              🚀 CVWO Forum
            </Typography>
            <Typography variant="body1" sx={{ mr: 2 }}>
              👤 {currentUser}
            </Typography>
            <Button 
              color="inherit" 
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

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
            currentUser={currentUser}
            onPostCreated={handlePostCreated}
          />
          
          <Typography variant="h5" gutterBottom>
            Posts
          </Typography>
          <PostList 
            topicId={selectedTopicId}
            currentUser={currentUser}
            refreshTrigger={refreshCounter}
          />
        </Container>
      </>
    );
  }

  // Topics view
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🚀 CVWO Forum
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            👤 {currentUser}
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome, {currentUser}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Choose a topic to start discussing
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
    </>
  );
}

export default App;