import { User } from ".prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import prisma from "../prisma";
import { UserType } from "../mapper/user.mapper";

class UserService {
  userPropertiesInclude = {
    user_technologies: {
      select: {
        technology: true,
      },
    },
    work_experiences: {
      select: {
        work_experience: true,
      },
    },
    user_educations: {
      select: {
        start_date: true,
        end_date: true,
        department: true,
        education: true,
      },
    },
  };

  async createUser(userData: UserType): Promise<User> {
    const { name } = userData;

    if (!name || (name && !name.trim()) || name === undefined) {
      throw new HttpException(400, "name field is reqired");
    }

    return await prisma.user
      .create({
        data: {
          ...userData,
          name: userData.name!,
        },
        include: this.userPropertiesInclude,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create user");
      });
  }

  async getUserById(id: number): Promise<User | null> {
    return await prisma.user
      .findFirst({
        where: {
          id,
        },
        include: this.userPropertiesInclude,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "User is not found");
      });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({
      include: this.userPropertiesInclude,
    });
  }

  async updateUser(userData: Partial<UserType>): Promise<User> {
    const { id, ...data } = userData;
    const { name } = userData;

    if (!name || (name && !name.trim()) || name === undefined) {
      throw new HttpException(400, "name field is reqired");
    }

    return await prisma.user
      .update({
        where: {
          id,
        },
        data,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update user");
      });
  }

  async deleteUser(id: number): Promise<User> {
    return await prisma.user
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "User is not find");
      });
  }
}

export default new UserService();