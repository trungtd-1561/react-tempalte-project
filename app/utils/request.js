import axios from 'axios';
import qs from 'qs';

export default function request(method, service, options) {
  return axios({
    method,
    url: `${window.APIEndpointBaseURL}/${service}`,
    ...options,
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: 'brackets' }),
  });
}
