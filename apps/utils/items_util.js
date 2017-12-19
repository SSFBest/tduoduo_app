const _ = require('lodash');

export const get_article_list = list =>
  (list === undefined ? [] : removeExpiredItem(list));

export const remove_expired_item = (list) => {
  _.remove(list, item => item.expire);
  return list || [];
};

export const get_type_name = (typeList, typeId) =>
  _.head(_.filter(typeList, o => o.id === typeId.toString())).name;
