import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchObjects } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['objects'],
    queryFn: fetchObjects,
    staleTime: 3000,
    // gcTime:30000
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || 'Failed to fetch objects.'}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((object) => (
          <li key={object.id}>
            <EventItem event={object} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='new-events-section'>
      <header>
        <h2>Recently added objects</h2>
      </header>
      {content}
    </section>
  );
}
