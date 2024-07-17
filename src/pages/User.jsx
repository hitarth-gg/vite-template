import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../context/user/userSlice";
import CenteredLoader from "../ui/CenteredLoader";
import ErrorElement from "../ui/ErrorElement";
import ErrorPage from "./ErrorPage";
import TabSubmissions from "../components/TabSubmissions";

export default function User() {
  const x = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubmissions(x.id));
  }, [dispatch, x.id]);

  const {
    problemsSolved,
    correctSubmissions,
    skippedSubmissions,
    isLoading,
    errorMsg,
  } = useSelector((store) => store.user);

  if (isLoading) return <CenteredLoader />;
  else if (errorMsg) {
    return <ErrorPage text={errorMsg} />;
  } else if (problemsSolved.length === 0) {
    return (
      <ErrorPage
        title="No data to show here !"
        text={"User has not made any submissions yet."}
        type={"info"}
      />
    );
  }

  return (
    <div className="py-2 px-12">
        <TabSubmissions />
    </div>
  );
}
