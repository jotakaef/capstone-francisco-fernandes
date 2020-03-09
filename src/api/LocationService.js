import {API_URI} from "../Constants";
import axios from "axios";

const URL_BASE = `${API_URI}/locations`;

class LocationService {
    getAllLocationScan() {
        return axios.get(`${URL_BASE}/all/scan`);
    }
}

export default new LocationService();
