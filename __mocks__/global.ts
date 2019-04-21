import 'whatwg-fetch';
import { TextDecoder } from 'text-encoding';
import { Request } from 'node-fetch';

// @ts-ignore
global.TextDecoder = TextDecoder;

// @ts-ignore
global.Request = Request;

// @ts-ignore
const mockResponse = {
  status: 200,
  json: () => {
    return { test: 'response' };
  }
};

const mockFetch = jest.fn().mockImplementation( () => Promise.resolve(mockResponse) );
window.fetch = mockFetch;
