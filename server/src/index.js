import Bus from "bus-core";
import Api from "./apis";
import Model from "./models";
import Schema from "./schemas";

const config = require('./config')
const bus = new Bus({
    config,
    Api,
    Model,
    Schema
})

bus.start().then(app => {
    console.info('app start success');
})

export default bus