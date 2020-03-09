import {API_URI} from "../Constants";
import axios from "axios";

const URL_BASE = `${API_URI}/inventoryCount`;

class InventoryCountService {
    uploadXlsSheetFile(file) {
        return axios.post(`${URL_BASE}/upload`, file);
    }
}

export default new InventoryCountService();
