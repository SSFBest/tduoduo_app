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
import * as types from '../constants/action_types';

const initialState = {
  loading: false,
  init_loading: {}
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INIT_LOADING:
      return Object.assign({}, state, {
        loading: true
      });
    case types.RECEIVE_INIT_LOADING:
      return Object.assign({}, state, {
        loading: false,
        img_list: action.img_list,
        temai_list:action.temai_list
      });
    default:
      return state;
  }
}