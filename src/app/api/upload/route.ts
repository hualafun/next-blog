import { Octokit } from "@octokit/core";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({ error: "没有接受到文件." }, { status: 400 });
  }
  const [, suffix] = file.name.split(".");
  if (!["png", "jpg"].includes(suffix)) {
    return NextResponse.json({ error: "只接受 png,jpg 格式文件" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const content = buffer.toString("base64");
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });
  const owner = process.env.GITHUB_STORAGE_USER || "hualafun";
  const repo = process.env.GITHUB_STORAGE_REPO || "hualafun";
  const branch = process.env.GITHUB_STORAGE_BRANCH
  const path = dayjs().format("YYYY-MM-DD");
  const filename = `${uuidv4()}.${suffix}`;
  const uploadPath = `/repos/${owner}/${repo}/contents/${path}/${filename}`;
  await octokit.request(`PUT ${uploadPath}`, {
    owner,
    repo,
    path,
    message: `${path} commit ${filename}`,
    committer: {
      name: "HuaLa",
      email: "hualafun@foxmail.com",
    },
    content,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return NextResponse.json({
    url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}/${filename}`,
    path: `${path}/${filename}`
  });
};
