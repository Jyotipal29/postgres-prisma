import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const res = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  console.log(res, "user");
};

// createTodo("jyotipal1@gmail.com", "jyotipal@29", "jyoti", "pal");

export const updateUser = async (
  email: string,
  { firstName, lastName }: any
) => {
  const newUser = await prisma.user.update({
    where: { email },
    data: {
      firstName,
      lastName,
    },
  });

  console.log(newUser, "newUser");
};

// updateUser("jyotipal@gmail.com", {
//   firstName: "priya",
//   lastName: "pal",
// });

export const getUser = async (email: string) => {
  const res = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  console.log(res, "res");
};

getUser("jyotipal@gmail.com");
