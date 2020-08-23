import request from "../utils/request";

// 获取游戏中心地址
export function login(data) {
  return request({
    url: "/center/user/login",
    method: "POST",
    data
  });
}

// 获取游戏中心地址
export function getall() {
  return request({
    url: "/admin/game_center/getall",
    method: "GET"
  });
}

// 添加游戏中心地址
export function create(data) {
  return request({
    url: "/admin/game_center/create",
    method: "post",
    data
  });
}
// 编辑游戏中心地址
export function edit(data) {
  return request({
    url: "/admin/game_center/edit",
    method: "post",
    data
  });
}
export function deleteGameCenter(data) {
  return request({
    url: `/admin/game_center/${data}`,
    method: "delete",
    data
  });
}
// 获取游戏中心地址
export function oemGetall() {
  return request({
    url: "/admin/oem/getall",
    method: "GET"
  });
}

export function oemCreate(data) {
  return request({
    url: "/admin/oem/create",
    method: "post",
    data
  });
}

export function deleteOem(data) {
  return request({
    url: `/admin/oem/${data}`,
    method: "delete"
  });
}
export function oemEdit(data) {
  return request({
    url: "/admin/oem/edit",
    method: "post",
    data
  });
}

// 获取代理商
export function getAllAgentInfo({
  offset,
  limit,
  orderby = "create_time desc",
  account = ""
}) {
  return request({
    url: `/admin/agent/getall?offset=${offset}&limit=${limit}&orderby=${orderby}&account=${account}`,
    method: "GET"
  });
}

// 创建代理商
export function createAgent(data) {
  return request({
    url: `admin/agent/create`,
    method: "post",
    data
  });
}

export function editAgent(data) {
  return request({
    url: `admin/agent/edit`,
    method: "post",
    data
  });
}
export function deleteAgent(data) {
  return request({
    url: `admin/agent/${data}`,
    method: "delete"
  });
}

// 获取userIngfo
export function getUserInfo(account) {
  return request({
    url: `center/user/getUserInfo?account=${account}`,
    method: "GET"
  });
}

// 获取userIngfo
export function checkout(account) {
  return request({
    url: `/admin/agent/checkout?account=${account}`,
    method: "GET"
  });
}

// 充值
export function recharge(data) {
  return request({
    url: `/admin/agent/recharge`,
    method: "POST",
    data
  });
}

// 获取userIngfo
export function getRechargeRecords({
  offset,
  limit,
  orderby,
  searchdate,
  agentname
}) {
  return request({
    url: `/admin/agent/getRechargeRecords?offset=${offset}&limit=${limit}&orderby=${orderby ||
      ""}&searchdate=${searchdate || ""}&agentname=${agentname || ""}`,
    method: "GET"
  });
}

export function getallRole() {
  return request({
    url: `/admin/role/getall`,
    method: "get"
  });
}
export function getallUser(data) {
  return request({
    url: `/admin/user/getall?offset=${data.offset}&limit=${data.limit}`,
    method: "get"
  });
}

export function allocateRole(data) {
  return request({
    url: `/admin/user_role/allocate`,
    method: "post",
    data
  });
}

export function getAllCountries() {
  return request({
    url: `/admin/area/getAllCountries`,
    method: "get"
  });
}

export function getAllRegionsById(country_id) {
  return request({
    url: `/admin/area/getAllRegions?country_id=${country_id}`,
    method: "get"
  });
}

export function getAllProvincesById(region_id) {
  return request({
    url: `/admin/area/getAllProvinces?region_id=${region_id}`,
    method: "get"
  });
}

export function getAllArea() {
  return request({
    url: `/center/area/getAllArea`,
    method: "get"
  });
}

export function addArea(params) {
  return request({
    url: `/admin/area/add`,
    method: "post",
    data: params
  });
}

export function deleteArea(params) {
  return request({
    url: `/admin/area/${params}`,
    method: "delete"
  });
}

export function addRole(params) {
  return request({
    url: `/admin/role/create`,
    method: "post",
    data: params
  });
}

export function editRole(params) {
  return request({
    url: `/admin/role/edit`,
    method: "post",
    data: params
  });
}

export function deleteRole(id) {
  return request({
    url: `/admin/role/${id}`,
    method: "delete"
  });
}

export function getalloemenabled() {
  return request({
    url: `/admin/oem/getallenabled`,
    method: "get"
  });
}

export function getOemUpgradeUrl() {
  return request({
    url: `/admin/upgrade_version/getall`,
    method: "get"
  });
}

export function editOemUpgradeUrl(data) {
  return request({
    url: `/admin/upgrade_version/edit`,
    method: "post",
    data
  });
}
export function deleteOemUpgradeUrl(id) {
  return request({
    url: `/admin/upgrade_version/${id}`,
    method: "delete"
  });
}

export function addOemUpgradeUrl(data) {
  return request({
    url: `/admin/upgrade_version/add`,
    method: "post",
    data
  });
}
