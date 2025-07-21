import { useEffect, useRef, useState } from "react";
import { InputPropTypes } from "../shapes";

const Input: React.FC<InputPropTypes> = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  onFocus,
  onBlur,
  ...props
}) => {
  const [placeholderText, setPlaceHolderText] = useState(placeholder);
  const [isDeleting, setIsDeleting] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!placeholder) return;

    function animatePlaceHolder() {
      if (isDeleting) {
        setPlaceHolderText((currentText) => {
          if (currentText?.length === 0) {
            setIsDeleting(false);
            return "";
          }
          return currentText?.slice(0, -1);
        });
      } else {
        setPlaceHolderText((currentText = "") => {
          if (currentText?.length === placeholder?.length) {
            setIsDeleting(true);
            return placeholder;
          }
          return placeholder?.slice(0, currentText?.length + 1);
        });
      }
      timeoutRef.current = setTimeout(animatePlaceHolder, 300);
    }

    timeoutRef.current = setTimeout(animatePlaceHolder, 300);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isDeleting, placeholder]);

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setPlaceHolderText("");
    if (onFocus) {
      onFocus(event);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setPlaceHolderText(placeholder);
    if (onBlur) {
      onBlur(event);
    }
  }

  return (
    <>
      {label && <label htmlFor="input-element">{label}</label>}
      <input
        id="input-element"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholderText}
        {...props}
      />
    </>
  );
};

export default Input;
