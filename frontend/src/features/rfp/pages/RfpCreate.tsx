import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { createRfp } from '../rfpSlice';

const RfpCreate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'IT',
    budgetMin: '',
    budgetMax: '',
    issueDate: new Date().toISOString().split('T')[0],
    submissionDeadline: '',
    evaluationCriteria: [
      { id: '1', name: 'Technical Capability', description: '', weight: 40, maxScore: 100 },
      { id: '2', name: 'Cost', description: '', weight: 30, maxScore: 100 },
      { id: '3', name: 'Experience', description: '', weight: 30, maxScore: 100 },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        createRfp({
          ...formData,
          budgetMin: formData.budgetMin ? parseFloat(formData.budgetMin) : undefined,
          budgetMax: formData.budgetMax ? parseFloat(formData.budgetMax) : undefined,
          issueDate: new Date(formData.issueDate),
          submissionDeadline: new Date(formData.submissionDeadline),
        }),
      ).unwrap();
      navigate('/rfps');
    } catch (error) {
      console.error('Failed to create RFP:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New RFP
      </Typography>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="RFP Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="construction">Construction</MenuItem>
                  <MenuItem value="professional_services">Professional Services</MenuItem>
                  <MenuItem value="goods">Goods</MenuItem>
                  <MenuItem value="consulting">Consulting</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  required
                  label="Submission Deadline"
                  name="submissionDeadline"
                  value={formData.submissionDeadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum Budget"
                  name="budgetMin"
                  value={formData.budgetMin}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum Budget"
                  name="budgetMax"
                  value={formData.budgetMax}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => navigate('/rfps')}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Create RFP
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RfpCreate;
