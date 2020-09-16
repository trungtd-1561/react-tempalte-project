import enzyme from 'enzyme';
import fetch from 'jest-fetch-mock';
import { JSDOM } from 'jsdom';

enzyme.configure({ disableLifecycleMethods: true });
const jsdom = new JSDOM(
  '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>Pet Rescuse</title><body><div id="app"></div></body></html>',
);
const { window } = jsdom;
window.Environment = 'test';
window.APIEndpointBaseURL = `http://localhost:8080/api/v1`;
window.fetch = fetch;
global.window = window;
Object.defineProperties(global, {
  ...Object.getOwnPropertyDescriptors(window),
  ...Object.getOwnPropertyDescriptors(global),
});
