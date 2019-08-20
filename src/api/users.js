import request from "./request";

export const getAllUsers = () => request("/api/users");
