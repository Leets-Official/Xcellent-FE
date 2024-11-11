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

export interface FollowerData {
  customId: string;
  userName: string;
}

export interface FollowersResponse {
  content: FollowerData[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
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
    console.log('Response status:', res.status);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log('Response data: ', data);
    return data.result;
  } catch (error) {
    console.error('Error fetching profile data: ', error);
    throw error;
  }
};

export const getFollowersList = async (
  customId: string,
  pageNo: number = 1,
): Promise<FollowersResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken이 존재하지 않습니다. 로그인해주세요.');
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/followers?pageNo=${pageNo}&customId=${customId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response status: ', res.status);

    if (!res.ok) {
      throw new Error(`Error:${res.status}`);
    }

    const data = await res.json();
    console.log(`Response data: `, data);

    return data.result;
  } catch (error) {
    console.error(`Error fetching followers list: `, error);
    throw error;
  }
};
