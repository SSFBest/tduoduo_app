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
import { connect } from 'react-redux';
// import CodePush from 'react-native-code-push';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from '../pages/temai/main';
import * as temaiCreators from '../actions/temai';

class TemaiContainer extends React.Component {
  static navigationOptions = {
    title: '特卖',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="md-home" size={25} color={tintColor} />
  };



  render() {
    return <Main {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { temai } = state;
  return {
    temai
  };
};

const mapDispatchToProps = (dispatch) => {
  const temai_actions = bindActionCreators(temaiCreators, dispatch);
  return {
    temai_actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemaiContainer);
