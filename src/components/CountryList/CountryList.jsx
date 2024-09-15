import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message="Add your first city by clicking on a city on the map"
        emoji="🗺️"
      />
    );

  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((item) => item.country).includes(curr.country))
      return [...arr, { country: curr.country, emoji: curr.emoji }];
    else return arr;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </div>
  );
}

export default CountryList;
