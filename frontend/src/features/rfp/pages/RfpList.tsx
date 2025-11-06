import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRfps } from '../rfpSlice';

const RfpList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { rfps, loading } = useAppSelector((state) => state.rfp);

  useEffect(() => {
    dispatch(fetchRfps());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      draft: 'default',
      published: 'primary',
      closed: 'warning',
      awarded: 'success',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">RFPs</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/rfps/new')}
        >
          Create RFP
        </Button>
      </Box>

      <Grid container spacing={3}>
        {rfps.map((rfp) => (
          <Grid item xs={12} md={6} lg={4} key={rfp.id}>
            <Card
              sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
              onClick={() => navigate(`/rfps/${rfp.id}`)}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    {rfp.title}
                  </Typography>
                  <Chip label={rfp.status} color={getStatusColor(rfp.status)} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {rfp.rfpNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {rfp.description.substring(0, 100)}...
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Category: {rfp.category}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Deadline: {new Date(rfp.submissionDeadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {rfps.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No RFPs found
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/rfps/new')}
            sx={{ mt: 2 }}
          >
            Create Your First RFP
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RfpList;
