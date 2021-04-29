import React from 'react';
import {useSelector} from 'react-redux'

const TotalCompleteItems = () => {
	const total = useSelector((state)=>state.todos.filter((todo)=>todo.completed===true))
	return <h4 className='mt-3'>Total Complete Items: {total.length}</h4>;
};

export default TotalCompleteItems;
