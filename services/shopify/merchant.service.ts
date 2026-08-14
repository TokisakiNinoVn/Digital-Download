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
      isInstalled: true,
    },
    create: {
      shopDomain,
      accessToken,
      isInstalled: true,
    },
  });

  console.log("[Merchant] Synced:", merchant.id);

  return merchant;
}