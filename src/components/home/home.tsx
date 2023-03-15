/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { UserStructure } from '../../models/user';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

import style from './home.style.module.scss';

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
    <div className={style.home}>
      <div className={style.homeHeader}>
        <h2>Guitar World</h2>
        <p>Welcome to the best guitar shop</p>
        <p>Professional instruments, for professional musicians</p>
      </div>

      <div className={style.homeBody}>
        <h3>New user?</h3>
        <p>Be part of this magnificent world</p>

        <div className={style.homeBodyForm}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username:"
              required
            />

            <input type="email" name="email" placeholder="Email:" required />

            <input
              type="password"
              name="password"
              role="textbox"
              placeholder="Password:"
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
