import axios from 'axios';

export const fetchRankings = () => {
	return axios.get(`/api/ranking`)
		.then(resp=>resp.data);

};


export const updateRanking = (newName, newScore)=> {
	return axios.post('/api/ranking', {newName, newScore})
		.then(resp =>resp.data);
}