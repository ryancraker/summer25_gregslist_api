import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";

class PetsService {
  async getPetsByQuery(petQuery) {
    const sortBy = petQuery.sort;
    delete petQuery.sort;
    const pageNumber = parseInt(petQuery.page) || 1
    delete petQuery.page

    const petLimit = 10
    const skipAmount = (pageNumber - 1) * petLimit

    const petCount = await dbContext.Pets.countDocuments(petQuery)
    const totalPages = Math.ceil(petCount / petLimit)

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} does not exsist. There are only ${totalPages} pages of pets to look through`)
    }

    const pets = await dbContext.Pets
      .find(petQuery)
      .skip(skipAmount)
      .limit(petLimit)
      .sort(sortBy)
      .populate('creator', 'name picture')

    const pageResponse = {
      currentPage: pageNumber,
      previousPage: pageNumber - 1 || '',
      nextPage: totalPages == pageNumber ? '' : pageNumber + 1,
      totalResults: petCount,
      totalPages: totalPages,
      pets: pets
    }
    return pageResponse
  }
  async getPetById(petId) {
    const pet = await dbContext.Pets.findById(petId)
    return pet
  }
}
export const petsService = new PetsService()