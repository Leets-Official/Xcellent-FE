import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { content } = req.body; // content는 JSON 본문에서 가져옴
    const mediaFiles = req.query.mediaFiles as string[]; // mediaFiles는 쿼리 파라미터에서 가져옴

    // 게시글 생성 로직 추가
    try {
      const newPost = {
        content,
        mediaFiles,
        // 기타 필요한 데이터
      };

      res.status(200).json({
        success: true,
        result: { articleId: 'generated-article-id' },
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create post',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
