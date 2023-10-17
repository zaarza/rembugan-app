import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
 
it('First test', () => {
  const string = "Hello World!";
  expect(string).toEqual("Hello World!")
})