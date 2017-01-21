

var base = "https://carclient.lebopark.com";
var address = function(addr) {
    return base + addr;
};
var site = {
    // 获取停车状态信息
    apiGetVehicleStatus: 
    address("/api/lbcarrest/unvld/vehicleStatusInfoForWX"),

    // 创建停车费订单
    apiCreateParkFeeOrder:
    address("/api/lbcarrest"),
};

module.exports = site;