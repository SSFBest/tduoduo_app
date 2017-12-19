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
import store from 'react-native-simple-store';
import * as types from '../constants/action_types';
import toast_util from '../utils/toast_util';
import { request } from '../utils/request_util';
import { WEXIN_ARTICLE_TYPE } from '../constants/urls';
import { fetch_init_loading, receive_init_loading } from '../actions/loading';

export function* request_loading() {
  try {
    // yield put(fetchInitLoading());
    // const response = yield call(request, INIT_LOADING_LINK, 'get');
    const response = {'data':{'intro':true,'ad':true}};
    // const is_First = yield call(store.get, 'is_First');
    const is_first = 1;
    yield put(receive_init_loading(response.data,is_first));
    // yield call(store.save, 'init_loading', response.init_loading);
    const error_message = response.error;
    if (error_message && error_message !== '') {
      yield toast_util.show_short(error_message);
    }
  } catch (error) {
    yield put(receive_init_loading([],null));
    yield toast_util.show_short('网络发生错误，请重试');
  }
}

export function* watch_request_init_loading() {
  while (true) {
    yield take(types.REQUEST_INIT_LOADING);
    yield fork(request_loading);
  }
}
