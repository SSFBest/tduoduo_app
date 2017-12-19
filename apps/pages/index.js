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
import React from 'react';
import store from 'react-native-simple-store';
// import { registerApp } from 'react-native-wechat';
import SplashScreen from 'react-native-splash-screen';
import Intro from './intro/main';
import App from '../containers/app'


class Index extends React.Component {

  constructor(props) {
    super(props);
    // registerApp('wxb24c445773822c79');

  }
  componentWillMount(){
    const { loading_actions } = this.props;
    loading_actions.request_init_loading();
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { loading } = this.props;
    // if (!loading.is_First) {
    //       return <App/>;
    // } else if(loading.init_loading.ad){
    //     return <App/>;
    // }else {
    //       return <App/>;
    // }
    return <App />;
  }
}

export default Index;
