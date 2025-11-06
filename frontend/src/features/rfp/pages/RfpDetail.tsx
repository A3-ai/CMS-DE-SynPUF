import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRfpById, deleteRfp } from '../rfpSlice';

const RfpDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentRfp, loading } = useAppSelector((state) => state.rfp);

  useEffect(() => {
    if (id) {
      dispatch(fetchRfpById(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this RFP?')) {
      await dispatch(deleteRfp(id));
      navigate('/rfps');
    }
  };

  if (loading || !currentRfp) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{currentRfp.title}</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ mr: 1 }}
            onClick={() => navigate(`/rfps/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box mb={2}>
                <Typography variant="overline" color="text.secondary">
                  RFP Number
                </Typography>
                <Typography variant="body1">{currentRfp.rfpNumber}</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="overline" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">{currentRfp.description}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="overline" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">{currentRfp.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="overline" color="text.secondary">
                    Status
                  </Typography>
                  <Box>
                    <Chip label={currentRfp.status} color="primary" size="small" />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {currentRfp.evaluationCriteria && currentRfp.evaluationCriteria.length > 0 && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Evaluation Criteria
                </Typography>
                {currentRfp.evaluationCriteria.map((criterion: any, index: number) => (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1">{criterion.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Weight: {criterion.weight}% | Max Score: {criterion.maxScore}
                    </Typography>
                    {criterion.description && (
                      <Typography variant="body2">{criterion.description}</Typography>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>

              <Box mb={2}>
                <Typography variant="overline" color="text.secondary">
                  Issue Date
                </Typography>
                <Typography variant="body1">
                  {new Date(currentRfp.issueDate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="overline" color="text.secondary">
                  Submission Deadline
                </Typography>
                <Typography variant="body1">
                  {new Date(currentRfp.submissionDeadline).toLocaleDateString()}
                </Typography>
              </Box>

              {currentRfp.budgetMin && currentRfp.budgetMax && (
                <Box mb={2}>
                  <Typography variant="overline" color="text.secondary">
                    Budget Range
                  </Typography>
                  <Typography variant="body1">
                    ${currentRfp.budgetMin.toLocaleString()} - $
                    {currentRfp.budgetMax.toLocaleString()}
                  </Typography>
                </Box>
              )}

              <Box mb={2}>
                <Typography variant="overline" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {new Date(currentRfp.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RfpDetail;
