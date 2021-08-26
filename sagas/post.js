import { all , fork, call , take, put , delay , debounce, throttle , takeLeading , takeEvery , takeLatest} from 'redux-saga/effects'
import axios from 'axios'


function addPostAPI (data) {
    return axios.post('/api/post', data)
}

function* addPost(action) {
    try{
        // const result = yield call(addPostAPI, action.data) //요청의 결과를 받음
        yield delay(1000)
        yield put({
            type : 'ADD_POST_SUCCESS',
            data : action.data
        })
    } catch  (err) {
        yield put({
            type : 'ADD_POST_FAILURE',
            data : err.response.data,
        })
    }
}

function* watchAddPost() {
        yield throttle(10000 ,'ADD_POST_REQUEST' , addPost);
}

export default function* postSaga() {
    yield all ([
        fork(watchAddPost)
    ])
}