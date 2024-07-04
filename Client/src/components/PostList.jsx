// src/components/PostList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import placeholderLogo from "../assets/placeholder.svg";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/apis/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Blog Listing</h1>
        <Link
          to="/create-post"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Post
        </Link>
      </header>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="flex flex-col md:flex-row items-start gap-6 cursor-pointer"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <div className="flex-1">
              <img
                src={placeholderLogo}
                width={600}
                height={400}
                alt={post.title}
                className="rounded-lg object-cover w-full h-48 md:h-auto"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <div className="text-muted-foreground text-sm mt-2">
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toDateString()}
                </time>
              </div>
              <p className="text-muted-foreground">{post.content}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
