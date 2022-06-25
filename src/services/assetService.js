import http from '../http/http-common'

const getAll = () => {
    return http.get("/device");
  }

  const get = id => {
    return http.get(`/device/detail?Id=${id}`);
  }

  const update = (id, data) => {
    return http.put(`/device/detail?Id=${id}`, data);
  };

  const assetService = {
      getAll, 
      get, 
      update
  }

  export default assetService