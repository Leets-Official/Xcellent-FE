export const followUser = async (customId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken이 존재하지 않습니다. 로그인해주세요.');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/follow`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customId }),
      },
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log('팔로우 요청 성공: ', data);
  } catch (error) {
    console.error('팔로우 요청 실패: ', error);
    throw error;
  }
};

export const unfollowUser = async (customId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken 이 존재하지 않습니다. 로그인해주세요.');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/follow`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customId }),
      },
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log('언팔로우 요청 성공:', data);
  } catch (error) {
    console.error('언팔로우 요청 실패:', error);
    throw error;
  }
};
