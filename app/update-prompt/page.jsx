'use client';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getPromptDetails = async () => {
      const { data } = await axios.get(`api/prompt/${promptId}`);
      setPost({
        prompt: data.prompt.prompt,
        tag: data.prompt.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  // Editing Prompt
  const EditPrompt = async (e) => {
    e.preventDefault();

    if (!promptId) {
      alert('No prompt Id found');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag,
      });
      //   console.log(data);
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
};

export default CreatePrompt;
