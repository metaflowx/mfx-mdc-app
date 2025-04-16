import { generateMetadata } from "./metadata";

export {
    generateMetadata,
};

export const handleNegativeValue = (event:any) => {
    const {
      key,
      target: { value, selectionStart },
    } = event;
    const newValue =
      value.slice(0, selectionStart) + value.slice(selectionStart + 1);
    const parsedValue = parseFloat(newValue);
    if (
      ["ArrowUp", "ArrowDown", "-", "+", "e", "E"].includes(key) &&
      (isNaN(parsedValue) || parsedValue < 0)
    ) {
      event.preventDefault();
    }
  };

  export const handleMouseScroll = (event:any) => {
    const input = event.target;
    const value = parseFloat(input.value);
  
    // Check if the scroll would result in a negative value
    if (!isNaN(value) && value <= 0 && event.deltaY < 0) {
      event.preventDefault();
    }
  };

  export const downloadPdf = async (url: string, filename: string): Promise<void> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  export function sortAddress(add:string) {
    const sortAdd = `${add?.slice(0, 6)}...${add?.slice(add.length - 4)}`;
    return sortAdd;
  }
  export function sortAddressDoc(add:string) {
    const sortAdd = `${add?.slice(0, 3)}****${add?.slice(add.length - 3)}`;
    return sortAdd.toUpperCase();
  }


  /**
 * Converts a value to a string with suffix K, M, B if the value is a number.
 * @param {string | number} value - The value to convert (e.g., 1000, 5000000, 3500000000 or "1000").
 * @returns {string} - The string value with the appropriate suffix.
 */
export const  convertToAbbreviated= (value: string | number,_toFixed=2): string => {
  // Attempt to convert the value to a number
  const numericValue = Number(value);

  // Check if the conversion was successful

  if (numericValue >= 1_000_000_000) {
      return (numericValue / 1_000_000_000).toFixed(_toFixed).replace(/\.0$/, '') + 'B';
  } else if (numericValue >= 1_000_000) {
      return (numericValue / 1_000_000).toFixed(_toFixed).replace(/\.0$/, '') + 'M';
  } else if (numericValue >= 1_000) {
      return (numericValue / 1_000).toFixed(_toFixed).replace(/\.0$/, '') + 'K';
  } else {
      return numericValue.toFixed(_toFixed);
  }
}