"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function AllProfile() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${user?.id}/posts`);
      const data = await res.json();

      setPosts(data);
    };

    user?.id && fetchPost();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    if (confirm(`Confirm Delete`)) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        const filtered = posts.filter((x) => x._id !== post._id);

        setPosts(filtered);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default AllProfile;
