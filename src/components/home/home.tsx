/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { UserStructure } from '../../models/user';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

export default function Home() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { registerUser } = useUsers(userRepo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formNewUser = ev.currentTarget;

    const newUser: Partial<UserStructure> = {
      username: (formNewUser.elements[0] as HTMLFormElement).value,
      email: (formNewUser.elements[1] as HTMLFormElement).value,
      password: (formNewUser.elements[2] as HTMLFormElement).value,
    };

    registerUser(newUser);
  };

  return (
    <>
      <h2>Guitar World</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>

        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" role="textbox" required />
        </label>

        <button type="submit">Register</button>
      </form>
    </>
  );
}
