import { useState } from "react";

const users = [
  { name: "Dat", age: 37 },
  { name: "Trang", age: 25 },
  { name: "Candy", age: 10 },
  { name: "Coffee", age: 4 },
];

type UserType = { name: string; age: number } | undefined;

const UserSearch: React.FC = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState<UserType>();

  const onSearch = () => {
    const foundUser = users.find((user) => user.name.toLowerCase() === name);
    setUser(foundUser);
  };

  return (
    <div>
      User Search
      <input
        placeholder="Search"
        value={name}
        onChange={(e) => setName(e.target.value.toLowerCase())}
      />
      <button onClick={onSearch}>Search</button>
      {user && (
        <div>
          <div>name: {user.name}</div>
          <div>age: {user.age}</div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
