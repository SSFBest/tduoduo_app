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
import { fetch_main_data, receive_main_data } from '../actions/main';

export function* request_main_data() {
  try {
    yield put(fetch_main_data());
    const type_list = yield call(request, WEXIN_ARTICLE_TYPE, 'get');
    // yield put(receiveTypeList(typeList.showapi_res_body.typeList));
    // yield call(store.save, 'typeList', typeList.showapi_res_body.typeList);
    const errorMessage = typeList.showapi_res_error;
    if (errorMessage && errorMessage !== '') {
      yield toast_util.show_short(errorMessage);
    }
  } catch (error) {
    yield put(receive_main_data([]));
    yield toast_util.show_short('网络发生错误，请重试');
  }
}

export function* watch_request_main_data() {
  while (true) {
    yield take(types.REQUEST_MAIN_DATA);
    yield fork(request_main_data);
  }
}
