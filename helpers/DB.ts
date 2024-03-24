import { prismaInstance } from "./PrismaInstance";

export const ConnectDb = async () => {
  try {
    await prismaInstance.$connect();
    console.log("Connected to DB Successfully.");
  } catch (e) {
    console.log(
      "Something went wrong. Failed to connect to DB. Please try again."
    );
  } finally {
    await prismaInstance.$disconnect();
    console.log("Connection released");
  }
};
