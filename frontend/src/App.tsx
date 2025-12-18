import { useState, useEffect } from 'react';
import TopicCard from './TopicCard';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';

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

  // Fetch topics when component loads
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

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  const handlePostCreated = () => {
    setRefreshCounter(prev => prev + 1);
  };

  // Posts view
  if (selectedTopicId) {
    const selectedTopic = topics.find(t => t.id === selectedTopicId);
    
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setSelectedTopicId(null)}
          style={{
            padding: '8px 16px',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Topics
        </button>
        
        <h1>📝 {selectedTopic?.name}</h1>
        <p style={{ color: '#666' }}>{selectedTopic?.description}</p>
        
        <hr style={{ margin: '20px 0' }} />
        
        <CreatePostForm 
          topicId={selectedTopicId} 
          onPostCreated={handlePostCreated}
        />
        
        <h2>Posts</h2>
        <PostList 
          topicId={selectedTopicId} 
          refreshTrigger={refreshCounter}
        />
      </div>
    );
  }

  // If a topic is selected, show its posts
  if (selectedTopicId) {
    const selectedTopic = topics.find(t => t.id === selectedTopicId);
    
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setSelectedTopicId(null)}
          style={{
            padding: '8px 16px',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Topics
        </button>
        
        <h1>📝 {selectedTopic?.name}</h1>
        <p style={{ color: '#666' }}>{selectedTopic?.description}</p>
        
        <hr style={{ margin: '20px 0' }} />
        
        <h2>Posts</h2>
        <PostList topicId={selectedTopicId} />
      </div>
    );
  }

  // Show topics list
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🚀 CVWO Forum</h1>
      <p>Built by Adib Shifas</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        ✅ Connected to Go backend + PostgreSQL
      </p>
      
      <h2>Topics ({topics.length})</h2>
      
      {topics.length === 0 ? (
        <p>No topics yet!</p>
      ) : (
        topics.map(topic => (
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
        ))
      )}
    </div>
  );
}

export default App;