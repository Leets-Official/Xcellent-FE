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
    console.log('API 요청 URL : ', url);
    console.log('Authorization 헤더:', `Bearer ${token}`);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('팔로워 목록 조회 응답 : ', res.status);

    if (!res.ok) {
      throw new Error(`Error:${res.status}`);
    }

    const data = await res.json();
    console.log(`팔로워 목록: `, data);

    return data.result;
  } catch (error) {
    console.error(`Error fetching followers list: `, error);
    throw error;
  }
};
