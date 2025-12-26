import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';

interface CommentCardProps {
  content: string;
  author: string;
  createdAt: string;
}

function CommentCard(props: CommentCardProps) {
  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card 
      sx={{ 
        marginBottom: 1.5,
        marginLeft: 4,
        backgroundColor: '#f9f9f9'
      }}
    >
      <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
        <Typography 
          variant="body2" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            marginBottom: 1.5
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

export default CommentCard;