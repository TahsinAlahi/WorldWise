import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <div className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}

export default CityList;
