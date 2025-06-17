import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class HousesService {
  // async getHouses() {
  //   const houses = await dbContext.Houses.find()
  //   return houses
  // }
  async getHousesByQuery(houseQuery) {
    const sortBy = houseQuery.sort
    delete houseQuery.sort
    const pageNumber = parseInt(houseQuery.page) || 1
    delete houseQuery.page
    const searchBy = houseQuery.search
    delete houseQuery.search
    if (searchBy) houseQuery.description = { $regex: new RegExp(searchBy, 'ig') }

    const houseLimit = 10
    const skipAmount = (pageNumber - 1) * houseLimit

    const houseCount = await dbContext.Houses.countDocuments(houseQuery)
    const totalPages = Math.ceil(houseCount / houseLimit)

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} does not exsist. There are only ${totalPages} pages of houses to look through`)
    }

    const houses = await dbContext.Houses
      .find(houseQuery)
      .skip(skipAmount)
      .limit(houseLimit)
      .sort(sortBy)
      .populate('creator', 'name picture')

    const pageResponse = {
      currentPage: pageNumber,
      previousPage: pageNumber - 1 || '',
      nextPage: totalPages == pageNumber ? '' : pageNumber + 1,
      totalResults: houseCount,
      totalPages: totalPages,
      houses: houses
    }
    return pageResponse
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    return house
  }
}
export const housesService = new HousesService()