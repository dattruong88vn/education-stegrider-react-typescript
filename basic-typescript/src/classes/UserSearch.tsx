import { Component } from "react";

interface User {
  name: string;
  age: number;
}

interface UserSearchProps {
  users: User[];
}

interface UserSearchState {
  name: string;
  user: User | undefined;
}

class UserSearch extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: "",
    user: undefined,
  };

  onSearch = () => {
    const foundUser = this.props.users.find(
      (user) => user.name.toLowerCase() === this.state.name
    );
    this.setState({ user: foundUser });
  };

  render() {
    const { name, user } = this.state;
    return (
      <div>
        User Search
        <input
          placeholder="Search"
          value={name}
          onChange={(e) =>
            this.setState({ name: e.target.value.toLowerCase() })
          }
        />
        <button onClick={this.onSearch}>Search</button>
        {user && (
          <div>
            <div>name: {user.name}</div>
            <div>age: {user.age}</div>
          </div>
        )}
      </div>
    );
  }
}

export default UserSearch;
