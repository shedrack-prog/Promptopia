'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  // states declaration
  const [copied, setCopied] = useState('');

  // Helper Hooks
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);

    setTimeout(() => {
      setCopied('');
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt?.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <Link href={`/profile/${prompt.creator.username}`}>
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {prompt.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {prompt.creator.email}
              </p>
            </div>
          </Link>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            height={12}
            width={12}
            alt="copy_icon"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id &&
        pathName === `/profile/${session?.user.username}` && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              onClick={handleEdit}
              className="font-inter text-sm green_gradient cursor-pointer"
            >
              Edit
            </p>
            <p
              onClick={handleDelete}
              className="font-inter text-sm orange_gradient cursor-pointer"
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
