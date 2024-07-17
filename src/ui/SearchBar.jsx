import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Code, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  function extractIdAndIndex(url) {
    const regex = /(\d+|[A-Za-z]\d+).*\/([A-Za-z]\d*)$/;
    const match = url.match(regex);
    if (match) {
      return { problem: { number: match[1], index: match[2].toUpperCase() } };
    }
    return null;
  }

  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  function handleSearchText(text) {
    if (text === "") {
      toast.error("Invalid search query", {
        icon: <MagnifyingGlassIcon height="16" width="16" color="#ffffff" />,
        description: "Please enter a valid search query",
      });
      return;
    }
    if (text.indexOf("/") === -1) {
        console.log(text);
        navigate(`/user/${text}`);
    
    } else return extractIdAndIndex(text);
  }

  return (
    <div>
      <TextField.Root
        placeholder={"Search for a user / problem"}
        onInput={handleSearchChange}
        ref={inputRef}
        type="text"
        value={searchText}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot
          className="transition-all duration-100 ease-in-out hover:cursor-pointer hover:bg-[#5a5e6750]"
          onClick={() => handleSearchText(searchText)}
        >
          <Code  size={"1"} color="gray" variant="outline">
            ctrl
          </Code>
          <Code size={"1"} color="gray" variant="outline">
            k
          </Code>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
