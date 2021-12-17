import {
  UserCreatedEty,
  UserInfoEntity,
  UserUpdatedEty,
} from '../mappers/types/user.types';
import prisma from '../prisma';

export default class UserRepository {
  async createUser(data: UserCreatedEty) {
    return await prisma.user.create({
      data,
    });
  }

  async updateUser({ id, ...data }: UserUpdatedEty) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async getUsers(skip?: number, take?: number) {
    return await prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        description: true,
        photo: true,
      },
    });
  }

  async getUser(id: number): Promise<UserInfoEntity | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        user_technologies: {
          include: {
            technology: true,
          },
        },
        user_educations: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
            department: true,
            education: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        work_experiences: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
            description: true,
            position: true,
            work_experience: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        cvs: true,
      },
    });
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } });
  }
}
