// Define what props this component accepts
interface TopicCardProps {
  name: string;
  description: string;
  postCount: number;
}

function TopicCard(props: TopicCardProps) {
    return (
        <div style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <small>📝 {props.postCount} posts</small>
        </div>
    );
}

export default TopicCard;