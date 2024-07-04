// src/components/PostDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import placeholderLogo from "../assets/placeholder.svg";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/apis/posts/${postId}/`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/apis/post/${postId}/comments/`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5001/apis/post/${postId}/comments/ `,
        {
          content: newComment,
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="text-primary hover:underline mb-4"
      >
        ⬅ Back to Posts
      </button>
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
      </header>
      <img
        src={placeholderLogo}
        width={600}
        height={400}
        alt={post.title}
        className="rounded-lg object-cover w-full h-48 md:h-auto mb-4"
      />
      <div className="mb-8">
        <p>{post.content}</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div>
          <textarea
            className="w-full border p-2 rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Post Comment
          </button>
        </div>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 border rounded-lg">
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
