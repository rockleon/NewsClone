// import {combineReducers} from 'redux';

const INITIAL_STATE = {
  upvotes: [],
  bookmarks: [],
};

const feedsReducer = (state = INITIAL_STATE, action) => {
  let {upvotes, bookmarks} = state;
  let newState;
  switch (action.type) {
    case 'UPVOTE_FEED':
      upvotes.push(action.payload);
      newState = {upvotes, bookmarks};
      console.log('state', newState);
      return newState;

    case 'BOOKMARK_FEED':
      let flag = true;
      for (const id of bookmarks) {
        if (id === action.id) {
          flag = false;
          break;
        }
      }
      if (flag) bookmarks.push(action.id);
      newState = {upvotes, bookmarks};
      return newState;

    case 'UNBOOKMARK_FEED':
      const index = bookmarks.indexOf(action.id);
      if (index !== -1) bookmarks.splice(index, 1);
      newState = {upvotes, bookmarks};
      return newState;

    default:
      return state;
  }
};

// export default combineReducers({
//   feeds: feedsReducer,
// });

export default feedsReducer;
