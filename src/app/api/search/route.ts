import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const extractQuery = url.searchParams.get("query");
    const searchPostList = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: extractQuery || "",
            },
          },
          {
            description: {
              contains: extractQuery || "",
            },
          },
        ],
      },
    });
    if (searchPostList) {
      return NextResponse.json({
        success: true,
        data: searchPostList,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Failed to search results",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
