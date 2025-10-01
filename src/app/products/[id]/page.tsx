import { Metadata } from "next";
import { ProductDetailsClient } from "@/components/products/product-details-client";
import { products } from "@/lib/products-data";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return {
      title: "Product Not Found - Endella Beauty",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} - Endella Beauty`,
    description: `Discover ${product.name} - ${product.category} from Endella Beauty. Premium quality, exceptional value. Shop now with free shipping on orders over £50.`,
    keywords: [
      product.name,
      product.category,
      "Endella Beauty",
      "premium beauty",
      "beauty products",
      "skincare",
      "cosmetics",
      "online beauty store",
    ],
    openGraph: {
      title: `${product.name} - Endella Beauty`,
      description: `Discover ${product.name} - ${product.category} from Endella Beauty. Premium quality, exceptional value.`,
      type: "website",
      url: `https://endellabeauty.com/products/${product.id}`,
      siteName: "Endella Beauty",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Endella Beauty`,
      description: `Discover ${product.name} - ${product.category} from Endella Beauty. Premium quality, exceptional value.`,
      images: [product.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://endellabeauty.com/products/${product.id}`,
    },
  };
}

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailsClient productId={params.id} />;
}
