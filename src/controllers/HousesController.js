import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      // .get('', this.getHouses)
      .get('', this.getHousesByQuery)
      .get('/:houseId', this.getHouseById)
  }

  /**
* @param {import("express").Request} request,
* @param {import("express").Response} response,
* @param {import("express").NextFunction} next,
*/
  async getHouses(request, response, next) {
    try {
      const houses = await housesService.getHouses()
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request,
  * @param {import("express").Response} response,
  * @param {import("express").NextFunction} next,
  */
  async getHousesByQuery(request, response, next) {
    try {
      const houseQuery = request.query
      const houses = await housesService.getHousesByQuery(houseQuery)
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request,
  * @param {import("express").Response} response,
  * @param {import("express").NextFunction} next,
  */
  async getHouseById(request, response, next) {
    try {
      const houseId = request.params.houseId
      const house = await housesService.getHouseById(houseId)
      response.send(house)
    } catch (error) {
      next(error)
    }
  }
}