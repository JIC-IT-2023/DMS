import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { border } from '@mui/system';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  designation: 'UI & UX Designer',
  name: 'Anika',
  empid: ' ID : EP032156'
};

export const AccountProfile = () => (
  <Card sx={{ backgroundColor: '#EDF0F6' }}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 150,
            mb: 2,
            width: 150,
            border: 3.5,
            borderColor: '#2176FF'
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.designation}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.empid}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);
