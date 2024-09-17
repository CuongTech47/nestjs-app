import * as _ from 'lodash';

export const getInfoData = ({ fileds = [], obj = {} }) => {
  return _.pick(obj, fileds);
};
