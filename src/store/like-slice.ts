import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LikeState {
    [productId: string]: 'liked' | 'disliked' | 'none';
}

const initialState: LikeState = {};

const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        // action to like a product : 
        likeProduct(state,  action: PayloadAction<string>) {
            const productId = action.payload;
            state[productId] = 'liked';
        },

        //action to dislike a product : 
        disLikeProduct(state, action: PayloadAction<string>) {
            const productId = action.payload;
            state[productId] = 'disliked';
        },

        //action to remove like or dislike (set to 'none'):
        removeLike(state, action: PayloadAction<string>){
            const productId = action.payload;
            state[productId] = 'none';
        },
    },
});
export const { likeProduct, disLikeProduct, removeLike } = likeSlice.actions;

export default likeSlice.reducer;

