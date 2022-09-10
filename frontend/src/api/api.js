// import axios from 'axios';
import { MatchInfo } from '../components/Match';

// const axiosClient = axios.create({
//   baseUrl: 'http://localhost:8000',
// });

const api = {
  async getMatches(page, size) {
    // const response = await axiosClient.get('/matches', params={page, size});
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
};

export default api;
