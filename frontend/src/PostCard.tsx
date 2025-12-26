import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Divider from '@mui/material/Divider';
import CommentList from './CommentList';
import CreateCommentForm from './CreateCommentForm';

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

function PostCard(props: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);

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
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
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

        <Button
          size="small"
          startIcon={showComments ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          endIcon={<CommentIcon />}
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>

        <Collapse in={showComments}>
          <Divider sx={{ my: 2 }} />
          
          <CreateCommentForm 
            postId={props.id}
            onCommentCreated={() => setRefreshComments(prev => prev + 1)}
          />
          
          <CommentList postId={props.id} refreshTrigger={refreshComments} />
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default PostCard;