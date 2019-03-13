import Api from "bus-core/api"
import user from "./user"

const api = new Api()
api.add({name: 'user', apiClass: user})

export default api
