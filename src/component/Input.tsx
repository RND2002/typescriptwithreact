import { Form, InputGroup } from "react-bootstrap";

interface InputProps {
  label?: string; // Label for the input
  type?: string; // Input type (text, email, password, etc.)
  name:string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string; // Custom Tailwind or Bootstrap styles
  leftAddon?: string | React.ReactNode; // Left-side addon
  
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  placeholder = "Enter text",
  value,
  onChange,
  onBlur,
  className = "",
  leftAddon,
  
  disabled = false,
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <Form.Label className="mb-1">{label}</Form.Label>}
      <InputGroup>
        {leftAddon && <InputGroup.Text>{leftAddon}</InputGroup.Text>}
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {/* {rightAddon && <InputGroup.Text>{rightAddon}</InputGroup.Text>} */}
      </InputGroup>
    </div>
  );
};
