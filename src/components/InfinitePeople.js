import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Person from './Person';

const fetchInfiniteUsers = async ({ pageParam = 1 }) => {
    const response = await fetch(`http://swapi.dev/api/planets/?page=${pageParam}`);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return response.json();
  };

function InfinitePeople() {
 // Grab all users
 const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error
  } = useInfiniteQuery('users', fetchInfiniteUsers, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return false;
    }
  });





  if (isLoading) return <p>Loading ...</p>;
  if (error ) return <p>Something went wrong ...</p>;

  console.log(data);

  return (
    <div className='people'>

      {data.results.map(person => <Person key={person.name} person={person} /> ) }
      {isFetching && <p>Loading ...</p>}
      {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
    </div>
  );
}
export default InfinitePeople;
