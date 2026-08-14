import prisma from "../../app/db.server";

interface SyncMerchantInput {
  shopDomain: string;
  accessToken: string;
}

export async function syncMerchant({
  shopDomain,
  accessToken,
}: SyncMerchantInput) {
  console.log("[Merchant] Syncing:", shopDomain);

  const merchant = await prisma.merchant.upsert({
    where: {
      shopDomain,
    },
    update: {
      accessToken,
    },
    create: {
      shopDomain,
      accessToken,
    },
  });

  console.log("[Merchant] Synced:", merchant.id);

  return merchant;
}