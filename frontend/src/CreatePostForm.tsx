import { useState } from "react";
interface CreatePostFormProps {
    topicId: number;
    onPostCreated: () => void;
}

function CreatePostForm(props: CreatePostFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
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

        fetch("http://localhost:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Post created:", data);
            // Clear form
            setTitle('');
            setContent('');
            setAuthor('');
            setIsSubmitting(false);
            // Notify parent component
            props.onPostCreated();
        })
        .catch(error => {
            console.error("Error creating post:", error);
            setIsSubmitting(false);
        });
    };
    return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3>✍️ Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          {isSubmitting ? '📤 Creating...' : '📝 Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;