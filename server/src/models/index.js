import Model from "bus-core/model"
import user from "./user"

const model = new Model()
model.add({name: 'user', model: user})

export default model
