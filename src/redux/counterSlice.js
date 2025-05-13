import { createSlice } from '@reduxjs/toolkit'
// src/redux/counterSlice.js
//слайс Redux для счетчика
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: state => { state.value += 1 },
        decrement: state => { state.value -= 1 }
    }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
