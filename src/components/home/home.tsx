import { SyntheticEvent } from 'react';
import { UserStructure } from '../../models/user';

export default function Home() {
  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formNewUser = ev.currentTarget;

    const newUser: Partial<UserStructure> = {
      username: (formNewUser[0] as HTMLFormElement).value,
      email: (formNewUser[1] as HTMLFormElement).value,
      password: (formNewUser[2] as HTMLFormElement).value,
    };
  };

  return (
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
        <input type="password" name="password" required />
      </label>

      <button type="submit">Register</button>
    </form>
  );
}
