import { useDispatch } from "react-redux";
import { getSubmissions } from "../context/user/userSlice";
import { getSolutions } from "../context/solutions/solutionsSlice";
import { toast } from "sonner";

export default function Home() {
  const dispatch = useDispatch();

  function handleClick() {
    console.log("Button clicked!");
    // dispatch(getSubmissions("hitvrth123"))
    dispatch(getSolutions("1444", "C"));

  }
  // throw new Error("Something went wrong");

  return (
    <div>
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="text-lg">Welcome to the Home page!</p>
      <button onClick={handleClick} className="btn">
        Get Submissions
      </button>
    </div>
  );
}
