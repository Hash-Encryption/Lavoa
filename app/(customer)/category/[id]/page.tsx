import CategoryClientView from './CategoryClientView';

export function generateStaticParams() {
  return [
    { id: 'shisha' },
    { id: 'coffee' },
    { id: 'tea' },
    { id: 'snack' },
  ];
}

export const dynamic = 'force-static';

export default function CategoryPage({ params }: { params: { id: string } }) {
  return <CategoryClientView initialCategory={params.id} />;
}
