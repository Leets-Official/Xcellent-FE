// export interface ArticleData {
//   customId: string;
//   userName: string;
// }

// export interface ArticleResponse {
//   content: ArticleData[];
//   pageable: {
//     pageNumber: number;
//     pageSize: number;
//   };
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   first: boolean;
//   size: number;
//   number: number;
//   numberOfElements: number;
// }

export const createArticleAPI = async (content: string): Promise<any> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken이 존재하지 않습니다. 로그인해주세요.');
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/article`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }), // 요청 본문에 content 추가
    });

    console.log('Response status : ', res.status);

    if (!res.ok) {
      throw new Error(`Error:${res.status}`);
    }

    const data = await res.json();
    console.log(`Response Data : `, data);

    return data.result;
  } catch (error) {
    console.error(`Error fetching Article list: `, error);
    throw error;
  }
};

export const getArticleList = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken이 존재하지 않습니다. 로그인해주세요.');
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/article`;
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
    console.error(`Error fetching Article list: `, error);
    throw error;
  }
};
