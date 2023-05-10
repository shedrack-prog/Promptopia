'use client';
import { useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPost = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const { data } = await axios.post('/api/prompt/create', {
        prompt: post.prompt,
        tag: post.tag,
        userId: session?.user.id,
      });
      console.log(data);
      if (data.success === true) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
