import { Theme } from "@radix-ui/themes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter();

function App() {
  return (
    <Theme appearance="dark">
      <div className="font-inter border-3 w-2 h-2">vite-template</div>
    </Theme>
  );
}

export default App;
