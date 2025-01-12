import { useState, useImperativeHandle, forwardRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const UserOrderAdress = forwardRef((_, ref) => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const initialAddress = {
    city: "",
    street: "",
    house: "",
    app: "",
  };

  const [address, setAddress] = useState(initialAddress);

  const inputHandler = (e, key) => {
    setAddress((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const clearAddress = () => {
    setAddress((prev) => ({ ...initialAddress }));
  };

  useImperativeHandle(ref, () => ({
    getAddress: () => {
      return address;
    },
  }));

  return (
    <div className="border rounded-xl shadow-md p-4 mt-4">
      <YMaps>
        <Map defaultState={defaultState} width={286} height={200}>
          <Placemark geometry={[55.684758, 37.738521]} />
        </Map>
      </YMaps>

      {/* <div className="bg-gray-500 rounded-xl w-full h-44 flex justify-center items-center">
        Map
      </div> */}

      <input
        value={address.city}
        onChange={(e) => inputHandler(e, "city")}
        type="text"
        placeholder="city"
        className="w-full border rounded-xl mt-4 placeholder-gray-500 p-2"
      />
      <input
        value={address.street}
        onChange={(e) => inputHandler(e, "street")}
        type="text"
        placeholder="street"
        className="w-full border rounded-xl mt-2 placeholder-gray-500 p-2"
      />
      <div className="flex gap-2 mt-2">
        <input
          value={address.house}
          onChange={(e) => inputHandler(e, "house")}
          type="text"
          placeholder="house"
          className="w-full border rounded-xl placeholder-gray-500 p-2"
        />
        <input
          value={address.app}
          onChange={(e) => inputHandler(e, "app")}
          type="text"
          placeholder="apparment"
          className="w-full border rounded-xl placeholder-gray-500 p-2"
        />
      </div>
      <button
        onClick={() => clearAddress()}
        className="rounded-full border w-20 mt-2 p-1 bg-red-400 hover:bg-red-500 text-white font-bold"
      >
        Clear
      </button>
    </div>
  );
});

UserOrderAdress.displayName = "UserOrderAdress";

export default UserOrderAdress;
