import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import HalfRating from "./stars"; 
import user from "../../../../assets/SVGs/user.svg";
import { Star } from "lucide-react";
import reviewService from "../../../../services/review";

const Comments = () => {
  const { id } = useParams<{ id: string }>();

  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await reviewService.getByProductId(id as string);
      setComments(response.items || []); 
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return console.error("Content cannot be empty.");
    if (!id) return console.error("Product ID is missing.");
    console.log(id)
    try {
      await reviewService.create({
        productId: id,
        content,
        rating,
      });
      setContent("");
      setRating(5); 
      fetchComments(); 
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
          <HalfRating setRating={setRating} /> 
        </div>
      </div>
      <div className={style.Right}>
        <div className={style.Comments} style={{ maxHeight: "400px", overflowY: "auto" }}>
          {comments.length > 0 ? (
            comments.map((comment) => (
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
                      <Star fill="white" /> <span>{comment.rating}</span>
                    </div>
                  </div>
                </div>
                <div className={style.CommentContent}>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={style.NoComments}>
              <p className="text-gray-500 text-center text-lg">There are no reveiws here yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
