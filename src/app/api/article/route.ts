import { NextResponse } from 'next/server';

// POST 요청을 처리하는 함수
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const content = formData.get('content');
    const images = formData.getAll('images'); // 여러 이미지를 가져옴

    // 게시글 생성 로직 추가 (데이터베이스 저장 등)
    const articleId = 'generated-article-id'; // 실제 로직으로 대체

    return NextResponse.json({ success: true, result: { articleId } });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create post' },
      { status: 500 },
    );
  }
}
