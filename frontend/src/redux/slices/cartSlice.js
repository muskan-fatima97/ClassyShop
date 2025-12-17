import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem: (state, action) => {
        //   const item = action.payload;
        //   const existingItem = state.items.find(i => i.productId === item.productId);

        //   if (existingItem) {
        //     existingItem.quantity += 1;
        //   } else {
        //     state.items.push({ ...item, quantity: 1 });
        //   }

        //   state.totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
        //   state.totalAmount = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
        // },
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id); // use id, not title

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            state.totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
            state.totalAmount = state.items.reduce(
                (acc, i) => acc + parseInt(i.price) * i.quantity,
                0
            );
        },


        incrementQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
            state.totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
            state.totalAmount = state.items.reduce(
                (acc, i) => acc + parseInt(i.price) * i.quantity,
                0
            );
        },

        decrementQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }
            state.totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
            state.totalAmount = state.items.reduce(
                (acc, i) => acc + parseInt(i.price) * i.quantity,
                0
            );
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            state.totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
            state.totalAmount = state.items.reduce(
                (acc, i) => acc + parseInt(i.price) * i.quantity,
                0
            );
        },


        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addItem, incrementQuantity, decrementQuantity, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
