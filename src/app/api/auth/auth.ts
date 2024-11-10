export interface SignUpData {
  email: string;
  password: string;
  customId: string;
  userName: string;
  phoneNumber: string;
  userBirthDay: number;
  userBirthMonth: number;
  userBirthYear: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ProfileData {
  email: string;
  customId: string;
  userName: string;
  phoneNumber: string;
  userBirthYear: number;
  userBirthMonth: number;
  userBirthDay: number;
  profileImageUrl: string | null;
  backgroundProfileImageUrl: string | null;
  description: string | null;
  websiteUrl: string | null;
  location: string | null;
}

export const SignUp = async (data: SignUpData): Promise<any> => {
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

  return res;
};

export const Login = async (data: LoginData): Promise<any> => {
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

  return res;
};

export const getProfileInfo = async (): Promise<ProfileData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/myinfo`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await res.json();
  return data.result;
};
