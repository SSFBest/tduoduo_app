/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { PropTypes } from 'react';
import {
  DeviceEventEmitter,
  InteractionManager,
  ListView,
  StyleSheet,
  View
} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar
} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';

import LoadingView from '../../components/loading_view';
import ToastUtil from '../../utils/toast_util';
import { get_article_list, get_type_name } from '../../utils/items_util';
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemListView from './ItemListView';

require('moment/locale/zh-cn');

const propTypes = {
  readActions: PropTypes.object,
  read: PropTypes.object.isRequired
};

const pages = [];
let loadMoreTime = 0;
let currentLoadMoreTypeId;

class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {

  }

  onRefresh = (typeId) => {
    const { readActions } = this.props;
    readActions.requestArticleList(true, false, typeId);
    const index = this.state.typeIds.indexOf(typeId);
    if (index >= 0) {
      pages[index] = 1;
    }
  };

  onPress = (article) => {
    const { navigate } = this.props.navigation;
    navigate('Web', { article });
  };

  onIconClicked = () => {
    this.drawer.openDrawer();
  };

  onEndReached = (typeId) => {
    currentLoadMoreTypeId = typeId;
    const time = Date.parse(new Date()) / 1000;
    const index = this.state.typeIds.indexOf(typeId);
    if (index < 0) {
      return;
    }
    if (time - loadMoreTime > 1) {
      pages[index] += 1;
      const { readActions } = this.props;
      readActions.requestArticleList(false, false, typeId, true, pages[index]);
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  };
  renderFooter = () => {
    const { read } = this.props;
    return read.isLoadMore ? <Footer /> : <View />;
  };

  renderItem = article =>
    <ItemCell article={article} onPressHandler={this.onPress} />;

  renderContent = (dataSource, typeId) => {
    const { read } = this.props;
    if (read.loading) {
      return <LoadingView />;
    }
    const isEmpty =
      read.articleList[typeId] === undefined ||
      read.articleList[typeId].length === 0;
    if (isEmpty) {
      return (
        <EmptyView read={read} tyepId={typeId} onRefresh={this.onRefresh} />
      );
    }
    return (
      <ItemListView
        dataSource={dataSource}
        typeId={typeId}
        isRefreshing={read.isRefreshing}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        renderFooter={this.renderFooter}
        renderItem={this.renderItem}
      />
    );
  };

  render() {

    return (
      <View style={styles.container}>
        <Text>main</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerTitleContent: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3e9ce9'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc'
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  },
  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 2
  }
});

Main.propTypes = propTypes;

export default Main;