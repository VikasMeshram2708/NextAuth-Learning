import { ConnectDb } from "@/helpers/DB";
import { prismaInstance } from "@/helpers/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/models/LoginSchema";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    // Sanitize the incoming data
    const sanitize = LoginSchema.parse(reqBody);

    const { email, password } = sanitize;

    // connect to DB
    await ConnectDb();

    // Find the user
    const user = await prismaInstance.user.findUnique({
      where: {
        email: email,
      },
    });

    // Compare the password
    const matchedPassword = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!matchedPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials provided.",
        },
        {
          status: 422,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "User Logged In",
      },
      {
        status: 200,
      }
    );
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
