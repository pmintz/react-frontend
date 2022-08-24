import axios from 'axios';

const REWARD_API_BASE_URL = "http://localhost:8080/rewards/points";

class RewardService{

    calculatePoints(amt){
        return axios.get(REWARD_API_BASE_URL, amt);
    }

    saveTransaction(transaction){
        return axios.post(REWARD_API_BASE_URL, transaction);
    }
} export default new RewardService()