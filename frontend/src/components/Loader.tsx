import { FadeLoader } from "react-spinners";
type LoaderProps = {
  loading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div className="flex justify-center w-full  h-full">
      <FadeLoader
        color="#F6E05E"
        height={100}
        radius={5}
        width={3}
        loading={loading}
      />
    </div>
  );
};

export default Loader;
