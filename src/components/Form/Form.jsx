import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUrlPosition } from "../../hooks/useUrlPosition";
import Button from "../Button/Button";
import styles from "./Form.module.css";
import BackButton from "../BackButton/BackButton";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import { useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { lat, lng } = useUrlPosition();

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const { createCity } = useCities();
  const navigate = useNavigate();

  function handleSubmit() {
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };

    createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(() => {
    async function getCityData() {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryName)
          throw new Error("That isn't a city. Click somewhere else!!");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoCodingError(err.message);
        console.log(geoCodingError);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  if (!lat && !lng)
    return (
      <Message message="Start by looking somewhere in the map." emoji="👀" />
    );

  if (isLoadingGeoCoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} emoji="🙂" />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit} styleType="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
