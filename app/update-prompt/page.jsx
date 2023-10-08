"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
function UpdatePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()
    const [post, setPost] = useState({
      prompt: "",
      tag: "",
    });

    const promptId = searchParams.get('id')

    useEffect(() => {
      const getPrompt = async () => {
        const res = await fetch(`/api/prompt/${promptId}`)

        const data = await res.json()

        setPost(data)
      }

      promptId && getPrompt()
    }, [promptId])
    
  
    const updatePrompt = async (e) => {
      e.preventDefault();
  
      setSubmitting(true);

      if(!promptId) return alert("Invalid Prompt")
  
      try {
        const res = await fetch(`/api/prompt/${promptId}`, {
          method: "PATCH",
          body: JSON.stringify({ ...post}),
        });
  
        if(res.ok) {
          router.push("/")
        }
      } catch (error) {
          console.log(error)
      } finally {
          setSubmitting(false)
      }
  
      console.log(post);
    };
    return (
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    );
}

export default UpdatePrompt