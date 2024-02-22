import { useState } from "react";

export const GuestList: React.FC = () => {
  const [name, setName] = useState("");
  const [guestList, setGuesList] = useState<string[]>([]);

  const addGuest = () => {
    setName("");
    setGuesList([...guestList, name]);
  };

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guestList.map((guest) => {
          return <li key={guest}>{guest}</li>;
        })}
      </ul>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addGuest}>Add Guest</button>
    </div>
  );
};
