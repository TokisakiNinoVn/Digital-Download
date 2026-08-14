import prisma from "../app/db.server.ts";

export async function loader() {
  const merchants = await prisma.merchant.findMany();

  console.log("Merchants:", merchants);

  return { merchants };
}

loader();