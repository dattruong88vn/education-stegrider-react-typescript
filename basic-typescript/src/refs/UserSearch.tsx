import { useEffect, useRef, useState } from "react";

const users = [
  { name: "Dat", age: 37 },
  { name: "Trang", age: 25 },
  { name: "Candy", age: 10 },
  { name: "Coffee", age: 4 },
];

type UserType = { name: string; age: number } | undefined;

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSearch = () => {
    const foundUser = users.find(
      (user) => user.name.toLowerCase() === inputRef.current?.value
    );
    setUser(foundUser);
  };

  return (
    <div>
      User Search
      <input ref={inputRef} />
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
