import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ForumIcon from '@mui/icons-material/Forum';

interface TopicCardProps {
  name: string;
  description: string;
  postCount: number;
}

function TopicCard(props: TopicCardProps) {
  return (
    <Card 
      sx={{ 
        marginBottom: 2,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <CardActionArea>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {props.name}
            </Typography>
            <Chip 
              icon={<ForumIcon />} 
              label={`${props.postCount} posts`}
              color="primary"
              size="small"
            />
          </div>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TopicCard;