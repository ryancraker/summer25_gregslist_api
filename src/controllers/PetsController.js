import { petsService } from "../services/PetsService.js";
import BaseController from "../utils/BaseController.js";

export class PetsController extends BaseController {
  constructor() {
    super('api/pets')
    this.router
      .get('', this.getPetsByQuery)
      .get('/:petId', this.getPetById)
  }
  /**
 * @param {import("express").Request} request,
 * @param {import("express").Response} response,
 * @param {import("express").NextFunction} next,
 */
  async getPetsByQuery(request, response, next) {
    try {
      const petQuery = request.query
      const pets = await petsService.getPetsByQuery(petQuery)
      response.send(pets)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request,
 * @param {import("express").Response} response,
 * @param {import("express").NextFunction} next,
 */
  async getPetById(request, response, next) {
    try {
      const petId = request.params.petId
      const pet = await petsService.getPetById(petId)
      response.send(pet)
    } catch (error) {
      next(error)
    }
  }
}