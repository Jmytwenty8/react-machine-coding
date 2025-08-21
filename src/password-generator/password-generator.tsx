import { useCallback, useEffect, useState } from "react";

const PasswordGenerator = () => {
  const [sliderValue, setSliderValue] = useState(12);
  const [passwordOptions, setPasswordOptions] = useState({
    includeNumbers: false,
    includeSymbols: false,
    includeUppercase: false,
    includeLowercase: false,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  function getRandomChar(str: string) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  const handleGeneratePassword = useCallback(() => {
    const charset = {
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
    };

    let availableChars = "";
    const guaranteedChars = [];

    if (passwordOptions.includeNumbers) {
      availableChars += charset.numbers;
      guaranteedChars.push(getRandomChar(charset.numbers));
    }
    if (passwordOptions.includeSymbols) {
      availableChars += charset.symbols;
      guaranteedChars.push(getRandomChar(charset.symbols));
    }
    if (passwordOptions.includeUppercase) {
      availableChars += charset.uppercase;
      guaranteedChars.push(getRandomChar(charset.uppercase));
    }
    if (passwordOptions.includeLowercase) {
      availableChars += charset.lowercase;
      guaranteedChars.push(getRandomChar(charset.lowercase));
    }

    if (availableChars.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    if (sliderValue < guaranteedChars.length) {
      alert(
        "Password length must be at least equal to number of selected character types."
      );
      return;
    }

    const remainingLength = sliderValue - guaranteedChars.length;
    const passwordArray = [...guaranteedChars];

    for (let i = 0; i < remainingLength; i++) {
      passwordArray.push(getRandomChar(availableChars));
    }

    // Shuffle to avoid predictable order
    const shuffledPassword = passwordArray
      .sort(() => Math.random() - 0.5)
      .join("");

    setGeneratedPassword(shuffledPassword);
  }, [sliderValue, passwordOptions]);

  useEffect(() => {
    handleGeneratePassword();
  }, [sliderValue, passwordOptions, handleGeneratePassword]);

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-100'>
      <div className='w-1/3 h-2/6 bg-zinc-300 flex items-center justify-evenly flex-col rounded-lg'>
        <h1 className='font-semibold text-xl'>Password Generator</h1>
        <input
          type='range'
          className='accent-auto'
          min={4}
          max={50}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
        />
        <p>{generatedPassword}</p>
        <p>Length: {sliderValue}</p>
        <label className='flex gap-2 items-center justify-center'>
          Include Numbers
          <input
            type='checkbox'
            className='accent-auto'
            checked={passwordOptions.includeNumbers}
            onChange={(e) =>
              setPasswordOptions({
                ...passwordOptions,
                includeNumbers: e.target.checked,
              })
            }
          />
        </label>
        <label className='flex gap-2 items-center justify-center'>
          Include Symbols
          <input
            type='checkbox'
            className='accent-auto'
            checked={passwordOptions.includeSymbols}
            onChange={(e) =>
              setPasswordOptions({
                ...passwordOptions,
                includeSymbols: e.target.checked,
              })
            }
          />
        </label>
        <label className='flex gap-2 items-center justify-center'>
          Include Uppercase Letters
          <input
            type='checkbox'
            className='accent-auto'
            checked={passwordOptions.includeUppercase}
            onChange={(e) =>
              setPasswordOptions({
                ...passwordOptions,
                includeUppercase: e.target.checked,
              })
            }
          />
        </label>
        <label className='flex gap-2 items-center justify-center'>
          Include Lowercase Letters
          <input
            type='checkbox'
            className='accent-auto'
            checked={passwordOptions.includeLowercase}
            onChange={(e) =>
              setPasswordOptions({
                ...passwordOptions,
                includeLowercase: e.target.checked,
              })
            }
          />
        </label>
      </div>
    </div>
  );
};

export default PasswordGenerator;
