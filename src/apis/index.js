import Axios from "axios";
import { storage } from "../utils/storage";
import { store } from "../redux/store";
import { LOGOUT } from "../redux/actionTypes";
export const SERVER_URL = "https://test.quickreg.cloud";
const axios = Axios.create({ baseURL: SERVER_URL, timeout: 10000 });

axios.interceptors.request.use(async (config) => {
  const access_token = await storage.getItem("access_token");
  config.headers.set("Content-Type", "application/json");
  config.headers.set("Accept", "application/json");
  config.headers.set("Authorization", `X-Api-Token: ${access_token}`);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    //do something
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(error);
  }
);

const login = (data) => axios.post(`/api/login?code=${data.code}`, data);

const getMyConfig = () => axios.get("/api/myconfig");
const getHourMonthGraph = () => axios.get("/hourReg/getHourmonthGraph");
const getHourWeekGraph = () => axios.get("/hourReg/getHourweekGraph");

const getHourRegs = (limit, currentPage) =>
  axios.get(`/api/hourReg/?max=${limit}&offset=${limit * currentPage}`);
const getHourReg = (id) => axios.get(`/api/hourReg/${id}`);
const createHourReg = (data) => axios.post("/api/hourReg", data);
const updateHourReg = (id, data) => axios.put(`/api/hourReg/${id}`, data);
const deleteHourReg = (id) => axios.delete(`/api/hourReg/${id}`);

const getSelfcertifiedHours = (limit, currentPage) =>
  axios.get(`/api/hourSelfcert/?max=${limit}&offset=${limit * currentPage}`);
const getSelfcertifiedHour = (id) => axios.get(`/api/hourSelfcert/${id}`);
const createSelfcertifiedHours = (data) =>
  axios.post("/api/hourSelfcert", data);
const deleteSelfcertifiedHours = (id) =>
  axios.delete(`/api/hourSelfcert/${id}`);
const updateSelfcertifiedHour = (id, data) =>
  axios.put(`/api/hourSelfcert/${id}`, data);

const getSickLeaves = (limit, currentPage) =>
  axios.get(`/api/hourSick/?max=${limit}&offset=${limit * currentPage}`);
const createSickLeaves = (data) => axios.post("/api/hourSick", data);
const getSickLeave = (id) => axios.get(`/api/hourSick/${id}`);
const deleteSickLeave = (id) => axios.delete(`/api/hourSick/${id}`);
const updateSickLeave = (id, data) => axios.put(`/api/hourSick/${id}`, data);

const getMovableHolidayHours = (limit, currentPage) =>
  axios.get(
    `/api/hourMovableHoliday/?max=${limit}&offset=${limit * currentPage}`
  );
const createMovableHolidayHours = (data) =>
  axios.post("/api/hourMovableHoliday", data);
const getMovableHolidayHour = (id) =>
  axios.get(`/api/hourMovableHoliday/${id}`);
const deleteMovableHolidayHour = (id) =>
  axios.delete(`/api/hourMovableHoliday/${id}`);
const updateMovableHolidayHour = (id, data) =>
  axios.put(`/api/hourMovableHoliday/${id}`, data);

const getpreferences = () => axios("/api/myPreferences");
const updatePreference = (data) => axios("/myPreferences/edit", data);

export const apis = {
  login,
  getMyConfig,
  getHourMonthGraph,
  getHourWeekGraph,
  getHourRegs,
  createHourReg,
  updateHourReg,
  deleteHourReg,
  getHourReg,
  getSelfcertifiedHours,
  createSelfcertifiedHours,
  getSelfcertifiedHour,
  deleteSelfcertifiedHours,
  updateSelfcertifiedHour,
  getSickLeaves,
  createSickLeaves,
  getSickLeave,
  deleteSickLeave,
  updateSickLeave,
  getMovableHolidayHours,
  createMovableHolidayHours,
  getMovableHolidayHour,
  deleteMovableHolidayHour,
  updateMovableHolidayHour,
  getpreferences,
  updatePreference,
};
