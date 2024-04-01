/**
 * @param {Model} model Collection of the DB to be counted
 * @param {number} limit Number to make the pagination
 * @param {any} filter Filter used to query documents (optional)
 * @returns Total pages of a collection using a limit to make the pagination
 */
export const totalPages = async (model: any, limit: number, filter?: any): Promise<any> => {
  if (filter) {
    return model.countDocuments(filter).then((total: number) => {
      return Math.ceil(total / limit)
    })
  } else {
    return model.countDocuments().then((total: number) => {
      return Math.ceil(total / limit)
    })
  }
}
