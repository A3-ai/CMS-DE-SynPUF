import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRfps } from '../../rfp/rfpSlice';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { rfps } = useAppSelector((state) => state.rfp);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRfps());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total RFPs',
      value: rfps.length,
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Active RFPs',
      value: rfps.filter((r) => r.status === 'published').length,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Vendors',
      value: 0,
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Evaluations',
      value: 0,
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your procurement activities
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/rfps/new')}
                >
                  Create New RFP
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/rfps')}
                >
                  View All RFPs
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/vendors')}
                >
                  Manage Vendors
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent RFPs
              </Typography>
              {rfps.slice(0, 5).map((rfp) => (
                <Box
                  key={rfp.id}
                  sx={{
                    py: 1,
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                  onClick={() => navigate(`/rfps/${rfp.id}`)}
                >
                  <Typography variant="body1">{rfp.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {rfp.rfpNumber} | {rfp.status}
                  </Typography>
                </Box>
              ))}
              {rfps.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  No RFPs yet. Create your first one!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
