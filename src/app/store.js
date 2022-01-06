import { configureStore } from '@reduxjs/toolkit';
import redditSliceReducer from '../features/reddit/redditSlice';

export const store = configureStore({
    reducer: {
        reddit: redditSliceReducer
    },
});