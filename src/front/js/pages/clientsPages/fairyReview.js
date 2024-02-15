import React, { useState } from 'react';

const Fairy = ({ avatar, name, title }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="fairy-card">
      <div className="fairy-info">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="details">
          <h2>{name}</h2>
          <p>{title}</p>
        </div>
      </div>
      <div className="rating-section">
        <p>Rate this Fairy:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? 'star filled' : 'star'}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="comment-section">
        <textarea
          rows="4"
          cols="50"
          placeholder="Leave a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
    </div>
  );
};

export default Fairy;