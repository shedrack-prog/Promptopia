'use client';

import Profile from '@components/Profile';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
  const [allPrompts, setAllPrompts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const userName = pathName.split('/')[2];

  //   update and remove functionalities
  const handleEdit = (prompt) => {
    router.push(`update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (pro) => {
    const hasConfirmed = confirm('Do you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/prompt/${pro._id.toString()}`);

        const filteredPrompts = allPrompts.filter(
          (prom) => prom._id !== pro._id
        );

        setAllPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchAllPrompts = async () => {
      const { data } = await axios.get(
        `/api/users/${userName ? userName : session?.user.id}/prompts`
      );

      setAllPrompts(data.prompts);

      //   console.log(allPrompts);
    };
    if (session?.user.id) {
      fetchAllPrompts();
    }
  }, []);

  return (
    <Profile
      name={`${userName === session?.user.username ? 'My' : userName}`}
      desc={`Welcome to ${
        userName === session?.user.username ? 'your' : userName
      } personalized profile page`}
      data={allPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
