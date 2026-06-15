import { PartnerProducts } from "@/components/partners/partner-products";

export default async function BakeryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PartnerProducts type="Boulangeries" slug={slug} />;
}
