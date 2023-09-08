import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addCards } from "../redux/walletSlice";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/MyCards";
import swedbankImage from "../images/swedbank.png";
import handelsbankenImage from "../images/handelsbanken.png";
import icaImage from "../images/ICA.png";
import mastercardImage from "../images/mastercardlogo.png";
import nordeaImage from "../images/nordea.png";
import visaCardImage from "../images/visacardlogo.png"


const AddCard = () => {
  let dispatch = useDispatch();
  const history = useHistory();

  const { cardHolderName } = useSelector((state) => state.wallet);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState(null);
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [bank, setBank] = useState("swedbank");
  const [logo, setLogo] = useState(
    swedbankImage
  );
  const [vendor, setVendor] = useState(
    mastercardImage
  );
  const [cardNumberColor, setCardNumberColor] = useState("");
  const [validColor, setValidColor] = useState("");

  let newDate = new Date();
  let currentMonth = newDate.getMonth() + 1;
  let currentYear = newDate.getYear() - 100;
  const val1 = Number(expiryMonth) + Number(expiryYear) * 10;
  const val2 = currentYear * 10 + currentMonth;
  const result = val1 - val2;
  const valid = result < 0;

  useEffect(() => {
    let input = document.querySelector("#year").value;
    if (!valid && expiryMonth !== null && input >= 0) {
      setValidColor("2px solid green");
    } else if (valid && expiryMonth !== null && input >= 0) {
      setValidColor("2px solid red");
    } else {
      setValidColor("1px solid #ced4da");
    }
  }, [valid, expiryMonth]);

  const addCard = () => {
    if (cardNumber.toString().length === 19 && !valid && expiryMonth !== null) {
      let newCard = {
        cardNumber: cardNumber,
        name: cardHolderName,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvc: cvc,
        bank: bank,
        vendor: vendor,
        logo: logo,
      };
      dispatch(addCards(newCard));
      history.push("/");
    }
  };

  const validateNumber = (e) => {
    let regexNumber =
      e.target.value
        .replace(/\D+/g, "")
        .replace(/\D/g, "")
        .match(/.{1,4}/g) || [];
    setCardNumber(regexNumber.join(" ").substring(0, 19));

    if (
      regexNumber.toString().length === 19 ||
      regexNumber.toString().length === 21
    ) {
      setCardNumberColor("2px solid green");
    } else {
      setCardNumberColor("2px solid red");
    }
  };

  const flipCard = () => {
    const card = document.querySelector(".card");
    if (card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }
  };

  return (
    <div className="App">
      <p className="small">new card</p>
      <Card
        cardNumber={cardNumber}
        name={cardHolderName}
        expiryMonth={expiryMonth}
        expiryYear={expiryYear}
        cvc={cvc}
        bank={bank}
        vendor={vendor}
        logo={logo}
      />

      <form>
        <div id="inputWrapper">
          <label htmlFor="cardNumberInput">Card Number</label>
          <input
            type="text"
            name="number"
            id="cardNumberInput"
            value={cardNumber}
            onChange={validateNumber}
            onFocus={flipCard}
            style={{ border: cardNumberColor }}
          />

          <label htmlFor="cardHolderInput">Card holder</label>
          <input
            type="text"
            name="name"
            id="cardHolderInput"
            value={cardHolderName}
            readOnly
          />
          <div id="validWrapper">
            <div id="validThru1">
              <label htmlFor="month">month</label>
              <select
                className={`exp ${valid}`}
                id="month"
                defaultValue={"MM"}
                onChange={(e) => {
                  setExpiryMonth(e.target.value);
                }}
                onFocus={flipCard}
                style={{ border: validColor }}
              >
                <option value="MM" disabled hidden>
                  MM
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div id="validThru2">
              <label htmlFor="year">year</label>
              <input
                className={`exp ${valid}`}
                id="year"
                value={expiryYear}
                placeholder="YY"
                type="number"
                style={{ border: validColor }}
                onChange={(e) => {
                  setExpiryYear(e.target.value.slice(0, 2));
                }}
                onFocus={flipCard}
              />
            </div>
          </div>

          <label htmlFor="cvcInput">CVC</label>
          <input
            type="number"
            name="cvc"
            id="cvcInput"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.slice(0, 3))}
            onFocus={() => {
              const card = document.querySelector(".card");
              card.classList.toggle("is-flipped");
            }}
          />
          <label htmlFor="selectBank">Vendor</label>
          <select
            required
            onChange={(e) => {
              if (e.target.value === "swedbank") {
                setLogo(swedbankImage);
                setVendor(mastercardImage);
              } else if (e.target.value === "icabank") {
                setLogo(icaImage);
                setVendor(
                  visaCardImage
                );
              } else if (e.target.value === "nordea") {
                setLogo(nordeaImage);
                setVendor(
                  visaCardImage
                );
              } else if (e.target.value === "handelsbanken") {
                setLogo(handelsbankenImage);
                setVendor(mastercardImage);
              }
              setBank(e.target.value);
            }}
            defaultValue={"Vendor"}
            id="selectBank"
            onFocus={flipCard}
          >
            <option value="Vendor" disabled hidden>
              Vendor
            </option>
            <option value="handelsbanken">Handelsbanken</option>
            <option value="swedbank">swedbank</option>
            <option value="icabank">ica banken</option>
            <option value="nordea">nordea</option>
          </select>
        </div>
        <button type="button" onClick={addCard}>
          Add card
        </button>
      </form>
    </div>
  );
};

export { AddCard };
