import HttpRequest from '../utils/request'
// GET /examinee_bank/examinee_list
export function examinee_list (query = {}, method) {
  return HttpRequest('/examinee_bank/examinee_list', method, query)
}
