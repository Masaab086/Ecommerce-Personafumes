import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist";
import storage from "../storage/storage";

export interface Bag {
  id: string;
  variantId?: string;
  image: string;
  quantity: number;
  fragranceId: string;
  fragranceCost: number;
  inspiration: string;
  weight: string;
  personalize?: Array<string>;
  personalizePrice?: number;
}

interface BagState {
  currentBag: Bag[];
}

const initialState: BagState = {
  currentBag: []
}

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    setBag: (state: BagState, action: PayloadAction<Bag[]>): void => {
      state.currentBag = action.payload;
    },
    addBag: (state: BagState, action: PayloadAction<Bag>): void => {
      state.currentBag = [...state.currentBag, action.payload]
    },
    updateBag: (state: BagState, action: PayloadAction<{ variantId: string, quantity: number }>): void => {
      const updatedBag: Bag[] = state.currentBag.map((col): Bag => (col.variantId === action.payload.variantId ? { ...col, quantity: action.payload.quantity } : col))
      state.currentBag = updatedBag
    },
    addPersonalizeToBag: (state: BagState, action: PayloadAction<Bag>): void => {
      const updatedBag: Bag[] = state.currentBag.map((col): Bag => (col.id === action.payload.id ? { ...col, personalize: action.payload.personalize } : col))
      state.currentBag = updatedBag
    },
    deltePersonalizeToBag: (state: BagState, action: PayloadAction<{ id: string, fragranceId: string }>): void => {
      state.currentBag = state.currentBag.filter((col): boolean => col.id !== action.payload.id && col.fragranceId !== action.payload.fragranceId && col.personalize !== undefined)
    },
    removeBag: (state: BagState, action: PayloadAction<{ variantId: string }>): void => {
      const updatedBag: Bag[] = state.currentBag.filter((col): boolean => (col.variantId !== action.payload.variantId))
      state.currentBag = updatedBag
    },
    clearBag: (state: BagState) => {
      state.currentBag = []
    }
  }
})

export const bagActions = bagSlice.actions

const persistedReducer = persistReducer({
  key: 'bag',
  storage
},
  bagSlice.reducer
)


export default persistedReducer;