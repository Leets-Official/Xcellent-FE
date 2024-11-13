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
  followersCount: number;
  followingsCount: number;
  isFollowing: boolean;
  isMyProfile: boolean;
}

export const getProfileInfo = async (): Promise<ProfileData> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken 이 존재하지 않습니다. 로그인해주세요');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/myinfo`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log('Response status:', res.status);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    // console.log('Response data: ', data);
    return data.result;
  } catch (error) {
    console.error('Error fetching profile data: ', error);
    throw error;
  }
};

export const getOtherUserInfo = async (
  customId: string,
): Promise<ProfileData> => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/info?customId=${customId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log('프로필 조회 성공: ', data);
    return data.result;
  } catch (error) {
    console.error('Error fetching other user profile data: ', error);
    throw error;
  }
};
