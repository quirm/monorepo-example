import { DateTime } from 'luxon';

// import Child from '~/Child'; // Does not work in build
import Child from './Child';

const Sample = () => {
  return (
    <div>
      <div>
        direct <code>{`<Sample />`}</code> component
      </div>
      <div>{`Time is ${DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)}`}</div>
      <Child />
    </div>
  );
};

export default Sample;
