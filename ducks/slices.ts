import { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateOfBirth {
  year: string,
  month: string,
  day: string,
}

// userInfo에 대한 slice
interface UserInfoStateObj {
  username: string
	password?: string
  dateOfBirth?: DateOfBirth
  gender?: string,
  email?: string,
  // email_front?: string,
  // email_back?: string,
  // email_back_select?: string,
  countryCode?: string,
  phone?: Array<string>,
  // phone_front?: string,
  // phone_middle?: string,
  // phone_back?: string,
  introduction?: string,
}

interface UserInfoState {
  value: UserInfoStateObj
}

const UserInfoInitialState = {
  value : {
    username: ''
  },
} as UserInfoState

export const userInfoSlice = createSlice({
  name : 'userInfo',
  initialState: UserInfoInitialState,
  reducers: {
    revise: (state, action: PayloadAction<UserInfoStateObj>) => {
      state.value = action.payload;
    }
  }
})

export const selectUserInfo = (state: RootState) => state.userInfo.value;
// userInfo에 대한 slice

// loginStatus에 대한 slice
interface LoginStatusState {
  status: boolean
};

const LoginStatusInitialValue = {
  status: false,
} as LoginStatusState;

export const loginStatusSlice = createSlice({
  name : 'loginStatus',
  initialState: LoginStatusInitialValue,
  reducers: {
    login: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    }
  }
});

export const selectLoginStatus = (state: RootState) => state.loginStatus.status;
// loginStatus에 대한 slice

// todoInfo에 대한 slice
export interface TodoInfoStatusArrObj {
  id?: string,
  title:string,
  content?: string,
  registration: string,
  deadline?: string,
}

interface TodoInfoStatusObj {
  username: string,
  todolist: Array<TodoInfoStatusArrObj>,
  inprogress?: Array<TodoInfoStatusArrObj>,
  done?: Array<TodoInfoStatusArrObj>
}

interface TodoInfoStatus {
  value: TodoInfoStatusObj
}

const TodoInfoInitialValue = {
  value: {
    username: '',
    todolist: [],
  }
} as TodoInfoStatus;

export const todoInfoSlice = createSlice({
  name: 'todoInfo',
	initialState: TodoInfoInitialValue,
	reducers: {
    register : (state, action) => {
      state.value.username = action.payload;
    },

		create: (state, action) => {
			if (state.value.todolist) {
        state.value.todolist = [...state.value.todolist, ...action.payload];
      } else {
        state.value.todolist = [...action.payload];
      }
		},

    read: (state, action) => {
      state.value = action.payload;
    },

		modify: (state, action) => {
      const { id, status, modifiedTodo } = action.payload;
      const targetIdx = state.value[status].findIndex(el => el.id === id);
      state.value[status].splice(targetIdx, 1, modifiedTodo);
		},

		delete: (state, action) => {
      const { id, status } = action.payload;
			state.value[status] = state.value[status].filter(el => el.id !== id);
		}
	}
})

export const selectTodoInfo = (state: RootState) => state.todoInfo.value;
// todoInfo에 대한 slice