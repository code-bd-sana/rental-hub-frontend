import { CarDetailsView } from '@/components/directory/car/CarDetailsView';
import { FoodDetailsView } from '@/components/directory/food/FoodDetailsView';
import { StayDetailsView } from '@/components/directory/stay/StayDetailsView';
import { ServiceDetailsView } from '@/components/directory/service/ServiceDetailsView';
import { listingApi } from '@/lib/api/listings';
import Link from 'next/link';

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const data = await listingApi.getListingById(params.id);
    const listing = data.success ? data.data : data;
    if (listing) {
      return {
        title: `${listing.title} | Rental Hub`,
        description: listing.description || `Rent ${listing.title} in ${listing.city}`,
      };
    }
  } catch (e) {
    console.error('Error generating metadata:', e);
    return { title: 'Listing Details | Rental Hub' };
  }
}

export default async function ListingDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  let listingData = null;

  try {
    const data = await listingApi.getListingById(id);
    listingData = data.success ? data.data : data;
  } catch (error) {
    console.error('Error fetching listing:', error);
  }

  if (!listingData) {
    return (
      <div className='min-h-[80vh] flex flex-col items-center justify-center bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Listing not found</h2>
        <Link href='/directory' className='text-[#2563eb] hover:underline'>
          Go back
        </Link>
      </div>
    );
  }

  // Handle Stay category
  if (listingData.category === 'STAY') {
    return <StayDetailsView listing={listingData} />;
  }

  // Handle Food category
  if (listingData.category === 'FOOD') {
    return <FoodDetailsView listing={listingData} />;
  }

  // Handle Car category
  if (listingData.category === 'CAR') {
    return <CarDetailsView listing={listingData} />;
  }

  // Handle Service category
  if (listingData.category === 'SERVICE') {
    return <ServiceDetailsView listing={listingData} />;
  }

  // Placeholder for other categories
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center bg-white text-center p-6'>
      <h2 className='text-2xl font-bold mb-4'>Unsupported Category</h2>
      <p className='text-gray-500 mb-6'>
        Details view for {listingData.category} is not yet implemented.
      </p>
      <Link href='/directory' className='text-[#2563eb] hover:underline'>
        Go back
      </Link>
    </div>
  );
}
