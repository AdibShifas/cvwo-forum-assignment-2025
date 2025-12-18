interface PostCardProps {
    title: string;
    content: string;
    author: string;
    createdAt: string;
}

function PostCard(props: PostCardProps) {
    //format date
    const date = new Date(props.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
    });
    return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{props.title}</h3>
      <p style={{ 
        color: '#555', 
        margin: '10px 0',
        whiteSpace: 'pre-wrap'
      }}>
        {props.content}
      </p>
      <div style={{ 
        fontSize: '12px', 
        color: '#888',
        marginTop: '10px',
        display: 'flex',
        gap: '15px'
      }}>
        <span>👤 {props.author}</span>
        <span>📅 {formattedDate}</span>
      </div>
    </div>
  );
}

export default PostCard;
    
    
