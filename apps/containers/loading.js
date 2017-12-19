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
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as loadingCreators from '../actions/loading';

import Index from '../pages/index';


const mapStateToProps = (state) => {
  const { loading } = state;
  return {
    loading
  };
};

const mapDispatchToProps = (dispatch) => {
  const loading_actions = bindActionCreators(loadingCreators, dispatch);
  return {
    loading_actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
