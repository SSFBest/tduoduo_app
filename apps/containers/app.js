/**
 *
 * Copyright 2015-present reading
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
import { StackNavigator, TabNavigator } from 'react-navigation';
import MainContainer from '../containers/main';
import TemaiContainer from '../containers/temai';
import QiangContainer from '../containers/qiang';
import QuanContainer from '../containers/quan';
import WebViewPage from '../pages/item/item_pages';

const TabContainer = TabNavigator(
  {
    main: { screen: MainContainer },
    temai: { screen: TemaiContainer },
    qiang: { screen: QiangContainer },
    quan: { screen: QuanContainer }
  },
  {
    lazy: true,
    initialRouteName:'temai',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    }
  }
);

const App = StackNavigator(
  {
    home: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    },
    item: { screen: WebViewPage }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    }
  }
);

export default App;
