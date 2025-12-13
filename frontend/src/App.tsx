import TopicCard from './TopicCard';
import React, { useState, useEffect } from 'react';

interface Topic {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');

  // Fetch topics on load
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
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
  };

  //create new topic
  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault(); //prevent page refresh
    const newTopic = {
      name: newTopicName,
      description: newTopicDesc
    };
    fetch('http://localhost:8080/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTopic)
    })
      .then(response => response.json())
      .then(data => {
        // Add new topic to list
        setTopics([...topics, data]);
        // Clear form
        setNewTopicName('');
        setNewTopicDesc('');
      })
      .catch(error => {
        console.error('Error creating topic:', error);
      });
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading topics...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🚀 CVWO Forum</h1>
      <p>Built by Adib Shifas</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        ✅ Connected to Go backend
      </p>
      
      {/* Create Topic Form */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Create New Topic</h3>
        <form onSubmit={handleCreateTopic}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Topic name"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Description"
              value={newTopicDesc}
              onChange={(e) => setNewTopicDesc(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ➕ Create Topic
          </button>
        </form>
      </div>

      <h2>All Topics ({topics.length})</h2>
      
      {topics.length === 0 ? (
        <p>No topics yet!</p>
      ) : (
        topics.map((topic) => (
          <TopicCard 
            key={topic.id}
            name={topic.name}
            description={topic.description}
            postCount={0}
          />
        ))
      )}
    </div>
  );
}

export default App;