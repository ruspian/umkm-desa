import KategoriFilter from "@/components/KategoriFilter";
import { PlaceCard } from "@/components/ui/card-22";
import { KategoriType } from "@/types/category";

interface HomeProps {
  searchParams: { kategori?: string };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;

  // Ambil kategori dari URL
  const activeCategory = (params.kategori as KategoriType) || "Semua";

  const demoPlaceData = [
    {
      images: [
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596622247990-84877175438a?q=80&w=2864&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2940&auto=format&fit=crop",
      ],
      tags: ["Adventure", "Ancient Monuments"],
      rating: 4.8,
      title: "Petra, Jordan",
      dateRange: "May 1 - 6",
      hostType: "Business host",
      isTopRated: true,
      description:
        "A lost city carved in rose-colored stone, hidden in majestic desert canyons.",
      pricePerNight: 139,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596622247990-84877175438a?q=80&w=2864&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2940&auto=format&fit=crop",
      ],
      tags: ["Adventure", "Ancient Monuments"],
      rating: 4.8,
      title: "Petra, Jordan",
      dateRange: "May 1 - 6",
      hostType: "Business host",
      isTopRated: true,
      description:
        "A lost city carved in rose-colored stone, hidden in majestic desert canyons.",
      pricePerNight: 139,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596622247990-84877175438a?q=80&w=2864&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2940&auto=format&fit=crop",
      ],
      tags: ["Adventure", "Ancient Monuments"],
      rating: 4.8,
      title: "Petra, Jordan",
      dateRange: "May 1 - 6",
      hostType: "Business host",
      isTopRated: true,
      description:
        "A lost city carved in rose-colored stone, hidden in majestic desert canyons.",
      pricePerNight: 139,
    },
    {
      images: [
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596622247990-84877175438a?q=80&w=2864&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2940&auto=format&fit=crop",
      ],
      tags: ["Adventure", "Ancient Monuments"],
      rating: 4.8,
      title: "Petra, Jordan",
      dateRange: "May 1 - 6",
      hostType: "Business host",
      isTopRated: true,
      description:
        "A lost city carved in rose-colored stone, hidden in majestic desert canyons.",
      pricePerNight: 139,
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 w-full">
      <section>
        <h2 className="text-xl font-bold mt-8 text-gray-800 dark:text-orange-500">
          Telusuri Kategori
        </h2>
        <KategoriFilter />
      </section>

      <section className="mt-2 w-full">
        <p className="text-gray-500">
          Menampilkan produk untuk: <strong>{activeCategory}</strong>
        </p>
        <div className="grid grid-cols-6 space-x-4">
          {demoPlaceData.map((place, index) => (
            <PlaceCard
              key={index}
              images={place.images}
              tags={place.tags}
              rating={place.rating}
              title={place.title}
              dateRange={place.dateRange}
              hostType={place.hostType}
              isTopRated={place.isTopRated}
              description={place.description}
              pricePerNight={place.pricePerNight}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
