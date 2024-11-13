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

export const createArticleAPI = async (
  content: string,
  mediaFiles: File[],
): Promise<any> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('AccessToken이 존재하지 않습니다. 로그인해주세요.');
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/article`;
    const formData = new FormData();

    // JSON 데이터를 Blob 형태로 추가
    const articleData = { content }; // content만 포함된 객체

    formData.append(
      'content', // 백엔드에서 @RequestPart로 받을 이름
      new Blob([JSON.stringify(articleData)], { type: 'application/json' }),
    );

    // mediaFiles 추가
    mediaFiles.forEach(file => {
      formData.append('mediaFiles', file);
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // Content-Type을 명시적으로 설정하지 않음 (FormData가 자동으로 설정)
      },
      body: formData,
    });

    console.log('Response status : ', res.status);

    if (!res.ok) {
      throw new Error(`Error:${res.status}`);
    }

    const data = await res.json();
    console.log(`Response Data : `, data);

    return data.result;
  } catch (error) {
    console.error(`Error fetching Article: `, error);
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
