import axios from "axios";
import { Body } from "../types/type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

//prod
const instance = axios.create({
  baseURL: "https://coding-problems-app-server-production.up.railway.app",
});

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewQuestion = async (body: Body) => {
  await instance.post("new", body);
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getAllQuestions = async () => {
  const response = await instance.get("all-questions");
  return response.data;
};

export const getQuestionById = async (id: string) => {
  const response = await instance.get(`question/${id}`);
  return response.data;
};

export const countQuestionsByTopic = async () => {
  const response = await instance.get("/count-by-topic");
  console.log(response.data);
  return response.data;
};

export const countQuestionsByDifficulty = async () => {
  const response = await instance.get("/count-by-difficulty");
  return response.data;
};

export const searchQuestionsByName = async (name: string) => {
  const response = await instance.get(`/search`, {
    params: {
      name,
    },
  });
  return response.data;
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

export const updateQuestionById = async (id: string, body: Body) => {
  await instance.put(`question/${id}`, body);
};

//🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴( DELETE )🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

export const deleteQuestionById = async (id: string) => {
  await instance.delete(`question/${id}`);
};
