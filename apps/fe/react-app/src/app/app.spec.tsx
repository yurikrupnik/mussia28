import { render } from '@testing-library/react';

import { BrowserRouter, StaticRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <StaticRouter location={'/'}>
        <App />
      </StaticRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  // it('should have a greeting as the title', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );
  //
  //   expect(getByText(/Welcome fe-react-app/gi)).toBeTruthy();
  // });
});
