import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
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
      loading: true,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = () => {
    axios
      .get(`https://hn.algolia.com/api/v1/search?page=${this.state.page}`)
      .then((response) => {
        const newsList = response.data.hits;
        this.setState({newsList, loading: false});
      });
  };

  handleDeleteFeed = (index) => {
    let newsList = [...this.state.newsList];
    newsList.splice(index, 1);
    this.setState({newsList});
  };

  nextPage = () => {
    const page = this.state.page + 1;
    this.setState({page, loading: true}, () => {
      this.fetchNews();
    });
  };

  previousPage = () => {
    const page = this.state.page - 1;
    this.setState({page, loading: true}, () => {
      this.fetchNews();
    });
  };

  _renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} color="#0000ff" />
      </View>
    );
  };

  _renderList = () => {
    return (
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
        keyExtractor={(item) => item.objectID}
        contentContainerStyle={{paddingBottom: 220}}
      />
    );
  };

  _renderMainContent = () => {
    if (this.state.loading) return this._renderLoader();
    else return this._renderList();
  };

  render() {
    const prev =
      this.state.page === 0 ? (
        <Text style={{alignSelf: 'flex-start'}} />
      ) : (
        <TouchableOpacity
          onPress={() => this.previousPage()}
          style={{
            ...styles.row,
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <Icon name="chevron-left" size={10} />
          <Text style={{...styles.paginationText, marginLeft: 5}}>Prev</Text>
        </TouchableOpacity>
      );

    return (
      <View style={{height: '100%'}}>
        <View style={styles.paginationRow}>
          {prev}
          <Text style={styles.pageNumber}>Page {this.state.page + 1}</Text>
          <TouchableOpacity
            onPress={() => this.nextPage()}
            style={{
              ...styles.row,
              alignItems: 'center',
            }}>
            <Text style={{...styles.paginationText, marginRight: 5}}>Next</Text>
            <Icon name="chevron-right" size={10} />
          </TouchableOpacity>
        </View>
        {this._renderMainContent()}
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
    width: Dimensions.get('window').width,
  },
  pageNumber: {
    fontSize: 16,
  },
  paginationText: {
    fontSize: 14,
  },
  loaderContainer: {
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {bookmarks} = state;
  return {bookmarks};
};

export default connect(mapStateToProps)(HomeScreen);
