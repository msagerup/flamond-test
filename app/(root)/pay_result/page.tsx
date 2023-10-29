import { Suspense } from 'react';

import Result from '@/components/Result';

const PayResult = async () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Result />
    </Suspense>
  );
};

export default PayResult;
