const ReviewCard = ({ review, channels, users }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p>Review of Weather Channel: {channels.find(channel => channel._id === review.channel_id)?.name || 'Channel Not Found'}</p>
                <p>Rating: {review.rating}/10</p>
                <p>Review: {review.message}</p>
                <p>Date: {review.date}</p>
                <p>By: {users.find(user => user._id === review.user_id)?.username || 'User Not Found'}</p>

            </div>
        </div>
    );
};
export default ReviewCard;