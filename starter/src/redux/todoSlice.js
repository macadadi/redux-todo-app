import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialState= [
 
    ]

export const getTodoAsync = createAsyncThunk('todos/getTodoAsync',
	async ()=>{
		const resp = await fetch('https://localhost:7000/todos',{
			method : 'GET',
			headers :{
				'Content-Type':'application/json'
			}
		})
		if(resp.ok){
			const todos = await resp.json()
			return { todos }
		}
	})

const todoSlice = createSlice({
	name:"todos",
	initialState,
	reducers :{
		addTodo : (state,action)=>{
			const newTodo ={
				id:Date.now(),
				title : action.payload.title,
				completed :false,
			};
			state.push(newTodo)
		},
		toggleComplete:(state,action)=>{
			const index = state.findIndex((todo)=>todo.id === action.payload.id);
			state[index].completed = action.payload.completed
		},
		deleteTodo :(state,action)=>{
			return state.filter((todo)=>todo.id !== action.payload.id)
		},

	},

	extraReducers : {
		[ getTodoAsync.fulfilled] : (state,action)=>{
			return action.payload.todos;
		}
	}

});
const todoReducer =todoSlice.reducer;
export const {addTodo ,toggleComplete,deleteTodo} = todoSlice.actions;

export default todoReducer

