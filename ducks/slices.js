import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name : 'userInfo',
  initialState: {},
  reducers: {
    revise: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const loginStatusSlice = createSlice({
  name : 'loginStatus',
  initialState: {status: false},
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const todoInfoSlice = createSlice({
  name: 'todoInfo',
	initialState: {
    username: '',
    todolist: [],
  },
	reducers: {
    register : (state, action) => {
      state.username = action.payload;
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