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
import px2dp from '../util'


// import SlideImage from '../../components/slide_image';
import SlideImage from './slide_view';

require('moment/locale/zh-cn');

const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?140:120)
const propTypes = {
  temai_actions: PropTypes.object,
  temai: PropTypes.object.isRequired
};

const pages = [];
let loadMoreTime = 0;
let currentLoadMoreTypeId;

class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { temai_actions } = this.props;
    InteractionManager.runAfterInteractions(() => {
      temai_actions.request_temai_data();
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {

  }
  _render_image_slide={

  }
  _renderTypes={
    const w = width/4, h = w*.6 + 20
    let renderSwipeView = (types, n) => {
      return (
        <View style={styles.typesView}>
          {
            types.map((item, i) => {
              let render = (
                <View style={[{width: w, height: h}, styles.typesItem]}>
                  <Image source={LocalImg['h'+(i+n)]} style={{width: w*.5, height: w*.5}}/>
                  <Text style={{fontSize: px2dp(12), color:"#666"}}>{item}</Text>
                </View>
              )
              return (
                isIOS?(
                  <TouchableHighlight style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableHighlight>
                ):(
                  <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                )
              )
            })
          }
        </View>
      )
    }
    return (
      <Swiper
        height={h*2.4}
        paginationStyle={{ bottom: 10 }}
        dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
        activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}>
        {renderSwipeView(['美食','甜品饮品','商店超市','预定早餐','果蔬生鲜','新店特惠','准时达','高铁订餐'], 0)}
        {renderSwipeView(['土豪推荐','鲜花蛋糕','汉堡炸鸡','日韩料理','麻辣烫','披萨意面','川湘菜','包子粥店'], 8)}
      </Swiper>
    )
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
  on_slide_press_handler=(type,id)=>{
    const { navigate } = this.props.navigation;
    navigate('Web', { type });
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
    const { temai } = this.props;

    return (

        <SlideImage img_list={temai.img_list} on_press_handler={this.on_slide_press_handler} size={5}>
        </SlideImage>


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
