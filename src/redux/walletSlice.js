import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("wallet/getUser", async () => {
  return fetch("https://randomuser.me/api/").then((response) =>
    response.json()
  );
});

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    activeCards: [
      {
        vendor: "https://vandergragt.eu/images/mastercard.png",
        bank: "swedbank",
        logo: "https://vandergragt.eu/images/swedbank.png",
        cardNumber: "4431441314123416".match(/.{1,4}/g).join(" "),
        name: "",
        expiryMonth: "12",
        expiryYear: "24",
        cvc: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      },
    ],
    inactiveCards: [],
    cardHolderName: "",
  },
  reducers: {
    addCards: (state, action) => {
      state.inactiveCards = [...state.inactiveCards, action.payload];
    },
    handleCards: (state, action) => {
      const index = state.inactiveCards
        .map((card) => card.cardNumber)
        .indexOf(action.payload.cardNumber);

      state.inactiveCards.splice(index, 0, state.activeCards[0]);

      state.activeCards = [action.payload];

      state.inactiveCards = state.inactiveCards.filter(
        (card) => card.cardNumber !== action.payload.cardNumber
      );
    },
    removeCard: (state, action) => {
      state.inactiveCards = state.inactiveCards.filter(
        (card) => card.cardNumber !== action.payload.cardNumber
      );
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      console.log("Fetching data");
    },
    [getUser.fulfilled]: (state, action) => {
      state.activeCards[0].name =
        action.payload.results[0].name.first.toUpperCase() +
        " " +
        action.payload.results[0].name.last.toUpperCase();
      state.cardHolderName =
        action.payload.results[0].name.first.toUpperCase() +
        " " +
        action.payload.results[0].name.last.toUpperCase();
    },
    [getUser.rejected]: (state, action) => {
      console.log("Failed to fetch data");
    },
  },
});
export default walletSlice.reducer;
export const { addCards, handleCards, removeCard } = walletSlice.actions;
