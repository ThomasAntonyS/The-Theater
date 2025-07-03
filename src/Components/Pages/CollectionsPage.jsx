import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../PageLayout';
import Header from '../Header';
import Footer from '../Footer';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false)

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setCollection(data);
        setTotalPages(1); 
      } catch (error) {
        console.error('Error fetching collection:', error);
        setLoading(false)
      }
      finally{
        setLoading(false)
      }
    };

    fetchCollection();
    window.scrollTo(0, 0);
  }, [collectionId]);

  useEffect(() => {
    if (collection?.name) {
      document.title = `${collection.name}`;
    }
  }, [collection]);

  return (
    <>
      <Header />
      {collection && (
        <PageLayout
          movies={collection.parts}
          title={collection.name}
          description={collection.overview}
          pageCount={pageCount}
          setPageCount={setPageCount}
          totalPages={totalPages}
          loading={loading}
        />
      )}
      <Footer />
    </>
  );
};

export default CollectionPage;
