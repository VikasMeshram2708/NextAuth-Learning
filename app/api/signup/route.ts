import { ConnectDb } from "@/helpers/DB";
import { prismaInstance } from "@/helpers/PrismaInstance";
import { UserSchema } from "@/models/User";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    // Sanitize the incoming data
    const sanitize = UserSchema.parse(reqBody);

    const { name, email, password } = sanitize;

    // connect to DB
    await ConnectDb();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert into DB
    const user = await prismaInstance.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User Created",
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          status: false,
          message: e?.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        status: false,
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};
