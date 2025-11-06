import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const RFP_API_URL = 'http://localhost:3002/api/v1';

interface Rfp {
  id: string;
  title: string;
  description: string;
  rfpNumber: string;
  category: string;
  status: string;
  budgetMin?: number;
  budgetMax?: number;
  issueDate: string;
  submissionDeadline: string;
  evaluationCriteria: any[];
  createdAt: string;
}

interface RfpState {
  rfps: Rfp[];
  currentRfp: Rfp | null;
  loading: boolean;
  error: string | null;
}

const initialState: RfpState = {
  rfps: [],
  currentRfp: null,
  loading: false,
  error: null,
};

export const fetchRfps = createAsyncThunk('rfp/fetchAll', async () => {
  const response = await axios.get(`${RFP_API_URL}/rfps`);
  return response.data.data;
});

export const fetchRfpById = createAsyncThunk('rfp/fetchById', async (id: string) => {
  const response = await axios.get(`${RFP_API_URL}/rfps/${id}`);
  return response.data.data;
});

export const createRfp = createAsyncThunk('rfp/create', async (rfpData: any) => {
  const response = await axios.post(`${RFP_API_URL}/rfps`, rfpData);
  return response.data.data;
});

export const updateRfp = createAsyncThunk(
  'rfp/update',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await axios.patch(`${RFP_API_URL}/rfps/${id}`, data);
    return response.data.data;
  },
);

export const deleteRfp = createAsyncThunk('rfp/delete', async (id: string) => {
  await axios.delete(`${RFP_API_URL}/rfps/${id}`);
  return id;
});

const rfpSlice = createSlice({
  name: 'rfp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRfps.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRfps.fulfilled, (state, action: PayloadAction<Rfp[]>) => {
        state.loading = false;
        state.rfps = action.payload;
      })
      .addCase(fetchRfps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch RFPs';
      })
      .addCase(fetchRfpById.fulfilled, (state, action: PayloadAction<Rfp>) => {
        state.currentRfp = action.payload;
      })
      .addCase(createRfp.fulfilled, (state, action: PayloadAction<Rfp>) => {
        state.rfps.push(action.payload);
      })
      .addCase(deleteRfp.fulfilled, (state, action: PayloadAction<string>) => {
        state.rfps = state.rfps.filter((rfp) => rfp.id !== action.payload);
      });
  },
});

export default rfpSlice.reducer;
