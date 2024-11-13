import axios from 'axios';

// 게시글 작성 API 호출 함수 (클라이언트용)
const createPost = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/article', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      return response.data.result.articleId; // 서버에서 반환된 articleId
    } else {
      throw new Error(response.data.message || '게시글 생성 실패');
    }
  } catch (error) {
    console.error('게시글 생성 중 오류 발생:', error);
    throw error;
  }
};

export default createPost;
