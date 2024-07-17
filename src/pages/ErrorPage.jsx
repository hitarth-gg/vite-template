import ErrorElement from "../ui/ErrorElement";

export default function ErrorPage({title, text, type}) {
  return (
    <div className="h-96 flex flex-col justify-center items-center">
        <ErrorElement text={text} title={title} type={type} />
    </div>
  )
}
