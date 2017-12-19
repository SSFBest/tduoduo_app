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
import { fork } from 'redux-saga/effects';

import { watch_request_main_data } from './main';
import { watch_request_init_loading } from './loading';
import { watch_request_temai_data } from './temai';

export default function* rootSaga() {
  yield [fork(watch_request_init_loading),fork(watch_request_main_data),fork(watch_request_temai_data)];
}
