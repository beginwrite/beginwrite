import { useRouter } from 'next/router';
import React from 'react';

import PostEditPage from '@/components/pages/Post/PostEditPage';

export default function PostEdit() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }

  return <PostEditPage postId={id.toString()} />;
}
