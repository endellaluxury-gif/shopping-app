"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export function CartIcon() {
  const { state, toggleCart } = useCart();
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCartClick}
      className="relative"
    >
      <ShoppingCart className="h-6 w-6" />
      {state.totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
        >
          {state.totalItems}
        </Badge>
      )}
    </Button>
  );
}




