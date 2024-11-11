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

export const getFollowersList = async (
  customId: string,
  pageNo: number = 1,
): Promise<FollowersResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken이 존재하지 않습니다. 로그인해주세요.');
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/follower?pageNo=${pageNo}&customId=${customId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response status : ', res.status);

    if (!res.ok) {
      throw new Error(`Error:${res.status}`);
    }

    const data = await res.json();
    console.log(`Response Data : `, data);

    return data.result;
  } catch (error) {
    console.error(`Error fetching followers list: `, error);
    throw error;
  }
};
