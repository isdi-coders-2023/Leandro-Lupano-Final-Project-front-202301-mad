/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { UserStructure } from '../../models/user';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

export default function Login() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { loginUser } = useUsers(userRepo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formLoginUser = ev.currentTarget;

    const logUser: Partial<UserStructure> = {
      username: (formLoginUser.elements[0] as HTMLFormElement).value,
      password: (formLoginUser.elements[1] as HTMLFormElement).value,
    };

    loginUser(logUser);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>

        <label>
          Password
          <input type="password" name="password" role="textbox" required />
        </label>

        <button type="submit">Login</button>
      </form>
    </>
  );
}
