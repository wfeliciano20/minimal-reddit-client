const API_ROOT = 'https://www.reddit.com';

export const getSubreddits = async() => {
    const response = await fetch(`${API_ROOT}/subreddits.json`)
    const json = response.json();
    return json.data.children.map(subreddit => subreddit.data);

}

export const getPostForSubreddit = async(subreddit) => {
    const response = fetch(`${API_ROOT}${subreddit}.json`);
    const json = response.json();
    return json.data.children.map(post => post.data);
}

export const getCommentsForPost = async(permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`)
    const json = response.json();
    return json[1].data.children.map((subreddit) => subreddit.data);
}