import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import Feed from '../components/Feed';
import axios from 'axios';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      page: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = () => {
    console.log('fetch', this.state.page);
    axios
      .get(`https://hn.algolia.com/api/v1/search?page=${this.state.page}`)
      .then((response) => {
        const newsList = response.data.hits;
        this.setState({newsList});
      });
  };

  handleDeleteFeed = (index) => {
    let newsList = [...this.state.newsList];
    newsList.splice(index, 1);
    this.setState({newsList});
  };

  nextPage = () => {
    const page = this.state.page + 1;
    this.setState({page});
    this.fetchNews();
  };

  previousPage = () => {
    const page = this.state.page - 1;
    this.setState({page});
    this.fetchNews();
  };

  render() {
    const prev =
      this.state.page === 0 ? (
        <Text />
      ) : (
        <TouchableOpacity
          onPress={() => this.previousPage()}
          style={{...styles.row, alignItems: 'center'}}>
          <Icon name="chevron-left" size={10} />
          <Text style={{...styles.paginationText, marginLeft: 5}}>Prev</Text>
        </TouchableOpacity>
      );

    return (
      <View>
        <View style={styles.paginationRow}>
          {prev}
          <TouchableOpacity
            onPress={() => this.nextPage()}
            style={{...styles.row, alignItems: 'center'}}>
            <Text style={{...styles.paginationText, marginRight: 5}}>Next</Text>
            <Icon name="chevron-right" size={10} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.newsList}
          renderItem={({item, index}) => (
            <Feed
              news={item}
              index={index}
              key={index}
              page={this.state.page}
              bookmarked={this.props.bookmarks.includes(item.id)}
              deleteFeed={this.handleDeleteFeed}
            />
          )}
          contentContainerStyle={{paddingBottom: 220}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  paginationText: {
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  const {bookmarks} = state;
  return {bookmarks};
};

export default connect(mapStateToProps)(HomeScreen);
