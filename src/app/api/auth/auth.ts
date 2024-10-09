export interface SignUpData {
  email: string;
  password: string;
  customId: string;
  userName: string;
  phoneNumber: string;
  userBirthDay: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const SignUp = async (data: SignUpData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      console.log('회원가입 실패');
    }
    return res.json();
  } catch (error: unknown) {
    console.error(error);
  }
};

export const Login = async (data: LoginData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
