import HttpRequest from '../utils/request'

export function item_list (query = {}, method) {
  return HttpRequest('/item_bank/item_list', method, query)
}
