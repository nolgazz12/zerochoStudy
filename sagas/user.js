import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI (data) {
    // function logInAPI (data, a, b, c) { 아래 result 부분에 들어 있는 call 한 함수와 매개변수를 data 부분에 넣어주어야 한다.
        return axios.post('/api/login', data)
    }
    
    function* logIn(action) {
        try{
            // 현재는 서버가 없으니 주석
            // const result = yield call(logInAPI , action.data) //요청의 결과를 받음
            yield delay(1000)
            yield put({
                type : 'LOG_IN_SUCCESS',
                data : action.data,
            });
        } catch  (err) {
            yield put({
                type : 'LOG_IN_FAILURE',
                data : err.response.data,
            })
        }
    }
    
    function logOutAPI () {
        return axios.post('/api/logout')
    }
    
    function* logOut() {
        try{
            // const result = yield call(logOutAPI) //요청의 결과를 받음
            yield delay(1000)
            yield put({
                type : 'LOG_OUT_SUCCESS',
                data : action.data
            })
        } catch  (err) {
            yield put({
                type : 'LOG_OUT_FAILURE',
                data : err.response.data,
            })
        }
    }
    
    function* watchLogIn() {
        yield takeLatest(LOG_IN_REQUEST, logIn);
    }

    function* watchLogOut() {
        yield takeLatest(LOG_OUT_REQUEST, logOut);
    }

export default function* userSaga() {
    yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    ]);
}
