/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { UserStructure } from '../../models/user';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

import style from './register.style.module.scss';

export default function Register() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { registerUser } = useUsers(userRepo);

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formNewUser = ev.currentTarget;

    const newUser: Partial<UserStructure> = {
      username: (formNewUser.elements[0] as HTMLFormElement).value,
      email: (formNewUser.elements[1] as HTMLFormElement).value,
      password: (formNewUser.elements[2] as HTMLFormElement).value,
    };

    registerUser(newUser);

    setIsRegister(true);

    setTimeout(() => {
      setIsRegister(false);
      navigate('/login');
    }, 2000);

    formNewUser.reset();
  };

  return (
    <section className={style.register}>
      <div className={style.registerHeader}>
        <h2>Guitar World</h2>
        <p>Welcome to the best guitar shop</p>
        <p>Professional instruments, for professional musicians</p>
      </div>

      <div className={style.registerBody}>
        <h3>New user?</h3>
        <p>Be part of this magnificent world</p>

        <div className={style.registerBodyForm}>
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

            <p className={style.registerBodyFormLoginMessage}>
              Already have an account?
              <Link to="/login">
                <span className={style.registerBodyFormLoginMessageLink}>
                  {' '}
                  Login here
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>

      <p
        className={
          isRegister
            ? style.registerRegisterMessage
            : style.registerRegisterMessageHidden
        }
      >
        Registration completed successfully ✅
      </p>
    </section>
  );
}
