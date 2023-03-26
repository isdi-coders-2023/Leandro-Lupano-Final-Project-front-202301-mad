/* eslint-disable jsx-a11y/no-redundant-roles */

import { SyntheticEvent, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { UserStructure } from '../../models/user';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

import style from './login.style.module.scss';

export default function Login() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { usersState, loginUser } = useUsers(userRepo);

  const navigate = useNavigate();

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formLoginUser = ev.currentTarget;

    const logUser: Partial<UserStructure> = {
      username: (formLoginUser.elements[0] as HTMLFormElement).value,
      password: (formLoginUser.elements[1] as HTMLFormElement).value,
    };

    loginUser(logUser);

    formLoginUser.reset();
  };

  useEffect(() => {
    if (usersState.userLogged.token !== undefined) navigate('/products');
  }, [navigate, usersState.userLogged.token]);

  return (
    <section className={style.login}>
      <div className={style.loginHeader}>
        <h2>Login</h2>
        <p>Good to see you again!</p>
        <p>Let`s rock!</p>
      </div>

      <div className={style.loginBody}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username:" required />

          <input
            type="password"
            name="password"
            role="textbox"
            placeholder="Password:"
            required
          />

          <button type="submit">Login</button>

          <p className={style.loginBodyMessage}>
            New user?
            <Link to="/home">
              <span className={style.loginBodyMessageLink}>
                {' '}
                Create an account here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
