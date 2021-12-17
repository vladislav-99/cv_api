import { User } from ".prisma/client";
import HttpException from "../exceptions/http.exception";
import { UserCreatedDTO, UserUpdatedDTO } from "../mappers/types/user.types";
import { mapDtoToEty, mapEtyToDto } from "../mappers/user.mapper";
import prisma from "../prisma";
import UserRepository from "../repositories/user.repository";
import { PaginationsProps } from "../types";

class UserService {
  async createUser(userData: UserCreatedDTO) {
    const userEty = mapDtoToEty.created(userData);

    const userRepository = new UserRepository();

    return await userRepository.createUser(userEty).catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot create user");
    });
  }

  async getUserById(id: number) {
    const userRepository = new UserRepository();

    const userEty = await userRepository.getUser(id).catch((err) => {
      console.log(err);
      throw new HttpException(404, "User is not found");
    });

    if (!userEty) throw new HttpException(404, "User is not found");

    return mapEtyToDto.userInfo(userEty);
  }

  async getAllUsers({ skip, take }: PaginationsProps) {
    const userRepository = new UserRepository();
    return await userRepository.getUsers(skip, take);
  }

  async updateUser(userData: UserUpdatedDTO) {
    const userEty = mapDtoToEty.updated(userData);
    const userRepository = new UserRepository();

    return await userRepository.updateUser(userEty).catch((err) => {
      console.log(err);
      throw new HttpException(400, "Cannot update user");
    });
  }

  async deleteUser(id: number): Promise<User> {
    const userRepository = new UserRepository();

    return await userRepository.deleteUser(id).catch((err) => {
      console.log(err);
      throw new HttpException(404, "User is not found");
    });
  }
}

export default new UserService();
