import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

function PostCard(props: PostCardProps) {
  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card 
      sx={{ 
        marginBottom: 2,
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {props.title}
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            marginBottom: 2
          }}
        >
          {props.content}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            icon={<PersonIcon />} 
            label={props.author}
            size="small"
            variant="outlined"
          />
          <Chip 
            icon={<CalendarTodayIcon />} 
            label={formattedDate}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;