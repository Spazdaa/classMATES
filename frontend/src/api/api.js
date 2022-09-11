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

// const axiosClient = axios.create({
//   baseUrl: '/',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     Authorization: 'Token e18cb84266704dde8967712f127c16299cac48bd',
//   },
// });

const token = localStorage.getItem('token');
axios.defaults.headers.common.Authorization = `Token ${JSON.parse(token)?.token || ''}`;

const api = {
  async getMatches(page, size) {
    // const response = await axios.get('http://localhost:8000/matches', params={page, size});
    // eslint-disable-next-line no-console
    console.log(page, size);
    const response = {
      data: [
        new MatchInfo('001', 'John Doe', 46, 'john@gmail.com', 'email'),
        new MatchInfo('002', 'Jane Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('003', 'Janee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('004', 'Janeee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('005', 'Janeee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('006', 'Janeeeee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('007', 'Janeeee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('008', 'Janeeee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('009', 'Janee eDoe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('010', 'Janee Doe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('011', 'Jane eDoe', 71, 'jane@gmail.com', 'email'),
        new MatchInfo('012', 'Janeee Doe', 71, 'jane@gmail.com', 'email'),
      ],
    };
    return response.data;
  },

  async getMatchDetails(uid) {
    // const response = await axios.get(`http://localhost:8000/matches/${uid}`);
    // eslint-disable-next-line no-console
    console.log(uid);
    const response = {
      data: {
        uid: '001',
        name: 'John Doe',
        percentage: 46,
        contactInfo: 'johndoe@gmail.com',
        contactType: 'email',
        classes: [{
          subject: 'Math',
          number: 'MATH 101',
          section: 'A',
        },
        {
          subject: 'Computer Science',
          number: 'CS 101',
          section: 'A',
        }],
      },
    };
    return response.data;
  },

  async uploadIcs(body) {
    const response = await axios.put('http://localhost:8000/upload', body);
    return response.data;
  },
};

export default api;
