import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('should render correctly with given text', () => {
    render(<Button onClick={() => {}} text="Click Me" />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} text="Click Me" />);
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have the correct type attribute', () => {
    render(<Button onClick={() => {}} text="Submit" type="submit" />);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
