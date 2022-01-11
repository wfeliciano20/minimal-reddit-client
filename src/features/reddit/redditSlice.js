import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubreddits, getPostForSubreddit, getCommentsForPost } from '../../Api/redditApi.js';


const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        subreddits: [],
        posts: [],
        isLoading: false,
        error: false,
        selectedSubreddit: '/r/pics/',
        searchTerm: ''
    },
    reducers: {
        getSubredditsPending: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.subreddits = action.payload;
        },
        getSubredditsFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
        },
        getPostsPending: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.posts = action.payload;
        },
        getPostsFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
        },
        selectSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        startGetCommentsForPostPending: (state, action) => {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if (!state.posts[action.payload].showingComments) {
                return;
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].error = false;
        },
        getCommentsForPostSuccess: (state, action) => {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].error = false;
            state.isLoading = false;
            state.error = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsForPostFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
        },
        toggleShowingComments: (state, action) => {
            state.posts[action.payload.index].showingComments = !state.posts[action.payload.index].showingComments;
        }
    }
});

// action creators
export const {
    getSubredditsPending,
    getSubredditsSuccess,
    getSubredditsFailure,
    getPostsPending,
    getPostsSuccess,
    getPostsFailure,
    selectSubreddit,
    setSearchTerm,
    startGetCommentsForPostPending,
    getCommentsForPostSuccess,
    getCommentsForPostFailure,
    toggleShowingComments
} = redditSlice.actions;

// Selectors 
export const selectSubreddits = state => state.reddit.subreddits;
export const selectPosts = state => state.reddit.posts;
export const selectSelectedSubreddit = state => state.reddit.selectedSubreddit;
export const selectIsLoading = state => state.reddit.isLoading;
export const selectError = state => state.reddit.error;
export const selectSearchTerm = state => state.reddit.searchTerm;

// reducer
const redditSliceReducer = redditSlice.reducer;

export default redditSliceReducer;


// thunks
export const fetchSubreddits = () => async dispatch => {
    dispatch(getSubredditsPending());
    try {
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits));
    } catch (error) {
        dispatch(getSubredditsFailure());
    }
}

export const fetchPosts = (subreddit) => async dispatch => {
    dispatch(getPostsPending());
    try {
        const posts = await getPostForSubreddit(subreddit);
        const postWithMetadata = posts.map(post => {
            return {
                ...post,
                showingComments: false,
                loadingComments: false,
                errorComments: false,
                comments: []
            }
        });
        dispatch(getPostsSuccess(postWithMetadata));
    } catch (error) {
        dispatch(getPostsFailure());
    }
}


export const fetchCommentsForPost = (index, permalink) => async dispatch => {
    dispatch(startGetCommentsForPostPending(index));
    try {
        const comments = await getCommentsForPost(permalink);
        dispatch(getCommentsForPostSuccess({ index, comments }));
    } catch (error) {
        dispatch(getCommentsForPostFailure());
    }
}

export const selectPostsContainingSearchTerm = createSelector(
    //array of selectors
    [selectPosts, selectSearchTerm],
    // pass the state selected by the selectors
    (posts, searchTerm) => {
        // use logic to return filtered posts
        if (searchTerm) {
            return posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return posts;
    }
)