export const upvoteFeed = (payload) => ({
  type: 'UPVOTE_FEED',
  payload,
});

export const bookmarkFeed = (id) => ({
  type: 'BOOKMARK_FEED',
  id,
});

export const unBookmarkFeed = (id) => ({
  type: 'UNBOOKMARK_FEED',
  id,
});
