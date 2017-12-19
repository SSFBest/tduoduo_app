/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
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
import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/action_types';
import ToastUtil from '../utils/toast_util';
import { request } from '../utils/request_util';
import { REQUEST_TEMAI_LINK } from '../constants/urls';
import { fetch_temai_data, receive_temai_data } from '../actions/temai';

export function* request_temai_data() {
  try {
    yield put(fetch_temai_data());
    // const response = yield call(request, REQUEST_TEMAI_LINK, 'get');
    const response = {'data':{
      'img_list':[
      {'img':'http://www.tduoduo.com/assets/temai/2017/10/20/3a6b99569643c25f31edd3e321225bc62746e19c.jpg','type':'','id':''},
      {'img':'http://www.tduoduo.com/assets/temai/2017/10/20/ae61d2f78d0ad321118d3e1d9770dbbeb798b6c1.jpg','type':'','id':''},
      {'img':'http://www.tduoduo.com/assets/temai/2017/10/20/2975c345610db5e150a02e16a36aab6044e8b864.jpg','type':'','id':''},
      {'img':'http://www.tduoduo.com/assets/temai/2017/10/20/94cc8352e84ac2667e4e0af2673d6274d2491951.jpg','type':'','id':''},
      {'img':'http://www.tduoduo.com/assets/temai/2017/10/19/a0a5e77ec9b220b1059fe02151ba3f8cb7ec6f1c.jpg','type':'','id':''}
      ],
      'temai_list':[]
    }
    };
    yield put(receive_temai_data(response.data));
    const error_message = response.error;
    if (error_message && error_message !== '') {
      yield toast_util.show_short(error_message);
    }
  } catch (error) {
    yield put(receive_init_loading([],null));
    yield toast_util.show_short('网络发生错误，请重试');
  }
}

export function* watch_request_temai_data() {
  while (true) {
    yield take(types.REQUEST_TEMAI_DATA);
    yield fork(request_temai_data);
  }
}
