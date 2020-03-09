import {API_URI} from "../Constants";
import axios from "axios";

const URL_BASE = `${API_URI}/productLocations`;

class ProductLocationsService {
    getProductLocationsByLocation(idLocation) {
        return axios.get(`${URL_BASE}/search/byLocation/${idLocation}`);
    }
}

export default new ProductLocationsService();
