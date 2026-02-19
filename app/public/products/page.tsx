"use client";

import { useState, useEffect } from "react";
import { productsService } from "@/services/products.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  business_name?: string;
  created_by_name?: string;
}

export default function PublicProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsService.getPublicProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch public products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b">
        <div className="text-xl font-bold">Baisoft Marketplace</div>
        <nav className="flex gap-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Available Products</h1>

        {loading ? (
          <div>Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg">${product.price}</p>
                      <Badge variant="outline">In Stock</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                      Seller: {product.business_name || "Unknown"}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No products available at the moment.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
