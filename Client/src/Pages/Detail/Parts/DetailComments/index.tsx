import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import HalfRating from "./stars"; // Ensure this works correctly
import user from "../../../../assets/SVGs/user.svg";
import { Star } from "lucide-react";
import reviewService from "../../../../services/review";



const Comments = () => {
  const { productId } = useParams<{ productId: string }>(); // Ensure productId is correctly typed
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (productId) fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    try {
      const response = await reviewService.getAll();
      setComments(response.data.items || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return console.error("Content cannot be empty.");
    if (!productId) return console.error("Product ID is missing.");

    try {
      await reviewService.create({
        productId,
        content,
        rating,
      });
      setContent("");
      setRating(5); // Reset rating after submission
      fetchComments(); // Refresh comments
    } catch (error: any) {
      console.error("Error submitting comment:", error?.response?.data || error);
    }
  };

  return (
    <div className={style.CommentContainer}>
      <div className={style.Left}>
        <h3>Comments</h3>
        <p>Leave your comments here for other customers</p>
        <input
          type="text"
          placeholder="Share your thoughts about this product here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={style.Commenting}>
          <button onClick={handleSubmit}>Comment</button>
          <HalfRating setRating={setRating} /> {/* Ensure this component works correctly */}
        </div>
      </div>
      <div className={style.Right}>
        <div className={style.Comments}>
          {comments.map((comment) => (
            <div key={comment._id} className={style.Comment}>
              <div className={style.CommentTop}>
                <div className={style.CommentTopLeft}>
                  <img src={user} alt="" className="w-[30px] h-[30px]" />
                  <div className={style.CommentUser}>
                    <h3>{comment.author?.name || "Anonymous"}</h3>
                    <p>{new Date(comment.createdAt).toDateString()}</p>
                  </div>
                </div>
                <div className={style.CommentTopRight}>
                  <div className={style.Rating}>
                    {[...Array(comment.rating)].map((_, i) => (
                      <Star key={i} fill="white" />
                    ))}
                  </div>
                </div>
              </div>
              <div className={style.CommentContent}>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
