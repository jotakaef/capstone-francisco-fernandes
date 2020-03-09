import {API_URI} from "../Constants";
import axios from "axios";

const URL_BASE = `${API_URI}/products`;

class ProductsService {
    getProductFromCode(productScans) {
        return axios.post(`${URL_BASE}/search/byCode`, productScans);
    }
}

export default new ProductsService();
