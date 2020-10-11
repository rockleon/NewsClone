import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {upvoteFeed, bookmarkFeed, unBookmarkFeed} from '../store/actions';
import moment from 'moment';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleHideFeed = (index) => {
    this.props.deleteFeed(index);
  };

  handleUpvote = (id) => {
    console.log(id);
    const payload = {
      id,
      timestamp: moment.now(),
    };
    this.props.upvoteFeed(payload);
  };

  handleBookmark = (id) => {
    this.props.bookmarkFeed(id);
  };

  handleUnBookmark = (id) => {
    this.props.unBookmarkFeed(id);
  };

  render() {
    const {news, index, page, bookmarked} = this.props;

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.count}>{20 * page + index + 1}.</Text>
            <Icon
              name="triangle"
              size={15}
              style={{...styles.count, paddingTop: 3, paddingRight: 5}}
              onPress={() => this.handleUpvote(news.objectId)}
            />
          </View>
          <View>
            <View
              style={{
                ...styles.row,
                alignItems: 'center',
                width: '95%',
              }}>
              <Text style={styles.font16}>
                {news.title} &nbsp;
                <Text
                  style={{
                    ...styles.font12,
                    ...styles.description,
                  }}>
                  ({news.url})
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{...styles.font12, ...styles.description}}>
                {news.points} points by {news.author} |{' '}
              </Text>
              <TouchableOpacity onPress={() => this.handleHideFeed(index)}>
                <Text style={{...styles.font12, ...styles.description}}>
                  hide |{' '}
                </Text>
              </TouchableOpacity>
              <Text style={{...styles.font12, ...styles.description}}>
                {news.num_comments} comments | {bookmarked}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    paddingBottom: 0,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  description: {
    color: 'grey',
  },
  count: {
    color: 'grey',
    paddingRight: 10,
    paddingTop: 1,
  },
  font16: {
    fontSize: 16,
  },
  font12: {
    fontSize: 12,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      upvoteFeed,
      bookmarkFeed,
      unBookmarkFeed,
    },
    dispatch,
  );

export default connect(undefined, mapDispatchToProps)(Feed);
