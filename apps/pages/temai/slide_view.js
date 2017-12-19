import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
const loading = require('../../components/img/loading.gif')

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



export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loadQueue: [0, 0, 0, 0,0],
      startswiper:false
    }
    this.loadHandle = this.loadHandle.bind(this)
  }

  componentDidMount(){
        setTimeout(()=>{
            this.setState({
                startswiper:true
            });
        },0)
    }

  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({
      loadQueue
    })
  }

  _renderSwiper(){
    const {img_list}=this.props
    const Slide = props => {
      return (
        <View style={styles.slide}>
        <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.item.img}} />
        {
          !props.loaded && <View style={styles.loadingView}>
            <Image style={styles.loadingImage} source={loading} />
          </View>
        }
      </View>
      )
    }
    return (
        <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={true}>
          {
            img_list.map((item, i) => <TouchableWithoutFeedback key={i} onPress={() => on_press_handler(item.type,item.id)}><Slide
              loadHandle={this.loadHandle}
              loaded={!!this.state.loadQueue[i]}
              item={item}
              i={i}
              /></TouchableWithoutFeedback>)
          }
        </Swiper>
    )
  }
  render () {
    return(
      <View style={{flex: 1}}>
        {
          this.state.startswiper === true ?
          this._renderSwiper()
          : null
        }
      </View>
    )
  }
}
