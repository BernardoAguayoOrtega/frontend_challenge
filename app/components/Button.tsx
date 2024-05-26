interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type }) => {
  return (
    <button
      onClick={onClick}
      className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0 hover:bg-primary hover:text-secondary cursor-pointer"
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
