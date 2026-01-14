import DefaultMetaTags from '@/app/components/DefaultMetaTags';

export default async function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <DefaultMetaTags />
    </>
  );
}