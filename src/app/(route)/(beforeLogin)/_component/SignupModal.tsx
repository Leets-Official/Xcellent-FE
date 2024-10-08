'use client';

import { useFormState } from 'react-dom';
import onSubmit from '../_lib/signup';
import { useState } from 'react';

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  console.log('state', state);

  /*생년월일 상태관리 */
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  return (
    <form action={formAction}>
      <div>
        <div>
          <label className="text-white" htmlFor="email">
            이메일
            <input
              id="email"
              name="email"
              type="text"
              placeholder=""
              required
            />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="name">
            이름
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder=""
              required
            />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder=""
            required
          />
        </div>
        <div>
          <label className="text-white" htmlFor="customId">
            아이디
            <input id="customId" name="customId" required type="text" />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="phoneNumber">
            핸드폰번호
            <input id="phoneNumber" name="phoneNumber" required type="text" />
          </label>
        </div>
        <div>
          <label className="text-white" htmlFor="birth">
            생년월일
          </label>
          <div className="flex">
            <select name="year" required id="">
              <option value=""></option>
            </select>
          </div>
          <input id="birth" name="birth" required type="text" />
        </div>
      </div>
      <div>
        <button type="submit" className="bg-white">
          가입하기
        </button>
      </div>
    </form>
  );
}
