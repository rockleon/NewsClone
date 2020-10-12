// import {combineReducers} from 'redux';

const INITIAL_STATE = {
  upvotes: [],
  // upvotes: [
  //   {id: '11116274', timestamp: 1602527401226},
  //   {id: '11116274', timestamp: 1602527401778},
  //   {id: '3078128', timestamp: 1602527402831},
  //   {id: '13682022', timestamp: 1602527404523},
  //   {id: '13682022', timestamp: 1602527404952},
  //   {id: '3078128', timestamp: 1602527406059},
  //   {id: '3078128', timestamp: 1602527406227},
  //   {id: '3078128', timestamp: 1602527406362},
  //   {id: '3078128', timestamp: 1602527406575},
  //   {id: '5721088', timestamp: 1602527407700},
  //   {id: '23065782', timestamp: 1602527408565},
  //   {id: '23065782', timestamp: 1602527408769},
  //   {id: '3454180', timestamp: 1602527409881},
  //   {id: '3454180', timestamp: 1602527410053},
  //   {id: '3454180', timestamp: 1602527410269},
  // ],
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
