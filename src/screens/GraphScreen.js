import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {LineChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import {connect} from 'react-redux';

class GraphScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let data = [];
    let labels = [];
    let index;
    let noData;
    if (!this.props.upvotes.length) {
      noData = <Text style={{fontSize: 16}}>No upvotes found</Text>;
    } else {
      this.props.upvotes.map((obj) => {
        index = labels.indexOf(obj.id);
        if (index === -1) {
          labels.push(obj.id);
          data.push(1);
        } else data[index] += 1;
      });
    }

    console.log(labels, data);

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.heading}>Upvotes Per Feed</Text>
        </View>
        <View style={styles.row}>{noData}</View>
        <View style={{...styles.row, height: 300}}>
          <YAxis
            data={data}
            contentInset={{top: 20, bottom: 20}}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={2}
            formatLabel={(value) => value}
          />
          <LineChart
            style={{flex: 1, marginLeft: 16}}
            data={data}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={{top: 20, bottom: 20}}
            yMin={0}>
            <Grid />
          </LineChart>
        </View>
        <XAxis
          style={{paddingLeft: 16}}
          data={labels}
          formatLabel={(value) => labels[value]}
          contentInset={{left: 10, right: 10}}
          svg={{fontSize: 10, fill: 'black'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 18,
    fontWeight: '900',
    paddingVertical: 20,
  },
});

const mapStateToProps = (state) => {
  const {upvotes} = state;
  return {upvotes};
};

export default connect(mapStateToProps)(GraphScreen);
