import axios from 'axios';

export class MatchInfo {
  constructor(uid, name, percentage, contactInfo, contactType) {
    this.uid = uid;
    this.name = name;
    this.percentage = percentage;
    this.contactInfo = contactInfo;
    this.contactType = contactType;
  }
}

function setToken() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common.Authorization = `Token ${JSON.parse(token)?.token || ''}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

const api = {
  async getMatches(page, size) {
    setToken();
    const response = await axios.get('http://localhost:8000/matches', { config: { params: { page, size } } });
    return response.data.list;
  },

  async getMatchDetails(uid) {
    setToken();
    const response = await axios.get(`http://localhost:8000/user/${uid}`);
    return response.data;
  },

  async uploadIcs(body) {
    setToken();
    const response = await axios.put('http://localhost:8000/upload', body);
    return response.data;
  },

  async deleteIcs() {
    setToken();
    const response = await axios.delete('http://localhost:8000/upload');
    return response.data;
  },
};

export default api;
