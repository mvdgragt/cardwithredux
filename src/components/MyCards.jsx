import { useEffect } from "react";
import "./MyCards.css";
import nfc from "../images/nfc.png"
import simcardchipImage from "../images/sim-card-chip.png"

const Card = ({
  name,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvc,
  bank,
  vendor,
  logo,
}) => {
  useEffect(() => {
    const card = document.querySelector(".card");
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  }, []);

  return (
    <main className="main-container">
      <div className="scene">
        {/* Card */}
        <div className={`card ${bank}`}>
          {/* card front */}
          <div className="card__front">
            <img className="card-logo" src={`${logo}`} alt="" />
            <img
              src={simcardchipImage}
              className="chip"
              alt=""
            />
            <img src={`${vendor}`} className="master-card" alt="" />
            <img
              src={nfc}
              className="NFC"
              alt=""
            />
            <div className="card__number number">
              <div className="number-group number-group--0">{cardNumber}</div>
            </div>
            <div className="card__details">
              <div className="card__holder">
                <span className="card__holder__title">Card Holder</span>
                <span className="card__holder__name">{name}</span>
              </div>

              <div className="card__expiration">
                <span className="card__expiration__title">valid thru</span>
                <span className="card__expiration__date">
                  {expiryMonth}/{expiryYear}
                </span>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div className="card__back">
            <div className="card__stripe"></div>
            <div className="card__signature">
              <span className="card_cvv">CVC</span>
              <span className="card__cvv-number">{cvc}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;
