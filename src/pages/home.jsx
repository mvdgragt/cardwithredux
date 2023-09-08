import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/MyCards";
import { handleCards, removeCard } from "../redux/walletSlice";
import { useState } from "react";

const Home = () => {
  let dispatch = useDispatch();
  const { activeCards } = useSelector((state) => state.wallet);
  const { inactiveCards } = useSelector((state) => state.wallet);
  const [errorMessage, setErrorMessage] = useState("");

  var timer;
  return (
    <div>
      <h1>E-Wallet</h1>
      <p className="small">Active card</p>
      <div id="wrapper">
        <div id="container">
          <div>
            {activeCards.map((card, i) => {
              return <Card {...card} key={i} />;
            })}
          </div>
          {inactiveCards.map((card, i) => (
            <div
              key={i}
              onClick={(e) => {
                clearTimeout(timer);

                if (e.detail === 1) {
                  timer = setTimeout(() => {
                    dispatch(handleCards(card));
                  }, 200);
                } else if (e.detail === 2) {
                  dispatch(removeCard(card));
                }
              }}
            >
              <Card {...card} />
            </div>
          ))}
        </div>
        <div id="error">
          <p>{errorMessage}</p>
        </div>
      </div>
      {inactiveCards.length < 3 ? (
        <Link to="/addcard">
          <button id="newCardBtn">Add a new card</button>
        </Link>
      ) : (
        <p>Max 4 cards - remove one to add another!</p>
      )}
    </div>
  );
};

export { Home };
