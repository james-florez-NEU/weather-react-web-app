import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/users`;
export const WEATHER_API = `${BASE_API}/weather`;
export const CHANNELS_API = `${BASE_API}/channels`;
export const REVIEWS_API = `${BASE_API}/reviews`;

const request = axios.create({
    withCredentials: true,
});

// User Functions
export const signin = async (credentials) => {
    const response = await request.post( `${USERS_API}/signin`, credentials );
    return response.data;
};
export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};
export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
};
export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};
export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
};
export const deleteUser = async (user) => {
    const response = await request.delete(
        `${USERS_API}/${user._id}`);
    return response.data;
};
export const signup = async (credentials) => {
    const response = await request.post(
        `${USERS_API}/signup`, credentials);
    return response.data;
};
export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
};
export const addFavoriteLocation = async (userId, locationId) => {
    const response = await request.post(`${USERS_API}/favorites/${userId}`, {locationId: locationId});
    return response.data;
}
export const addFavoriteChannel = async (userId, channelId) => {
    const response = await request.post(`${USERS_API}/favoriteChannels/${userId}`, {channelId: channelId});
    return response.data;
}

// Weather Functions
export const getWeather = async (id) => {
    const response = await request.get(`${WEATHER_API}/current/${id}`);
    return response.data;
};
export const searchLocations = async (key) => {
    const response = await request.get(`${WEATHER_API}/search/${key}`);
    return response.data;
};

// Channel Functions
export const getAllChannels = async () => {
    const response = await request.get(`${CHANNELS_API}`);
    return response.data;
}
export const findChannelById = async (id) => {
    const response = await request.get(`${CHANNELS_API}/${id}`);
    return response.data;
}
export const updateChannel = async (channel) => {
    const response = await request.put(`${CHANNELS_API}/${channel._id}`, channel);
    return response.data;
}

// Review Functions
export const getAllReviews = async () => {
    const response = await request.get(`${REVIEWS_API}`);
    return response.data;
}
export const createReview = async (review) => {
    const response = await request.post(`${REVIEWS_API}/create`, review);
    return response.data;
}
export const getNewestReviews = async () => {
    const response = await request.get(`${REVIEWS_API}/newest`);
    return response.data;
}
export const findReviewById = async (id) => {
    const response = await request.get(`${REVIEWS_API}/${id}`);
    return response.data;
}
export const deleteReview = async (id) => {
    const response = await request.delete(`${REVIEWS_API}/${id}`);
    return response.data;
}
export const approveReview = async (id) => {
    const response = await request.put(`${REVIEWS_API}/approve/${id}`);
    return response.data;
}
export const flagReview = async (id) => {
    const response = await request.put(`${REVIEWS_API}/flag/${id}`);
    return response.data;
}