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
import { View, StyleSheet,Image,Dimensions,TouchableOpacity, ViewPropTypes } from 'react-native';
import Swiper from 'react-native-swiper'
import LoadingView from './loading_view'

const propTypes = {
  img_list: PropTypes.array,
  on_press: PropTypes.func,
  // style: ViewPropTypes.style,
  size: PropTypes.number
};
const { width } = Dimensions.get('window');

const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  loadingImage: {
    width: 60,
    height: 60
  }
}
const SlideImage = ({
  img_list,
  on_press_handler,
  size
}) => {
  const loading = require('./img/loading.gif');
  const Slide = props => {
    return (<TouchableOpacity onPress={() => on_press_handler(props.item.type,props.item.id)}>
      <View style={styles.slide}>
        <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri:props.item.img}} />
        {
          !props.loaded && (<View style={styles.loadingView}>
        <Image style={styles.loadingImage} source={loading} />
      </View>)
        }
      </View>
    </TouchableOpacity>);
  }
  let load_queue=new Array(size);
  const load_handler=(i)=>{
    load_queue[i] = 1;
  }
  return (
    <View style={{flex: 1}}>
      <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={false}>
        {
          img_list.map((item, i) => <Slide
            loadHandle={load_handler}
            loaded={load_queue[i]}
            item={item}
            i={i}
            key={i} />)
        }
      </Swiper>
    </View>
  );
};

SlideImage.propTypes = propTypes;

SlideImage.defaultProps = {
  img_list: [],
  on_press_handler: null,
  // style: undefined,
  size: 0
};

export default SlideImage;
